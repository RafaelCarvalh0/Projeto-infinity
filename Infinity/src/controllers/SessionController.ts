import { NavigateFunction } from "react-router-dom";
import * as route from "../routes/RoutesNames";
import Api from "../services/Api"

//interface Props {
//    clientId: string | null;
//}

class SessionController {

    public static async Status(clientId: string): Promise<any> {
        try {

            const response = await Api.get(`wapi/Session/Status/${clientId}`);

            if (response.data.message == "session_not_found") {
                await SessionController.Start(clientId);
            }

            else if (response.data.message == "session_not_connected") {
                //await SessionController.Terminate(clientId);
                //let qrCode = await SessionController.GetQRCode(clientId);
                let state = "desconectado";
                return state;
            }

            else if (response.data.message == "session_connected") {
                let state = "conectado";
                return state;
            }

            else {
                return null;
            }
  
        } catch (error) {
            return null;
        }
    }

    public static async Start(clientId: string) {
        try {

            const response = await Api.get(`wapi/Session/Start/${clientId}`);

            if (response.data.success) {
                return true;
            }
            else {
                return null
            }

        } catch (error) {
            return null;
        }
    }

    public static async GetQRCode(clientId: string): Promise<any> {
        try {

            const response = await Api.get(`wapi/Session/GetQR/${clientId}`);

            if (response.data.success) {
                return response.data.qr;
            }

            return null;

        } catch (error) {
            return null;
        }
    }

    public static async Terminate(clientId: string): Promise<any> {
        try {

            const response = await Api.get(`wapi/Session/Terminate/${clientId}`);

            if (response.data.success) {
                return "Deslogado com sucesso";
            }
            else {
                return "Implementar...";
            }

        } catch (error) {
            return null;
        }
    }
}

export default SessionController;
