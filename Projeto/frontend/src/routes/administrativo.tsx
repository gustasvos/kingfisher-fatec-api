import { Route } from "react-router-dom"
import LoginPage from "../modules/administrativo/pages/login-page"
import EventoDetalhePage from "../modules/administrativo/pages/eventoDetalhe-page"
import NovoEventoPage from "../modules/administrativo/pages/novoEvento-page"


export default function RotasADM(){
    return (
        <>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/eventoDetalhe" element={<EventoDetalhePage/>}/>
            <Route path="/novoEvento" element={<NovoEventoPage/>}/>
        </>
    )
}