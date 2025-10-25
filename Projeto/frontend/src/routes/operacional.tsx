import { Route } from "react-router-dom"
import CheckVeiculosPage from "../modules/operacional/pages/check-veiculos-page"
import CheckDiarioPage from "../modules/operacional/pages/check-diario-page"
import CheckMotoPage from "../modules/operacional/pages/check-moto-page"

export default function RotasOp(){
    return(
        <>
            <Route path="/check-veiculo" element={<CheckVeiculosPage/>}/>
            <Route path="/check-diario" element={<CheckDiarioPage/>}/>
            <Route path="/check-moto" element={<CheckMotoPage/>}/>
        </>
    )
}