import { Route } from "react-router-dom"
import LoginPage from "../modules/administrativo/pages/login-page"
import EventoDetalhePage from "../modules/administrativo/pages/eventoDetalhe-page"


export default function RotasADM(){
    return (
        <>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/eventoDetalhe" element={<EventoDetalhePage/>}/>
        </>
    )
}