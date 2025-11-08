import { Route } from "react-router-dom";
import CadastroCliente from "../modules/comercial/pages/cadastrocliente";
import ListaCliente from "../modules/comercial/pages/lista-cliente"
import PrivateWrapper from "./../shared/components/PrivateWrapper";
import FunilVendas from "../modules/comercial/pages/FunilVendas";
import AgendamentoCliente from "../modules/comercial/pages/agendamento-cliente";
import { HistoricoInteracao } from "../modules/comercial/components/historico-interacao";

export default function RotasComercial(){
    return (
        <>
        <Route path='/CadastroCliente' element={<PrivateWrapper roles={['comercial']}><CadastroCliente/></PrivateWrapper>}/>
        <Route path="/listaCliente" element={<PrivateWrapper roles={['comercial']}><ListaCliente /></PrivateWrapper>} />
        <Route path="/funilVendas" element={<PrivateWrapper roles={['comercial']}><FunilVendas /></PrivateWrapper>} />
        <Route path="/agendaCliente" element={<PrivateWrapper roles={['comercial']}><AgendamentoCliente /></PrivateWrapper>} />
         <Route path="/historicoInteracao" element={<HistoricoInteracao/>} />
        </>
    )
}