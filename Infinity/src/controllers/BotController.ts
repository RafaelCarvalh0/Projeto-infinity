import { NavigateFunction } from "react-router-dom";
import * as route from "../routes/RoutesNames";
import Api from "../services/Api"

//interface Props {
//    clientId: string | null;
//}

class BotController {

    public static async Buscar(clientId: string): Promise<any> {
        try {
            console.log("Controller Buscar")
            console.log(request)

            const MaskedRequest = {
                UsuarioId: request.UsuarioId,
                Nome: request.Nome,
                Celular: request.Celular.replace(/\(|\)|\s|-/g, "")
            }

            const response = await Api.post(`api/Contato/Buscar`, MaskedRequest)

            const { data } = response;

            const retorno: Response = { StatusCode: response.status, Data: data }
            return retorno;

        } catch (error) {
            console.log(error)
            const retorno: Response = { StatusCode: error?.response?.status, Data: error?.response?.data?.ErroDetalhado }
            return retorno;
        }
    }

    public static async Salvar(clientId: string) {
        try {

            console.log("Controller Salvar")
            console.log(request)

            const MaskedRequest = {
                UsuarioId: request.UsuarioId,
                Nome: request.Nome,
                Celular: request.Celular.replace(/\(|\)|\s|-/g, "")
            }

            const response = await Api.post(`api/Contato/Salvar/`, MaskedRequest);

            const { data } = response;

            const retorno: Response = { StatusCode: response.status, Data: data }
            return retorno;

        } catch (error: any) {
            console.log(error)
            const retorno: Response = { StatusCode: error?.response?.status, Data: error?.response?.data?.ErroDetalhado }
            return retorno;
        }
    }

    public static async Editar(clientId: string) {
        try {

            console.log("Controller Editar")
            console.log(request)

            const MaskedRequest = {
                UsuarioId: request.UsuarioId,
                ContatoId: request.ContatoId,
                Nome: request.Nome,
                Celular: request.Celular.replace(/\(|\)|\s|-/g, "")
            }

            const response = await Api.put(`api/Contato/Editar/`, MaskedRequest);

            const { data } = response;

            const retorno: Response = { StatusCode: response.status, Data: data }
            return retorno;

        } catch (error: any) {
            console.log(error)
            const retorno: Response = { StatusCode: error?.response?.status, Data: error?.response?.data?.ErroDetalhado }
            return retorno;
        }
    }

    public static async Excluir(clientId: string): Promise<any> {
        try {

            const response = await Api.delete(`api/Contato/Excluir/${request.UserId}/${request.ContatoId}`);

            const { data } = response;

            const retorno: Response = { StatusCode: response.status, Data: data }
            return retorno;

        } catch (error: any) {

            console.log(error)
            const retorno: Response = { StatusCode: error?.response?.status, Data: error?.response?.data?.ErroDetalhado }
            return retorno;           
        }
    }
}

export default BotController;