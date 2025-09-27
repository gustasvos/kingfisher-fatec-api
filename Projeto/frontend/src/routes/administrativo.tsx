import { Route } from "react-router-dom"
import LoginPage from "../modules/administrativo/pages/login-page"
import Cadastro from '../modules/administrativo/pages/PaginaCadastro';
import EventoDetalhePage from "../modules/administrativo/pages/eventoDetalhe-page"
import NovoEvento from "../modules/administrativo/components/novoEvento";


export default function RotasADM(){
    return (
        <>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/cadastrar" element={<Cadastro />} />
            <Route path="/eventoDetalhe" element={<EventoDetalhePage/>}/>
            <Route path="/novoEvento" element={<NovoEvento/>}/>
        </>
    )
}