import { Route } from "react-router-dom"
import CheckVeiculosPage from "../modules/operacional/pages/check-veiculos-page"

export default function RotasOp(){
    return(
        <>
            <Route path="/check-veiculo" element={<CheckVeiculosPage/>}/>
        </>
    )
}