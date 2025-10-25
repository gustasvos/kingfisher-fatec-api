import { Route } from "react-router-dom";
import CadastroCliente from "../modules/comercial/pages/cadastrocliente";
import ListaCliente from "../modules/operacional/pages/lista-cliente"

export default function RotasComercial(){
    return (
        <>
        <Route path='/CadastroCliente' element={<CadastroCliente/>}/>
        <Route path="/listaCliente" element={<ListaCliente />} />
        </>
    )
}