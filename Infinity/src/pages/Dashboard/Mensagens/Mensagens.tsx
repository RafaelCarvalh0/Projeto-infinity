import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ComponentTable from "../../Components/Table/Index";
import { BoxButtons, Button, Header } from './MensagensStyle';
import * as Icon from '@mui/icons-material/';
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Form, Formik, Field } from "formik";
import { ClientesCadastro } from '../../../routes/RoutesNames';
import InputMask from 'react-input-mask';
import MensagemController from '../../../controllers/MensagemController';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ContatoController from '../../../controllers/ContatoController';
import { useSelector } from 'react-redux';

interface Snack {
    title?: string
    description?: string
    colorType?: string
}

interface Contatos {
    quantidade: number
    celular: []
}

export default function Mensagens() {
    const navigate = useNavigate();
    const { userId, clientId } = useSelector(state => state.Authentication);
    const [contatos, setContatos] = useState<Contatos>();
    const [snack, setSnack] = useState<Snack | any>(null);
    const [imagem, setImagem] = useState<any>();

    const handleNavigation = () => {
        navigate(ClientesCadastro);
    }

    //const initialValues = {
    //    nome: '',
    //    endereco: '',
    //    bairro: '',
    //    cidade: '',
    //    complemento: '',
    //    cel: ''
    //};

    const validationSchema = Yup.object().shape({
        mensagem: Yup.string()//.min(3, "O Campo deve ter no mínimo 3 caracteres"),
    });

    useEffect(() => {
        CarregarContatos();
    }, []);

    const CarregarContatos = async () => {

        const Celulares: any = [];
        const request = { UsuarioId: userId, Nome: '', Celular: '' }
        const response = await ContatoController.Buscar(request);

        if (response.StatusCode === 200) {

            response.Data.forEach(item => {
                Celulares.push(`55${item.Celular}@c.us`);
            });

            setContatos({
                quantidade: response.Data.length,
                celular: Celulares
            });
        }
        else {
            setSnack({
                title: "Erro",
                description: "Não foi possivel carregar os contatos!",
                colorType: "#C62828"
            });
        }
    }

    const handleSubmit = async (values: any, { setSubmitting, resetForm }: any): void => {

        const request = {
            ClientId: clientId,
            Contatos: contatos,
            Imagem: imagem,
            Mensagem: values.mensagem,
        }

        const response = await MensagemController.Enviar(request);

        if (response.StatusCode === 200) {
            setSnack({
                title: "Concluído",
                description: "Mensagem enviada com sucesso!",
                colorType: "#1B5E20"
            });
            resetForm();
        }
        else {
            setSnack({
                title: "Erro",
                description: response,
                colorType: "#C62828"
            });
        }   
        setSubmitting(false);
    };

    const handleImage = async (event: any) => {

        const file = event.target.files[0];

        const base64 = await new Promise((resolve, reject) => {

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = error => reject(error);

        });

        const form = new FormData();
        form.append('image', file);

        const apiKey = 'd59f919486dae71c914c72721579be2c';

        const retorno = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, form, {
            //headers: form.getHeaders()
        });

        const url = retorno.data.data.url;
        // const reader = new FileReader();

        console.log("")
        console.log("BASE 64")
        console.log(base64)
        console.log("")
        console.log("")

        console.log("")
        console.log("URL")
        console.log(url)
        console.log("")
        console.log("")

        setImagem(url);

        // Código para enviar o arquivo para o servidor e obter a URL pública
        //const formData = new FormData();
        //formData.append('file', file);

    };

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '35ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div style={{ paddingBottom: 30 }}>
                <Header>MENSAGENS</Header>

                <Formik
                    initialValues={{mensagem: ''}}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors, handleSubmit }) => (
                        <Form>

                            <Box>
                                <BoxButtons>
                                    <input
                                        accept=".jpg, .jpeg, .png"
                                        style={{ display: 'none' }}
                                        //className={classes.input}
                                        id="contained-button-file"
                                        type="file"
                                        onChange={handleImage}
                                    />
                                    <label htmlFor="contained-button-file">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            component="span"
                                            startIcon={<Icon.CloudUpload />}
                                        //className={classes.uploadButton}
                                        >
                                            Selecionar imagem
                                        </Button>
                                    </label>
                                </BoxButtons>
                            </Box>

                            <Box>
                                <img src={imagem} style={{ maxWidth: 500 }}></img>
                            </Box>

                            <Box>
                                <p>Seus contatos: <b> {contatos?.quantidade} </b></p>
                            </Box>

                            <Field
                                name="mensagem"
                                style={{ width: '60%' }}
                                as={TextField}
                                id="outlined-multiline-flexible"
                                label="Mensagem"
                                multiline
                                rows={5}
                                //maxRows={5}
                                type="text"
                                error={Boolean(errors?.mensagem)}
                                helperText={errors?.mensagem}
                            />

                            <BoxButtons>
                                <Button type="submit" variant="contained" color='primary' onClick={handleSubmit} startIcon={<Icon.Send />}>
                                    Enviar
                                </Button>
                                <Button variant="contained" onClick={handleNavigation} color='error' startIcon={<Icon.Clear />}>
                                    Limpar
                                </Button>
                            </BoxButtons>

                        </Form>
                    )}
                </Formik>
            </div>
            {/* <ComponentTable />*/}
        </Box>

    );
}

