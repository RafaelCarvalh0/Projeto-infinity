/* eslint-disable indent */
const { Client, LocalAuth } = require('whatsapp-web.js')
const fs = require('fs')
const path = require('path')
const https = require('https')
const sessions = new Map()
const { baseWebhookURL, sessionFolderPath, maxAttachmentSize, setMessagesAsSeen, webVersion, webVersionCacheType, recoverSessions } = require('./config')
const { triggerWebhook, waitForNestedObject, checkIfEventisEnabled, api } = require('./utils')
const respondedMessages = new Set()

// Function to validate if the session is ready
const validateSession = async (sessionId) => {
    try {
        const returnData = { success: false, state: null, message: '' }

        // Session not Connected 😢
        if (!sessions.has(sessionId) || !sessions.get(sessionId)) {
            returnData.message = 'session_not_found'
            return returnData
        }

        const client = sessions.get(sessionId)
        // wait until the client is created
        await waitForNestedObject(client, 'pupPage')
            .catch((err) => { return { success: false, state: null, message: err.message } })

        // Wait for client.pupPage to be evaluable
        while (true) {
            try {
                if (client.pupPage.isClosed()) {
                    return { success: false, state: null, message: 'browser tab closed' }
                }
                await client.pupPage.evaluate('1'); break
            } catch (error) {
                // Ignore error and wait for a bit before trying again
                await new Promise(resolve => setTimeout(resolve, 100))
            }
        }

        const state = await client.getState()
        returnData.state = state
        if (state !== 'CONNECTED') {
            returnData.message = 'session_not_connected'
            return returnData
        }

        // Session Connected 🎉
        returnData.success = true
        returnData.message = 'session_connected'
        return returnData
    } catch (error) {
        console.log(error)
        return { success: false, state: null, message: error.message }
    }
}

// Function to handle client session restoration
const restoreSessions = () => {
    try {
        if (!fs.existsSync(sessionFolderPath)) {
            fs.mkdirSync(sessionFolderPath) // Create the session directory if it doesn't exist
        }
        // Read the contents of the folder
        fs.readdir(sessionFolderPath, (_, files) => {
            // Iterate through the files in the parent folder
            for (const file of files) {
                // Use regular expression to extract the string from the folder name
                const match = file.match(/^session-(.+)$/)
                if (match) {
                    const sessionId = match[1]
                    console.log('existing session detected', sessionId)
                    setupSession(sessionId)
                }
            }
        })
    } catch (error) {
        console.log(error)
        console.error('Failed to restore sessions:', error)
    }
}

// Setup Session
const setupSession = (sessionId) => {
    try {
        if (sessions.has(sessionId)) {
            return { success: false, message: `Session already exists for: ${sessionId}`, client: sessions.get(sessionId) }
        }

        // Disable the delete folder from the logout function (will be handled separately)
        const localAuth = new LocalAuth({ clientId: sessionId, dataPath: sessionFolderPath })
        delete localAuth.logout
        localAuth.logout = () => { }

        const clientOptions = {
            puppeteer: {
                executablePath: process.env.CHROME_BIN || null,
                // headless: false,
                args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
            },
            userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
            authStrategy: localAuth
        }

        if (webVersion) {
            clientOptions.webVersion = webVersion
            switch (webVersionCacheType.toLowerCase()) {
                case 'local':
                    clientOptions.webVersionCache = {
                        type: 'local'
                    }
                    break
                case 'remote':
                    clientOptions.webVersionCache = {
                        type: 'remote',
                        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/' + webVersion + '.html'
                    }
                    break
                default:
                    clientOptions.webVersionCache = {
                        type: 'none'
                    }
            }
        }

        const client = new Client(clientOptions)

        client.initialize().catch(err => console.log('Initialize error:', err.message))

        initializeEvents(client, sessionId)

        // Save the session to the Map
        sessions.set(sessionId, client)
        return { success: true, message: 'Session initiated successfully', client }
    } catch (error) {
        return { success: false, message: error.message, client: null }
    }
}

const initializeEvents = (client, sessionId) => {
    // check if the session webhook is overridden
    const sessionWebhook = process.env[sessionId.toUpperCase() + '_WEBHOOK_URL'] || baseWebhookURL

    if (recoverSessions) {
        waitForNestedObject(client, 'pupPage').then(() => {
            const restartSession = async (sessionId) => {
                sessions.delete(sessionId)
                await client.destroy().catch(e => { })
                setupSession(sessionId)
            }
            client.pupPage.once('close', function () {
                // emitted when the page closes
                console.log(`Browser page closed for ${sessionId}. Restoring`)
                restartSession(sessionId)
            })
            client.pupPage.once('error', function () {
                // emitted when the page crashes
                console.log(`Error occurred on browser page for ${sessionId}. Restoring`)
                restartSession(sessionId)
            })
        }).catch(e => { })
    }

    checkIfEventisEnabled('auth_failure')
        .then(_ => {
            client.on('auth_failure', (msg) => {
                triggerWebhook(sessionWebhook, sessionId, 'status', { msg })
            })
        })

    checkIfEventisEnabled('authenticated')
        .then(_ => {
            client.on('authenticated', () => {
                triggerWebhook(sessionWebhook, sessionId, 'authenticated')
            })
        })

    checkIfEventisEnabled('call')
        .then(_ => {
            client.on('call', async (call) => {
                triggerWebhook(sessionWebhook, sessionId, 'call', { call })
            })
        })

    checkIfEventisEnabled('change_state')
        .then(_ => {
            client.on('change_state', state => {
                triggerWebhook(sessionWebhook, sessionId, 'change_state', { state })
            })
        })

    checkIfEventisEnabled('disconnected')
        .then(_ => {
            client.on('disconnected', (reason) => {
                triggerWebhook(sessionWebhook, sessionId, 'disconnected', { reason })
            })
        })

    checkIfEventisEnabled('group_join')
        .then(_ => {
            client.on('group_join', (notification) => {
                triggerWebhook(sessionWebhook, sessionId, 'group_join', { notification })
            })
        })

    checkIfEventisEnabled('group_leave')
        .then(_ => {
            client.on('group_leave', (notification) => {
                triggerWebhook(sessionWebhook, sessionId, 'group_leave', { notification })
            })
        })

    checkIfEventisEnabled('group_update')
        .then(_ => {
            client.on('group_update', (notification) => {
                triggerWebhook(sessionWebhook, sessionId, 'group_update', { notification })
            })
        })

    checkIfEventisEnabled('loading_screen')
        .then(_ => {
            client.on('loading_screen', (percent, message) => {
                triggerWebhook(sessionWebhook, sessionId, 'loading_screen', { percent, message })
            })
        })

    checkIfEventisEnabled('media_uploaded')
        .then(_ => {
            client.on('media_uploaded', (message) => {
                triggerWebhook(sessionWebhook, sessionId, 'media_uploaded', { message })
            })
        })

    checkIfEventisEnabled('message')
        .then(_ => {
            client.on('message', async (message) => {
                triggerWebhook(sessionWebhook, sessionId, 'message', { message })
                if (message.hasMedia && message._data?.size < maxAttachmentSize) {
                    checkIfEventisEnabled('media').then(_ => {
                        message.downloadMedia().then(messageMedia => {
                            triggerWebhook(sessionWebhook, sessionId, 'media', { messageMedia, message })
                        }).catch(e => {
                            console.log('Download media error:', e.message)
                        })
                    })
                }
                if (setMessagesAsSeen) {
                    const chat = await message.getChat()

                    if (chat.isGroup || message.type.toLowerCase() === 'e2e_notification' || message.body === '' || message.from.includes('@g.us')) {
                        return null
                    } else if (message.type.toLowerCase() === 'chat' && chat.id.server.toLowerCase() !== 'broadcast') {
                        chat.sendSeen()

                        await callBotService(sessionId, message, chat)
                        await adicionarContatoAoDatabase(sessionId, message)
                    }
                }
            })
        }).catch(error => {
            console.error('Erro ao verificar se o evento está habilitado:', error)
        })

    checkIfEventisEnabled('message_ack')
        .then(_ => {
            client.on('message_ack', async (message, ack) => {
                triggerWebhook(sessionWebhook, sessionId, 'message_ack', { message, ack })
                if (setMessagesAsSeen) {
                    const chat = await message.getChat()
                    console.log('Function ===> client.on(message_ack)')
                    chat.sendSeen()
                }
            })
        })

    checkIfEventisEnabled('message_create')
        .then(_ => {
            client.on('message_create', async (message) => {
                triggerWebhook(sessionWebhook, sessionId, 'message_create', { message })
                if (setMessagesAsSeen) {
                    const chat = await message.getChat()
                    chat.sendSeen()

                    // Aqui só pra teste pessoal !!!!
                    // if (chat.isGroup || message.type.toLowerCase() === 'e2e_notification' || message.body === '' || message.from.includes('@g.us')) {
                    //    return null
                    // } else if (message.type.toLowerCase() === 'chat' && chat.id.server.toLowerCase() !== 'broadcast') {
                    //    chat.sendSeen()

                    //    await callBotService(sessionId, message, chat)
                    //    await adicionarContatoAoDatabase(sessionId, message)
                    // }
                }
            })
        })

    checkIfEventisEnabled('message_reaction')
        .then(_ => {
            client.on('message_reaction', (reaction) => {
                triggerWebhook(sessionWebhook, sessionId, 'message_reaction', { reaction })
                console.log('Function ===> client.on(message_reaction)')
            })
        })

    checkIfEventisEnabled('message_revoke_everyone')
        .then(_ => {
            client.on('message_revoke_everyone', async (after, before) => {
                triggerWebhook(sessionWebhook, sessionId, 'message_revoke_everyone', { after, before })
                console.log('Function ===> client.on(message_revoke_everyone)')
            })
        })

    client.on('qr', (qr) => {
        // inject qr code into session
        client.qr = qr
        checkIfEventisEnabled('qr')
            .then(_ => {
                triggerWebhook(sessionWebhook, sessionId, 'qr', { qr })
            })
    })

    checkIfEventisEnabled('ready')
        .then(_ => {
            client.on('ready', () => {
                triggerWebhook(sessionWebhook, sessionId, 'ready')
            })
        })

    checkIfEventisEnabled('contact_changed')
        .then(_ => {
            client.on('contact_changed', async (message, oldId, newId, isContact) => {
                triggerWebhook(sessionWebhook, sessionId, 'contact_changed', { message, oldId, newId, isContact })
            })
        })
}

const adicionarContatoAoDatabase = async (sessionId, message) => {
    try {
        const contato = await message.getContact()
        const numero = contato.number.slice(2)
        const nome = contato.pushname

        console.log(sessionId)
        console.log(numero)
        console.log(nome)

        await api.post('api/Contato/Salvar', {
            UsuarioId: 0, // sessionId, // Preciso pegar o usuário ID da tabela de usuários para poder inserir o contato dele, tentar usando o SessionId !!!
            SessionId: sessionId,
            Nome: nome,
            Celular: numero
        }, {
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        })
    } catch (error) {
        console.log('Caiu na excessão !')
        // console.error(error.response.data.ErroDetalhado)
    }
}

const callBotService = async (sessionId, message, chat) => {
    try {
        // Verifica se o BOT ja agiu sobre o contato em questão!
        if (!respondedMessages.has(message.id.remote)) {
            console.log(respondedMessages)
            const nomeContato = message._data.notifyName

            message.reply(`Saudações ${nomeContato}`)

            delay(3000).then(async function () {
                try {
                    await chat.sendMessage('Esse é um atendimento automático, e não é monitorado por um humano, como posso ajudar?')
                } catch (e) {
                    console.log(e)
                }
            })

            respondedMessages.add(message.id.remote)
            return null
        }

        // const retorno = await api.get(`api/Bot/GetOptions/${sessionId}`, {
        //    httpsAgent: new https.Agent({
        //        rejectUnauthorized: false
        //    })
        // })

        // To-Do
    } catch (error) {
        console.log('Caiu na excessão !')
        // console.error(error.response.data.ErroDetalhado)
    }
}

function delay (t, v) {
    return new Promise(function (resolve) {
        setTimeout(resolve.bind(null, v), t)
    })
}

const deleteSessionFolder = async (sessionId) => {
    try {
        const targetDirPath = path.join(sessionFolderPath, `session-${sessionId}`)
        const resolvedTargetDirPath = await fs.promises.realpath(targetDirPath)
        const resolvedSessionPath = await fs.promises.realpath(sessionFolderPath)

        // Ensure the target directory path ends with a path separator
        const safeSessionPath = `${resolvedSessionPath}${path.sep}`

        // Validate the resolved target directory path is a subdirectory of the session folder path
        if (!resolvedTargetDirPath.startsWith(safeSessionPath)) {
            throw new Error('Invalid path: Directory traversal detected')
        }
        await fs.promises.rm(resolvedTargetDirPath, { recursive: true, force: true })
    } catch (error) {
        console.log('Folder deletion error', error)
        throw error
    }
}

// Function to delete client session
const deleteSession = async (sessionId, validation) => {
    try {
        const client = sessions.get(sessionId)
        if (!client) {
            return
        }
        client.pupPage.removeAllListeners('close')
        client.pupPage.removeAllListeners('error')
        if (validation.success) {
            // Client Connected, request logout
            console.log(`Logging out session ${sessionId}`)
            await client.logout()
        } else if (validation.message === 'session_not_connected') {
            // Client not Connected, request destroy
            console.log(`Destroying session ${sessionId}`)
            await client.destroy()
        }

        // Wait for client.pupBrowser to be disconnected before deleting the folder
        while (client.pupBrowser.isConnected()) {
            await new Promise(resolve => setTimeout(resolve, 100))
        }
        await deleteSessionFolder(sessionId)
        sessions.delete(sessionId)
    } catch (error) {
        console.log(error)
        throw error
    }
}

// Function to handle session flush
const flushSessions = async (deleteOnlyInactive) => {
    try {
        // Read the contents of the sessions folder
        const files = await fs.promises.readdir(sessionFolderPath)
        // Iterate through the files in the parent folder
        for (const file of files) {
            // Use regular expression to extract the string from the folder name
            const match = file.match(/^session-(.+)$/)
            if (match) {
                const sessionId = match[1]
                const validation = await validateSession(sessionId)
                if (!deleteOnlyInactive || !validation.success) {
                    await deleteSession(sessionId, validation)
                }
            }
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

module.exports = {
    sessions,
    setupSession,
    restoreSessions,
    validateSession,
    deleteSession,
    flushSessions
}
