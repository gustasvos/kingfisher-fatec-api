import { Route } from "react-router-dom"
import LoginPage from "../modules/administrativo/pages/login-page"
import Cadastro from '../modules/administrativo/pages/PaginaCadastro';
import EventoDetalhe from "../modules/administrativo/components/eventoDetalhe";
import PaginaEventos from "../modules/administrativo/components/paginaEventos";
import ListagemColaborador from "../modules/administrativo/components/listagem-colaborador";
import HomePage from "../modules/administrativo/pages/home-Page";
import LocalDeTrabalho from "../modules/administrativo/components/localTrabalho";
import ListagemEventos from "../modules/administrativo/components/listagem-eventos";
import RespostaEventos from "../modules/administrativo/pages/page-resposta-eventos";
import PrivateWrapper from "./../shared/components/PrivateWrapper";
import HomeOpAdminPage from "../modules/operacional/pages/home-op-admin"

export default function RotasADM(){
    return (
        <>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/cadastrar" element={<PrivateWrapper roles={['admin']}><Cadastro /></PrivateWrapper>} />
            <Route path="/evento-convite" element={<PrivateWrapper roles={['admin']}><EventoDetalhe/></PrivateWrapper>}/>
            <Route path="/colaboradores" element={<PrivateWrapper roles={['admin']}><ListagemColaborador/></PrivateWrapper>}/>
            <Route path="/eventos" element={<PrivateWrapper roles={['admin','operacional','comercial']}><PaginaEventos/></PrivateWrapper>}/>
            <Route path="/home" element={<PrivateWrapper roles={['admin']}><HomePage/></PrivateWrapper>} />
            <Route path="/eventos-colaborador" element={<PrivateWrapper roles={['admin','operacional','comercial']}><ListagemEventos /></PrivateWrapper>} />
            <Route path="/local-trabalho" element={<PrivateWrapper roles={['admin','operacional','comercial']}><LocalDeTrabalho /></PrivateWrapper>} />
            <Route path="/resposta-eventos" element={<PrivateWrapper roles={['admin','operacional','comercial']}><RespostaEventos /></PrivateWrapper>} />
            <Route path="/home-op-admin" element={<PrivateWrapper roles={['admin']}><HomeOpAdminPage/></PrivateWrapper>}/>
        </>
    )
}
