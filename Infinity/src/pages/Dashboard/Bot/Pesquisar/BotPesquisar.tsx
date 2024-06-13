import { useState, useEffect, useRef } from 'react';
import { Form, Formik, Field } from "formik";
import { BoxButtons, Button, Header } from './BotPesquisarStyle';
import Box from '@mui/material/Box';
import * as Icon from '@mui/icons-material/';
import { IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import ComponentTable from "../../../Components/Table/Index";
import SnackAlert from '../../../Components/AlertComponents/Snack/SnackAlert';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helpers } from '../../../Components/Helpers/Helpers';
import { Column } from '../../../Components/Table/Types';
import BotController from '../../../../controllers/BotController';

interface Row {
    BtnEditar: JSX.Element;
    BtnExcluir: JSX.Element;
    Id: number;
    BOT: string;
    Funcoes: string;
    DataInclusao: string | Date;
    Ativo: boolean;
}

interface Modal {
    title?: string
    description: string
    colorType?: string
}

export default function Bot() {
    const ref = useRef<HTMLButtonElement>(null);
    const userId = useSelector(state => state.Authentication.userId);
    const navigate = useNavigate();

    const [tableColumns, setTableColumns] = useState<Column[]>([
        //{ id: 'Edit'},
        //{ id: 'Delete'},
        /*        { id: 'Id', label: 'ID', minWidth: 0 },*/
        { id: 'BtnEditar', label: '', width: 60, minWidth: 0 },
        { id: 'BtnExcluir', label: '', width: 60, minWidth: 0 },
        { id: 'BOT', label: 'BOT', minWidth: 0 },
        { id: 'Funcoes', label: 'Funções', minWidth: 0 },
        { id: 'DataInclusao', label: 'Inclusão', minWidth: 0 },
        { id: 'Ativo', label: 'Ativo', minWidth: 0 }
    ]);


    const [tableRows, setTableRows] = useState<Row[]>([]);
    const [snack, setSnack] = useState<Modal>(null);

    useEffect(() => {
        ref?.current?.click();
    }, []);

    const handleSubmit = async (values: any, { setSubmitting }: any): Promise<void> => {

        console.log(values);
        setSubmitting(false);
        //setTableRows([]);

        const dataRows: any = [];
        const response = await BotController.Buscar(values);

        if (response.StatusCode === 200) {

            response.Data.map((item: Row) => {

                dataRows.push({
                    BtnEditar: <IconButton onClick={() => handleEditItem(item.Id, item.BOT, item.Celular)} aria-label="edit" color='info' title="Editar" > <Icon.Edit /></IconButton >,
                    BtnExcluir: <IconButton onClick={() => handleDeleteItem(item.Id)} aria-label="delete" color='error' title="Excluir"><Icon.Delete /></IconButton>,
                    Id: item.Id,
                    BOT: item.BOT,
                    Funcoes: Helpers.CellPhoneMaskShowing(item.Funcoes),
                    DataInclusao: Helpers.DateFormatShowing(item.DataInclusao),
                    Ativo: Helpers.DateFormatShowing(item.Ativo)
                });

                setTableRows(dataRows);

            });
        }
        else {
            setTableRows(null);
            setSnack({
                title: "Erro",
                description: "Não foi possivel carregar os contatos!",
                colorType: "#C62828"
            });
        }
    };


    const handleEditItem = (id: number, nome: string, celular: string) => {

        //navigate(BotAdicionar, {
        //    state: {
        //        ContatoId: id,
        //        Nome: nome,
        //        Celular: celular
        //    }
        //});
    }


    const handleDeleteItem = async (id: number) => {

        const request: any = { UserId: userId, ContatoId: id }
        const response = await BotController.Excluir(request);

        if (response.StatusCode === 200) {
            setSnack({
                title: "Concluído",
                description: "Contato excluído com sucesso.",
                colorType: "#1B5E20"
            });

            ref?.current?.click();
        }
        else {
            setSnack({
                title: "Erro",
                description: "Não foi possivel carregar os contatos!",
                colorType: "#C62828"
            });
        }
    }

    const CloseSnack = (): void => setSnack(null);

    const handleNavigation = async (): Promise<void> => {
        navigate(BotAdicionar);
    }

    //     const validationSchema = Yup.object({
    //         // Defina as regras de validação conforme necessário
    //         nome: Yup.string().min(3, "O Campo deve ter no mínimo 3 caracteres").required("Campo obrigatório"),
    //         sobrenome: Yup.string().required("Campo obrigatório"),
    //         dataNascimento: Yup.date().max(new Date(), "Não é possivel incluir uma data futura").required("Campo obrigatório"),
    //         naturalidade: Yup.string(), /*.required("Campo obrigatório"),*/
    //         endereco: Yup.string(),
    //         cidade: Yup.string(),
    //         email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
    //         celular: Yup.string().min(11, "O Campo deve ter no mínimo 11 caracteres").max(11, "O Campo deve ter no máximo 11 caracteres").matches(/^\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}$/, 'Formato inválido').required("Campo obrigatório")
    //     });

    const initialValues = {
        UsuarioId: userId,
        Codigo: '',
        BOT: '',
        Ativo: ''
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

            {snack !== null &&
                <SnackAlert modalProps={snack} onClose={CloseSnack} />
            }

            <div style={{ paddingBottom: 30 }}>
                <Header>BOT</Header>
                <Formik
                    initialValues={initialValues}
                    //validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors, handleSubmit }) => (
                        <Form>

                            <BoxButtons>

                                <Button ref={ref} type="submit" variant="contained" onClick={handleSubmit} color='primary' startIcon={<Icon.Search />}>
                                    Buscar
                                </Button>

                                <Button variant="contained" onClick={handleNavigation} color='success' startIcon={<Icon.Add />}>
                                    Incluir
                                </Button>

                            </BoxButtons>

                            <Field
                                name="Codigo"
                                as={TextField}
                                //id="outlined-password-input"
                                label="Código"
                                type="text"
                                error={Boolean(errors?.Codigo)}
                                helperText={errors?.Codigo}
                            />

                            <Field
                                name="BOT"
                                as={TextField}
                                label="BOT"
                                type="text"
                                error={Boolean(errors?.BOT)}
                                helperText={errors?.BOT}
                            />
                           
                            <Field
                                name="Ativo"
                                as={TextField}
                                //id="outlined-password-input"
                                label="Ativo"
                                type="text"
                                error={Boolean(errors?.Ativo)}
                                helperText={errors?.Ativo}
                            />

                        </Form>
                    )}
                </Formik>
            </div>
            <ComponentTable columns={tableColumns} rows={tableRows} />
        </Box>
    );
}


// import { Form, Formik } from "formik";
// import { Input } from "../../../Components/Inputs/Input";
// import * as Yup from "yup";
// import Divider from '@mui/material/Divider';
// import { Container, Area, FormContainer, Row, Table, Thead, Trow, RowTb, Td, Th, Header, TableContainer } from "./Style";
// import { Fragment, useState } from "react";
// import React from "react";
// import { menus } from "../../../Components/MenuNames/Menus";
// import ComponentTable from "../../../Components/Table/Index";

// const Clientes = () => {
//     const [value, setValue] = useState<any>();

//     const initialValues = {
//         nome: "",
//         sobrenome: "",
//         dataNascimento: "",
//         naturalidade: "",
//         endereco: "",
//         cidade: "",
//         email: "",
//         celular: ""
//     };

//     const validationSchema = Yup.object({
//         // Defina as regras de validação conforme necessário
//         nome: Yup.string().min(3, "O Campo deve ter no mínimo 3 caracteres").required("Campo obrigatório"),
//         sobrenome: Yup.string().required("Campo obrigatório"),
//         dataNascimento: Yup.date().max(new Date(), "Não é possivel incluir uma data futura").required("Campo obrigatório"),
//         naturalidade: Yup.string(), /*.required("Campo obrigatório"),*/
//         endereco: Yup.string(),
//         cidade: Yup.string(),
//         email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
//         celular: Yup.string().min(11, "O Campo deve ter no mínimo 11 caracteres").max(11, "O Campo deve ter no máximo 11 caracteres").matches(/^\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}$/, 'Formato inválido').required("Campo obrigatório")
//     });

//     const handleSubmit = (values: any, { setSubmitting }: any) => {
//         console.log(values);
//         setSubmitting(false);
//     };


//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;

//         // Remover todos os caracteres não numéricos
//         let onlyNumbers = value.replace(/\D/g, '').slice(0, 11);
//         let formattedValue = onlyNumbers;

//         // Aplicar a máscara
//         formattedValue = formattedValue.replace(/(\d{0,2})(\d{0,5})(\d{0,4})/, (_, ddd, firstPart, secondPart) => {
//             let mask = '';
//             if (ddd) mask += `(${ddd}`;
//             if (firstPart) mask += `) ${firstPart}`;
//             if (secondPart) mask += `-${secondPart}`;
//             return mask;
//         });

//         console.log("VALUE:", value);
//         setValue(formattedValue);
//     };
//     return (
//         <Container>
//             <Area>
//                 <Header>CLIENTES</Header>
//                 <Formik
//                     onSubmit={handleSubmit}
//                     initialValues={initialValues}
//                     validationSchema={validationSchema}
//                 >
//                     {({ values, isSubmitting }) => (

//                         <Form style={{ width: "100%" }}>
//                             <FormContainer>
//                                 <Row>
//                                     <Input name="nome" config={{ type: "text", label: "Nome", required: true }} />
//                                     <Input name="sobrenome" config={{ type: "text", label: "Sobrenome", required: true }} />
//                                     <Input name="dataNascimento" config={{ type: "date", required: true, label: "Data de Nascimento" }} />
//                                     <Input name="naturalidade" config={{ type: "text", label: "Naturalidade" }} />
//                                     <Input name="endereco" config={{ type: "text", label: "Endereço" }} />
//                                     <Input name="cidade" config={{ type: "text", label: "Cidade", disabled: !values.endereco }} />
//                                     <Input name="email" config={{ type: "email", label: "Email", required: true }} />
//                                     <Input name="celular" config={{ type: "text", label: "Celular", required: true, value: value, handleChange }} />
//                                     <Input name="nome" config={{ type: "text", label: "Nome", required: true }} />
//                                     <Input name="sobrenome" config={{ type: "text", label: "Sobrenome", required: true }} />
//                                     <Input name="dataNascimento" config={{ type: "date", required: true, label: "Data de Nascimento" }} />
//                                 </Row>
//                             </FormContainer>
//                         </Form>

//                     )}
//                 </Formik>
//                 {/* </Area> */}
//                 {/* <Area> */}
//                 <TableContainer>

//                 </TableContainer>
//             </Area>

//         </Container>
//     );
// }

// export default Clientes;