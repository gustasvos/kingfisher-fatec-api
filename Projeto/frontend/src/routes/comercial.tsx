import { Route } from "react-router-dom";
import CadastroCliente from "../modules/comercial/pages/cadastrocliente";
import ListaCliente from "../modules/comercial/pages/lista-cliente"
import PrivateWrapper from "./../shared/components/PrivateWrapper";
import FunilVendas from "../modules/comercial/pages/FunilVendas";
import AgendamentoCliente from "../modules/comercial/pages/agendamento-cliente";
import CotacaoFrete from "../modules/comercial/pages/historico-cotacoes";
import CalculoCotacao from "../modules/comercial/pages/CalculoCotacao";

export default function RotasComercial(){
    return (
        <>
        <Route path='/CadastroCliente' element={<PrivateWrapper roles={['comercial']}><CadastroCliente/></PrivateWrapper>}/>
        <Route path="/listaCliente" element={<PrivateWrapper roles={['comercial']}><ListaCliente /></PrivateWrapper>} />
        <Route path="/funilVendas" element={<PrivateWrapper roles={['comercial']}><FunilVendas /></PrivateWrapper>} />
        <Route path="/agendaCliente" element={<PrivateWrapper roles={['comercial']}><AgendamentoCliente /></PrivateWrapper>} />
        <Route path="/cotacao" element={<PrivateWrapper roles={['comercial']}><CotacaoFrete /></PrivateWrapper>} />
        <Route path="/calculoCusto" element={< CalculoCotacao />} />
        </>
    )
}