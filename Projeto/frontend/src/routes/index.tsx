import { BrowserRouter, Routes } from "react-router-dom";
import RotasADM from "./administrativo";
import RotasCom from "./comercial";

export default function RotasGerais(){
    return(
        <BrowserRouter>
            <Routes>
                {RotasADM()}
                {RotasCom()}
            </Routes>
        </BrowserRouter>
    )
}