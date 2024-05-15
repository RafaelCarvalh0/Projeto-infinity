import React, { useEffect, useState } from "react";
import { Container, Box, Image, AreaInfo } from "./HomeStyle";
import QRCodeGenerator from "../../Components/QRCodeGenerator/QRCode";
import SessionController from "../../../controllers/SessionController";
import { useDispatch, useSelector } from "react-redux";
import { Task } from "@mui/icons-material";

const Home = () => {
    const clientId = useSelector(state => state.Authentication.clientId);
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [session, setSession] = useState<string | null>(null);

    useEffect(() => {

        const intervalId = setInterval(() => {
            iniciarSessao();
        }, 20000); 

        // Limpe o intervalo quando o componente for desmontado
        return () => clearInterval(intervalId);

    }, []);

    useEffect(() => {
        iniciarSessao();
    }, [qrCode]);

    const iniciarSessao = async () => {

        const status = await SessionController.Status(clientId);

        if (status === "conectado") {
            setSession(status);
            setQrCode(null);
        }

        else if (status === "desconectado") {

            const qrCode = await SessionController.GetQRCode(clientId);

            if (qrCode !== null) {
                setQrCode(qrCode);
                setSession(null);
            }
       
        }

        else
        {
            setSession(null);
            setQrCode(null);
        }

    };

    return (
        <React.Fragment>
            <Container>
                <Image src="/images/infinity.png" />
                <Box>

                    {qrCode !== null && session !== "conectado" &&
                        <QRCodeGenerator data={qrCode} />
                    }

                    {qrCode === null && session === "conectado" && 
                        <AreaInfo>Dispositivo conectado</AreaInfo>
                    }

                </Box>
            </Container>
        </React.Fragment>
    );
}

export default Home;