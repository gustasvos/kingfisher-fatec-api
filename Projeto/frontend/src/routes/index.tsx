import { BrowserRouter, Routes } from "react-router-dom";
import RotasADM from "./administrativo";

export default function RotasGerais(){
    return(
        <BrowserRouter>
            <Routes>
                {RotasADM()}
            </Routes>
        </BrowserRouter>
    )
}