import { Route } from "react-router-dom"
import LoginPage from "../modules/administrativo/pages/login-page"
import Cadastro from '../modules/administrativo/pages/PaginaCadastro';
import EventoDetalhe from "../modules/administrativo/components/eventoDetalhe";
import PaginaEventos from "../modules/administrativo/components/paginaEventos";
import ListagemColaborador from "../modules/administrativo/components/listagem-colaborador";
import HomePage from "../modules/administrativo/pages/home-Page";
import LocalDeTrabalho from "../modules/administrativo/components/localTrabalho";
import ListagemEventos from "../modules/administrativo/components/listagem-eventos";

export default function RotasADM(){
    return (
        <>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/cadastrar" element={<Cadastro />} />
            <Route path="/evento-convite" element={<EventoDetalhe/>}/>
            <Route path="/colaboradores" element={<ListagemColaborador/>}/>
            <Route path="/eventos" element={<PaginaEventos/>}/>
            <Route path="/home" element={<HomePage/>} />
            <Route path="/eventos-colaborador" element={<ListagemEventos />} />
            <Route path="/local-trabalho" element={<LocalDeTrabalho />} />
        </>
    )
}
