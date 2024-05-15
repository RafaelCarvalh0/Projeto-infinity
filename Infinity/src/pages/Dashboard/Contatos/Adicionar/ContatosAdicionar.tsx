import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
//import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { Header, BoxButtons, Button } from './ContatosAdicionarStyle';
import * as Icon from '@mui/icons-material/';
import { createBrowserHistory } from 'history';
import { Divider, IconButton, Typography } from '@mui/material';
import { Area } from './ContatosAdicionarStyle';
import ComponentTable from '../../../Components/Table/Index';
import { useEffect, useState } from 'react';
import { Column, TableButton } from '../../../Components/Table/Types';
import ContatoController from '../../../../controllers/ContatoController';
import { useDispatch, useSelector } from "react-redux";
import { Helpers } from '../../../Components/Helpers/Helpers';
import { useLocation } from 'react-router-dom';
import ModalAlert from '../../../Components/AlertComponents/Modal/ModalAlert';
import SnackAlert from '../../../Components/AlertComponents/Snack/SnackAlert';
//import { makeStyles } from '@material-ui/core/styles';
import * as XLSX from 'xlsx';

interface Row {
    btnExtract: JSX.Element;
    Grupo: string;
    Participantes: string;
    Status: string;
}

interface Snack {
    title?: string
    description?: string
    colorType?: string
}

interface Modal {
    title?: string
    description1: string
    description2?: string
    colorType?: string
}

// const useStyles = makeStyles((theme) => ({
//     input: {
//         display: 'none',
//     },
//     uploadButton: {

//     },
// }));

export default function ContatosAdicionar() {
    const location = useLocation();
    //const classes = useStyles();
    const [sheetData, setSheetData] = useState([]);
    const { userId, clientId } = useSelector(state => state.Authentication);

    const history = createBrowserHistory();
    const [snack, setSnack] = useState<Snack|any>(null);
    const [modal, setModal] = useState<Modal|any>(null);

    //const [value, setValue] = useState('');

    const [tableColumns, setTableColumns] = useState<Column[]>([
        { id: 'BtnExtract', label: '', width: 60, minWidth: 0 },
        { id: 'Grupo', label: 'Grupo', minWidth: 0 },
        { id: 'Participantes', label: 'Participantes', minWidth: 0 },
        { id: 'Status', label: 'Status', minWidth: 0 }
    ]);

    const [tableRows, setTableRows] = useState<Row[]>([]);

    const initialValues = {
        UsuarioId: userId,
        Nome: location?.state?.Nome ? location?.state?.Nome : '',
        Celular: location?.state?.Celular ? Helpers.CellPhoneMaskShowing(location?.state?.Celular) : '',
        Dinheiro: ''
    };

    const validationSchema = Yup.object().shape({
        Nome: Yup.string().min(3, "O Campo deve ter no mínimo 3 caracteres"),
        Celular: Yup.string().required("O Campo celular deve ser preenchido!").min(15, "Campo incompleto"),//.max(11, "O Campo deve ter no máximo 11 caracteres").matches(/^\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}$/, 'Formato inválido')
        Dinheiro: Yup.string()
    });

    const handleSubmit = async (values: any, { setSubmitting, resetForm }: any): void => {

        //console.log(value)

        if (location?.state === null) {
            const response = await ContatoController.Salvar(values);

            if (typeof response === 'string') {
                setSnack({
                    title: "Erro",
                    description: response,
                    colorType: "#C62828"
                });
            }
            else if (typeof response === 'boolean') {
                setSnack({
                    title: "Concluído",
                    description: "Contato Inserido com sucesso!",
                    colorType: "#1B5E20"
                });
                resetForm();
            }
        }

        else if (location?.state !== null) {
            EditarContato(values, { setSubmitting, resetForm });
        }

        setSubmitting(false);
    };

    const EditarContato = async (values: any, { setSubmitting, resetForm }: any) => {

        const request = {
            ContatoId: location?.state.ContatoId,
            ...values
        }

        const response = await ContatoController.Editar(request);

        if (typeof response === 'string') {
            setSnack({
                title: "Erro",
                description: response,
                colorType: "#C62828"
            });
        }
        else if (typeof response === 'boolean') {

            setSnack({
                title: "Concluído",
                description: "Contato Editado com sucesso!",
                colorType: "#1B5E20"
            });
        }

        setSubmitting(false);
    }

    const CloseSnack = (): void => {
        setSnack(null);
    }

    const CloseModal = (): void => {
        setModal(null);
    }

    const handleExtract = async (): Promise<void> => {

        //setTableRows([]);

        const response = await ContatoController.Extrair(clientId);

        const dataRows: any = [];

        console.log(response)
        if (response.length > 0) {

            response.map((item: any) => {

                if (item.isGroup) {
                   
                    dataRows.push({
                        BtnExtract: <IconButton onClick={() => selectedGroupToExtract(item.groupMetadata.participants)} aria-label="extract" color='info' title="Extrair"><Icon.Download /></IconButton>,
                        Grupo: item.name,
                        Participantes: item.groupMetadata?.participants?.length,
                        Status: item.groupMetadata?.restrict === true ? "Restrito" : "Aberto" //Livre
                    });
                }

            });

            //console.log(dataRows)
            setTableRows(dataRows);
        }
    }

    const selectedGroupToExtract = async (contacts: Array<[]>) => {

        let contactsList: any = [];
        for (let i = 0; i < contacts.length; i++) {

            let phoneNumber = contacts[i].id.user;

            if (phoneNumber.startsWith("55")) {

                // const response = await ContatoController.GetPushName(clientId, contacts[i].id._serialized);

                // if (response.StatusCode) {
                // console.log("")
                // console.log("PUSHNAME")
                // console.log(response)
                // console.log("")
                // //response?.Data?.contact?.pushname === undefined ? response?.Data?.contact?.verifiedName : response?.Data?.contact?.pushname
                // }
                // else {
                //     console.log(response.Data)                 
                // }

                contactsList.push({ Nome: '', Celular: contacts[i].id.user.slice(2) });
            }

            else {
                //console.log(contacts[i].id.user)
            }

        }

        SalvarContatos(contactsList);     
    }

    const SalvarContatos = async (contactsList) => {
        const Request = {
            UsuarioId: userId,
            ContatoJson: JSON.stringify(contactsList)
        }
        const response = await ContatoController.SalvarLista(Request);

        if (response !== null) {
            setModal({
                title: "Resultado da extração",
                description1: response.ContatosInseridos === '0' ? `Você já extraiu todos os contatos desse item!` : 'Contatos extraídos: ' + response.ContatosInseridos,
                //description2: `Contatos já extraídos: ${response.ContatosExistentes}`,
                colorType: "#1B5E20"
            });
        }
        console.log("")
        console.log("Lista de contatos Extraidos !!!!")
        console.log(contactsList)
        console.log("")
    }

    //Upload do arquivo XLSX
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const range = XLSX.utils.decode_range(sheet['!ref']);

            let allValues = [];

            //Laço percorrendo todas as células de todas as linhas do xlsx e extraindo somente NÚMEROS maior que 10 caracteres
            for (let R = range.s.r; R <= range.e.r; ++R) {
                let row = [];
                for (let C = range.s.c; C <= range.e.c; ++C) {
                    const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
                    const cell = sheet[cellRef];
                    if (cell && cell.v !== null && typeof cell.v === 'number' && cell.v.toString().length > 10) {
                        row.push(cell.v);
                    }
                }
                if (row.length > 0) {
                    allValues.push(row);
                }
            }

            // Novo array concatenando todos os valores de 1 ou vários arrays de números recebidos de qualquer célula da planilha
            const ArrayContatos = allValues.reduce((accumulator, currentValue) => {
                if (Array.isArray(currentValue)) {
                    accumulator = accumulator.concat(currentValue);
                } else {
                    accumulator.push(currentValue);
                }
                return accumulator;
            }, []);

            //Cria um novo array montando o request da maneira que a API espera!
            let contactsList: any = [];
            for (let i = 0; i < ArrayContatos.length; i++) {
                contactsList.push({ Nome: '', Celular: ArrayContatos[i] });
            }

            SalvarContatos(contactsList);
        };

        reader.readAsArrayBuffer(file);
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

            <Header>ADICIONAR CONTATOS</Header>

            {snack !== null &&
                <SnackAlert modalProps={snack} onClose={CloseSnack} />
                // <ModalAlert title={showModal.title} description={showModal.description} onClose={CloseModal} />
            }

            {modal !== null &&
                <ModalAlert modalProps={modal} onClose={CloseModal} />
            }

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, errors, handleSubmit, resetForm }) => (
                    <Form>
                        <BoxButtons>
                            <Button variant="contained" onClick={() => history.back()} color='warning' startIcon={<Icon.ArrowBack />}>
                                Voltar
                            </Button>
                            <Button variant="contained" onClick={handleSubmit} color='success' startIcon={<Icon.Save />}>
                                Salvar
                            </Button>
                        </BoxButtons>

                        <Field
                            name="Nome"
                            as={TextField}
                            label="Nome (Opcional)"
                            placeholder=""
                            type="text"
                            error={Boolean(errors?.Nome)}
                            helperText={errors?.Nome}
                        />
                        <Field
                            name="Celular"
                            as={TextField}
                            //id="outlined-password-input"
                            label="Celular"
                            type="text"
                            error={Boolean(errors?.Celular)}
                            helperText={errors?.Celular}
                            onInput={(e: any) => Helpers.CellPhoneMaskEditing(e)}
                        />

                        {/*<Field*/}
                        {/*    name="Dinheiro"*/}
                        {/*    render={({ field }) => (*/}
                        {/*        <NumericFormat*/}
                        {/*            {...field}*/}
                        {/*            customInput={TextField}*/}
                        {/*            label="Dinheiro"*/}
                        {/*            thousandSeparator="."*/}
                        {/*            decimalSeparator=","*/}
                        {/*            prefix="R$ "*/}
                        {/*            allowNegative={false}*/}
                        {/*            decimalScale={2}*/}
                        {/*            fixedDecimalScale={true}*/}
                        {/*            allowedDecimalSeparators={[]}*/}
                        {/*            error={Boolean(field.error)}*/}
                        {/*            helperText={<ErrorMessage name="Dinheiro" />}*/}
                        {/*            onValueChange={(values) => { setValue(values.value) }}*/}
                        {/*        />*/}
                        {/*    )}*/}
                        {/*/>*/}

                        {/*<NumericFormat*/}
                        {/*    name="Dinheiro"*/}
                        {/*    prefix="R$ "*/}
                        {/*    thousandSeparator="."*/}
                        {/*    customInput={TextField}*/}
                        {/*    label="Dinheiro"*/}
                        {/*    allowNegative={false}*/}
                        {/*    decimalScale={2}*/}
                        {/*    fixedDecimalScale={true}*/}
                        {/*    allowedDecimalSeparators={[]}*/}
                        {/*    decimalSeparator=","*/}
                        {/*    onValueChange={(values) => { setValue(values.value) }}*/}
                        {/*/>*/}

                    </Form>
                )}
            </Formik>


            {/* <ComponentTable /> */}
            <Divider />
            <Area>
                <BoxButtons>
                    <input
                        accept=".xlsx, .xls"
                        style={{display: 'none'}}
                        id="contained-button-file"
                        type="file"
                        onChange={handleFileUpload}
                    />
                    <label htmlFor="contained-button-file">
                        <Button
                            variant="contained"
                            color="primary"
                            component="span"
                            startIcon={<Icon.CloudUpload />}
                            //className={classes.uploadButton}
                        >
                            Planilha
                        </Button>
                    </label>
                    <Button variant="contained" onClick={handleExtract} color='secondary' startIcon={<Icon.GetApp />}>
                        Extrair
                    </Button>
                </BoxButtons>
                <ComponentTable columns={tableColumns} rows={tableRows} />
            </Area>
        </Box>

    );
}
