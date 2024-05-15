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
        screenName: 'Produtos',
        screenRoute: path.Produtos,
        subscreenRoute: path.ProdutosCadastro,
        icon: Icon.Category,
        active: true,
    },
    {
        id: 4,
        screenName: 'Prestação de contas',
        screenRoute: path.PrestacaoDeContas,
        subscreenRoute: path.PrestacaoDeContasCadastro,
        icon: Icon.Paid,
        active: true,
    },
    {
        id: 5,
        screenName: 'Recebimentos',
        screenRoute: 'Recebimentos',
        subscreenRoute: 'RecebimentosCadastro',
        icon: Icon.CurrencyExchange,
        active: true,
    },
    {
        id: 6,
        screenName: 'Faturamento',
        screenRoute: 'Faturamento',
        subscreenRoute: 'FaturamentoCadastro',
        icon: Icon.AttachMoney,
        active: true,
    },
    {
        id: 7,
        screenName: 'Logout',
        screenRoute: 'Logout',
        subscreenRoute: '',
        icon: Icon.Logout,
        active: true,
    }

];