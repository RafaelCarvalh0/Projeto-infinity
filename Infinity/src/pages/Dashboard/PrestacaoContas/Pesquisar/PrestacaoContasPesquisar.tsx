import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ComponentTable from "../../../Components/Table/Index";
import { Header } from './PrestacaoContasPesquisarStyle';

export default function PrestacaoDeContas() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '35ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div style={{paddingBottom: 30}}>
      <Header>PRESTAÇÃO DE CONTAS</Header>
        <TextField
          id="outlined-password-input"
          label="Código"
          type="number"
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="Nome"
          type="text"
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="Endereço"
          type="text"
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="Bairro"
          type="text"
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="Cidade"
          type="text"
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="Complemento"
          type="text"
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="Número"
          type="number"
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="Situação"
          type="text"
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="Campo 1"
          type="text"
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          label="Senha"
          type="password"
          autoComplete="current-password"
        />
        <TextField
          id="outlined-password-input"
          required
          type="date"
          autoComplete="current-password"
        />
        <TextField
          id=""
          label="Password"
          type="password"
          autoComplete="current-password"
        />
      </div>
      <ComponentTable />
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