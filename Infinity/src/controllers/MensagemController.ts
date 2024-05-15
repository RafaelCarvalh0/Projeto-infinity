import { NavigateFunction } from "react-router-dom";
import * as route from "../routes/RoutesNames";
import Api from "../services/Api"
import { ErrorDictionary } from "../pages/Components/Helpers/ErrorDictionary";
import { Mensagem, Response } from "./Types";
import axios from "axios";

class MensagemController {

    public static async Enviar(request: Mensagem): Promise<Array<[]> | any> {
        try {
            console.log("Controller Enviar")
            console.log(request)

            //const base64 = GetBase64Img();
            
            const response = await Api.post(`wapi/Client/GetChats/${request.ClientId}`)

            const { data } = response;

            const retorno: Response = { StatusCode: response.status, Data: data }
            return retorno;

        } catch (error: any) {

            const retorno: Response = { Data: ErrorDictionary(error.response.status) }
            return retorno;

        }
    }

    //public static async GetBase64Img(fileUrl: string): Promise<object> {
    //    try {

    //        const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });

    //        return { mimetype: response.headers['content-type'], base64: response.data.toString('base64') };
    //    }
    //    catch (error) {
    //        console.log(error);
    //    }
    //}
}

export default MensagemController;