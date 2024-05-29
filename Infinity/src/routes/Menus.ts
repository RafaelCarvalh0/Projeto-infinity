import * as Icon from '@mui/icons-material/';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import * as path from '../routes/RoutesNames';

export type Menu = {
    id: number,
    screenName: string,
    screenRoute: string,
    subscreenRoute?: string,
    icon: OverridableComponent<SvgIconTypeMap>,
    active: boolean
}

export const menus: Menu[] = [
    {
        id: 0,
        screenName: 'Home',
        screenRoute: path.Home,
        subscreenRoute: '',
        icon: Icon.Home,
        active: true,
    },
    {
        id: 1,
        screenName: 'Contatos',
        screenRoute: path.Contatos,
        //subscreenRoute: path.UsuariosCadastro,
        icon: Icon.People,
        active: true,
    },
    {
        id: 2,
        screenName: 'Mensagens',
        screenRoute: path.Mensagens,
        //subscreenRoute: path.ClientesCadastro,
        icon: Icon.Send,
        active: true
    },
    {
        id: 3,
        screenName: 'Bot',
        screenRoute: path.Bot,
        //subscreenRoute: path.ProdutosCadastro,
        icon: Icon.ElectricBolt,
        active: true,
    },
    {
        id: 7,
        screenName: 'Logout',
        screenRoute: path.Login,
        subscreenRoute: '',
        icon: Icon.Logout,
        active: true,
    }
];