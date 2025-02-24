import { NavigateFunction } from "react-router-dom";
import * as route from "../routes/RoutesNames";
import Api from "../services/Api"
import { ErrorDictionary } from "../pages/Components/Helpers/ErrorDictionary";
import { Contato, ContatoLote, Response } from "./Types";

class ContatoController {

    public static async Buscar(request: Contato): Promise<Response> {
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

    public static async Salvar(request: Contato/*, navigate: NavigateFunction*/): Promise<Response> {
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

    public static async SalvarLista(request: ContatoLote): Promise<Response> {
        try {

            console.log("Controller Salvar Lista")
            console.log(request)

            const response = await Api.post(`api/Contato/SalvarLista/`, request);

            const { data } = response;

            const retorno: Response = { StatusCode: response.status, Data: data }
            return retorno;

        } catch (error: any) {
            console.log(error)
            const retorno: Response = { StatusCode: error?.response?.status, Data: error?.response?.data?.ErroDetalhado }
            return retorno;
        }
    }

    public static async Editar(request: Contato/*, navigate: NavigateFunction*/): Promise<Response> {
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

    public static async Excluir(request: { UserId: number, ContatoId: number }/*, navigate: NavigateFunction*/): Promise<Response> {
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

    public static async ExcluirTudo(request: { UserId: number, Senha: string }): Promise<Response> {
        try {

            const response = await Api.delete(`api/Contato/ExcluirTudo/${request.UserId}/${request.Senha}`);

            const { data } = response;

            const retorno: Response = { StatusCode: response.status, Data: data }
            return retorno;

        } catch (error: any) {
            console.log(error)
            const retorno: Response = { StatusCode: error?.response?.status, Data: error?.response?.data?.ErroDetalhado }
            return retorno;
        }
    }

    public static async Extrair(clientId: string /*, navigate: NavigateFunction*/): Promise<Array<[]> | any> {
        try {

            const response = await Api.get(`wapi/Client/GetChats/${clientId}`);

            if (response.data.success) {
                let { chats } = response.data;
                return chats;
            }

            return null;

        } catch (error: any) {
            return null;
        }
    }

    public static async GetPushName(ClientId: string, ContactNumber: string): Promise<Response> {
        try {

            const response = await Api.post(`wapi/Chat/GetContact/`, {
                ClientId: ClientId,
                ContactNumber: ContactNumber
            });
            
            const { data } = response;

            const retorno: Response = { StatusCode: response.status, Data: data }
            return retorno;

        } catch (error: any) {
            const retorno: Response = { Data: ErrorDictionary(error.response.status) }
            return retorno;
        }
    }
}

export default ContatoController;
