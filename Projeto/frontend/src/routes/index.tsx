import { BrowserRouter, Routes } from "react-router-dom";
import RotasADM from "./administrativo";
import { AuthProvider } from "../contexts/AuthContext"; 

export default function RotasGerais(){
    return(
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {RotasADM()}
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}