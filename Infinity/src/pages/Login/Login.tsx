/* eslint-disable react-hooks/rules-of-hooks */
import React, { FormEvent, useEffect, useState } from "react";
import { Container, Logo, Box, Form, Input, Button, ErrorMessage } from "./LoginStyle";
import { useNavigate } from "react-router-dom";
import { Dashboard } from "../../routes/RoutesNames";
import AuthenticationController from "../../controllers/AuthenticationController";
import { SetIdUser, SetClientId } from "../../redux/modules/Authentication/Actions";
import { useDispatch, useSelector } from "react-redux";


const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState<string>();
    const [senha, setSenha] = useState<string>(); //ChangeEvent<HTMLInputElement
    const [liberado, setLiberado] = useState<boolean>();
    const dispatch = useDispatch();
    const userId = useSelector(state => state.Authentication.userId);

    useEffect(() => {
        console.log("")
        console.log("Valor Atual do estado de memória (ID do usuário) recebido na view (Login.tsx) para fins de teste!")
        console.log(userId)
        console.log("")
    }, [userId]);


    const validarLogin = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const request = { Email: email, Senha: senha }

        const retorno = await AuthenticationController.Login(request);

        if (retorno === null) {
            setLiberado(false);
        }
        else {
            dispatch(SetIdUser(retorno.Id));
            dispatch(SetClientId(retorno.ClientId));
            navigate(Dashboard);
        }

    };

    return (
        <React.Fragment>
            <Container>
                <Box>
                    <Logo
                        src="/images/infinity.png"
                        alt="Infinity"
                    />
                    <Form onSubmit={validarLogin}>
                        <Input type="text" onChange={(text) => {
                            setEmail(text.target.value);
                        }} placeholder="Email"
                        />
                        <Input type="password" onChange={(text) => {
                            setSenha(text.target.value);
                        }} placeholder="Senha"
                        />
                        {liberado == false &&
                            <ErrorMessage>Login e/ou senha inválidos.</ErrorMessage>
                        }
                        <Button type="submit">LOGIN</Button>
                    </Form>
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default Login;
