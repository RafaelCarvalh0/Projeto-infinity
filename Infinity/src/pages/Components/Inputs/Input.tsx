// import React from "react";
// import { Container, ErrorStyled, FieldStyle as Field, Label, RequiredLabel } from './Style';
// import { ErrorMessage } from "formik";

// interface Props {
//     name: string,
//     config: any
// }

// export const Input = ({ name, config, ...props }: Props) => {
//     const { type, label, required, handleChange, value, disabled } = config;
//     return (
//        <Container>
//             <Label>
//                 {label || name}
//                 {required && <RequiredLabel>*</RequiredLabel>}
//             </Label>
//             <Field name={name} type={type} disabled={disabled} value={value} onChange={handleChange} {...props}  />
//             <ErrorMessage name={name} component={ErrorStyled}></ErrorMessage>
//        </Container>
//     );
// }