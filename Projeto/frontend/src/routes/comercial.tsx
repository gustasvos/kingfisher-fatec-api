import { Route } from "react-router-dom";
import CadastroCliente from "../modules/comercial/pages/cadastrocliente";
import ListaCliente from "../modules/comercial/pages/lista-cliente"
import PrivateWrapper from "./../shared/components/PrivateWrapper";
import AgendamentoCliente from "../modules/comercial/pages/agendamento-cliente";

export default function RotasComercial(){
    return (
        <>
        <Route path='/CadastroCliente' element={<PrivateWrapper roles={['comercial']}><CadastroCliente/></PrivateWrapper>}/>
        <Route path="/listaCliente" element={<PrivateWrapper roles={['comercial']}><ListaCliente /></PrivateWrapper>} />
        <Route path="/agendaCliente" element={<PrivateWrapper roles={['comercial']}><AgendamentoCliente /></PrivateWrapper>} />
        </>
    )
}