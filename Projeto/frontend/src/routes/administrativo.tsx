import { Route } from "react-router-dom"
import LoginPage from "../modules/administrativo/pages/login-page"
import Cadastro from '../modules/administrativo/pages/PaginaCadastro';
import EventoDetalhePage from "../modules/administrativo/pages/eventoDetalhe-page"
import ListagemColaborador from "../modules/administrativo/pages/listagem-colaborador-page"
import NovoEvento from "../modules/administrativo/components/novoEvento";
import PaginaEventos from "../modules/administrativo/components/paginaEventos";
import HomePage from "../modules/administrativo/pages/home-Page";
import Eventos from "../modules/administrativo/components/listagem-eventos";
import LocalDeTrabalho from "../modules/administrativo/components/colaboradorLoca";





export default function RotasADM(){
    return (
        <>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/cadastrar" element={<Cadastro />} />
            <Route path="/evento-convite" element={<EventoDetalhePage/>}/>
            <Route path="/colaboradores" element={<ListagemColaborador/>}/>
            <Route path="/eventos" element={<PaginaEventos/>}/>
            <Route path="/novo-evento" element={<NovoEvento/>}/>
            <Route path="/home" element={<HomePage/>} />
            <Route path="/teste" element={<Eventos />} />
            <Route path="/teste1" element={<LocalDeTrabalho />} />
        </>
    )
}