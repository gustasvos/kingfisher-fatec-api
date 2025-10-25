import { BrowserRouter, Routes } from "react-router-dom";
import RotasADM from "./administrativo";
import RotasComercial from "./comercial";
import RotasOp from "./operacional";

export default function RotasGerais(){
    return(
        <BrowserRouter>
            <Routes>
                {RotasADM()}
                {RotasComercial()}
                 
                {RotasOp()} 
            </Routes>
        </BrowserRouter>
    )
}