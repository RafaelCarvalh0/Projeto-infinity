import { Routes as _Routes, Route, BrowserRouter as Router } from "react-router-dom";
import * as path from './RoutesNames';
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Home from "../pages/Dashboard/Home/Home";
import Produtos from "../pages/Dashboard/Produtos/Pesquisar/ProdutosPesquisar";
import PrestacaoDeContas from "../pages/Dashboard/PrestacaoContas/Pesquisar/PrestacaoContasPesquisar";
import Contatos from "../pages/Dashboard/Contatos/Pesquisar/ContatosPesquisar";
import ContatosAdicionar from "../pages/Dashboard/Contatos/Adicionar/ContatosAdicionar";
import Mensagens from "../pages/Dashboard/Mensagens/Mensagens";

const Routes = () => {
    return (
        <Router>
            <_Routes>
                <Route path="/" element={<Login />}>

                </Route>

                <Route path={path.Dashboard} element={<Dashboard />}>
                    <Route path={path.Home} element={<Home />} />
                    <Route path={path.Contatos} element={<Contatos />} />
                    <Route path={path.ContatosAdicionar} element={<ContatosAdicionar />} />
                    <Route path={path.Mensagens} element={<Mensagens />} />
{/*                    <Route path={path.ClientesCadastro} element={<ClientesCadastro />} />*/}
                    <Route path={path.Produtos} element={<Produtos />} />
                    <Route path={path.PrestacaoDeContas} element={<PrestacaoDeContas />} />
                </Route>

                {/* <Route path="/dashboard/clientes/" element={<Clientes />}>

            </Route> */}

                {/* <Route path="/teste" element={<div>OI <Outlet /></div> }>
                
                <Route path="/teste" element={<div>CSS</div>} />
                <Route path="/teste/clientes" element={<div>Olá</div>} />
              
            </Route> */}
            </_Routes>
        </Router>
    );
}

export default Routes;
