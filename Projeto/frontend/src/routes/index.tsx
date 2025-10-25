import { BrowserRouter, Routes } from "react-router-dom";
import RotasADM from "./administrativo";
import RotasComercial from "./comercial";
import { AuthProvider } from "../contexts/AuthContext"; 
import RotasOp from "./operacional";

export default function RotasGerais(){
    return(
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {RotasADM()}
                    {RotasComercial()}
                    {RotasOp()}
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}