/* eslint-disable react-hooks/rules-of-hooks */
import { NavigateFunction } from "react-router-dom";
import * as route from "../routes/RoutesNames";
import Api from "../services/Api"
import { useDispatch, useSelector } from 'react-redux';
import { SalvarIdUsuario } from "../redux/modules/Authentication/Actions";

class AuthenticationController {

    public static async Create(request: Props, navigate: NavigateFunction): Promise<boolean> {
        try {
            //console.log("Controller")
            //console.log(request)

            //const retorno = await Create(request);

            //if(retorno !== null)
            //    navigate(route.Dashboard);
            //else 
            return true;

        } catch (error) {
            console.log("ERROOO CONTROLLER !!!!")
            console.log(error);
            throw new DOMException();
        }
    }

    public static async Login(request: Props): Promise<Login | null> {
        try {

            console.log("Controller")
            console.log(request)

            const response = await Api.post(`api/Usuario/Get`, request);

            const { data } = response;

            console.log(response.data)

            if (data !== null) {
                return data;
            }
            else
                return null;

        } catch (error) {
            console.log("ERROOO CONTROLLER !!!!")
            console.log(error);
            return null;
        }
    }
}

export default AuthenticationController;
