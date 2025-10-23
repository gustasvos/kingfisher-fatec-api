import { BrowserRouter, Routes } from "react-router-dom";
import RotasADM from "./administrativo";
import RotasComercial from "./comercial";

export default function RotasGerais(){
    return(
        <BrowserRouter>
            <Routes>
                {RotasADM()}
                {RotasComercial()}

            </Routes>
        </BrowserRouter>
    )
}