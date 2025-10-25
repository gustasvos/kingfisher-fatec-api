import { Route } from "react-router-dom"
import CheckVeiculosPage from "../modules/operacional/pages/check-veiculos-page"
import CheckDiarioPage from "../modules/operacional/pages/check-diario-page"
import CheckMotoPage from "../modules/operacional/pages/check-moto-page"
import FormAberturaPage from "../modules/operacional/pages/form-abertura-page"
import HomeOpAdminPage from "../modules/operacional/pages/home-op-admin"


export default function RotasOp(){
    return(
        <>
            <Route path="/check-veiculo" element={<CheckVeiculosPage/>}/>
            <Route path="/check-diario" element={<CheckDiarioPage/>}/>
            <Route path="/check-moto" element={<CheckMotoPage/>}/>
            <Route path="/form-abertura" element={<FormAberturaPage/>}/>
            <Route path="/home-op-admin" element={<HomeOpAdminPage/>}/>
        </>
    )
}