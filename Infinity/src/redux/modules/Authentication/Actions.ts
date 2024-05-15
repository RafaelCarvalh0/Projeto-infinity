export const SetIdUser = (data: number) => {
    console.log("")
    console.log("Funcao (Actions) que recebe o valor que sera manipulado na memória")
    console.log(data)
    console.log("")
    return {
        type: '@USUARIO/SALVAR_ID',
        payload: data,
    }
};

export const SetClientId = (data: string) => {
    console.log("")
    console.log("Funcao (Actions) que recebe o valor que sera manipulado na memória")
    console.log(data)
    console.log("")
    return {
        type: '@USUARIO/SALVAR_CLIENT_ID',
        payload: data,
    }
};