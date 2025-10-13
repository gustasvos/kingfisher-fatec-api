import { Route } from "react-router-dom"
import CheckMotoPage from "../modules/operacional/pages/check-moto-page"

export default function RotasOp(){
    return(
        <>
            <Route path="/check-moto" element={<CheckMotoPage/>}/>
        </>
    )
}