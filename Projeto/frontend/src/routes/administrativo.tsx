import { Route } from "react-router-dom"
import LoginPage from "../modules/administrativo/pages/login-page"
import Cadastro from '../modules/administrativo/pages/PaginaCadastro';
import AtualizarCadastro from '../modules/administrativo/pages/atualizarCadastro';
import EventoDetalhePage from "../modules/administrativo/pages/eventoDetalhe-page"
import NovoEvento from "../modules/administrativo/components/novoEvento";
import PaginaEventos from "../modules/administrativo/components/paginaEventos";
import ListagemColaborador from "../modules/administrativo/components/listagem-colaborador";
import HomePage from "../modules/administrativo/pages/home-Page";
import LocalDeTrabalho from "../modules/administrativo/components/colaboradorLoca";
import ListagemEventos from "../modules/administrativo/components/listagem-eventos";
import RelatorioAproveitamento  from "../modules/administrativo/components/relatorio-aproveitamento";

export default function RotasADM(){
    return (
        <>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/cadastrar" element={<Cadastro />} />
            <Route path="/editar-cadastro/:id" element={<AtualizarCadastro />} />
            <Route path="/evento-convite" element={<EventoDetalhePage/>}/>
            <Route path="/colaboradores" element={<ListagemColaborador/>}/>
            <Route path="/eventos" element={<PaginaEventos/>}/>
            <Route path="/novo-evento" element={<NovoEvento/>}/>
            <Route path="/home" element={<HomePage/>} />
            <Route path="/eventos-colaborador" element={<ListagemEventos />} />
            <Route path="/local-trabalho" element={<LocalDeTrabalho />} />
            <Route path="/relatorio-aproveitamento" element={<RelatorioAproveitamento />} />
        </>
    )
}
