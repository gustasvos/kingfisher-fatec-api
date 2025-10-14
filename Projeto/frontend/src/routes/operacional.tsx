import { Route } from "react-router-dom"
import CheckVeiculosPage from "../modules/operacional/pages/check-veiculos-page"
import CheckDiarioPage from "../modules/operacional/pages/check-diario-page"
import FormAberturaPage from "../modules/operacional/pages/form-abertura-page"
import FormFechamentoPage from "../modules/operacional/pages/form-fechamento-page"

export default function RotasOp(){
    return(
        <>
            <Route path="/check-veiculo" element={<CheckVeiculosPage/>}/>
            <Route path="/check-diario" element={<CheckDiarioPage/>}/>
            <Route path="/form-abertura" element={<FormAberturaPage/>}/>
            <Route path="/form-fechamento" element={<FormFechamentoPage/>}/>
        </>
    )
}