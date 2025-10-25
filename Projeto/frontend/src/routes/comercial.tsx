import { Route } from "react-router-dom"
import ListaCliente from "../modules/operacional/pages/lista-cliente"


export default function RotasCom(){
    return (
        <>
            <Route path="/listaCliente" element={<ListaCliente />} />
        </>
    )
}
