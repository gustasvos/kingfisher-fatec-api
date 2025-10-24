import { Route } from "react-router-dom";
import CadastroCliente from "../modules/comercial/pages/cadastrocliente";

export default function RotasComercial(){
    return (
        <>
        <Route path='/CadastroCliente' element={<CadastroCliente/>}/>
        </>
    )
}