import { BrowserRouter, Routes } from "react-router-dom";
import RotasADM from "./administrativo";
import RotasOp from "./operacional";

export default function RotasGerais(){
    return(
        <BrowserRouter>
            <Routes>
                {RotasADM()}
                {RotasOp()}
            </Routes>
        </BrowserRouter>
    )
}