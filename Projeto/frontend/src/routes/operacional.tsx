import { Route } from "react-router-dom"
import CheckGestaoPage from "../modules/operacional/pages/check-gestao-page"


export default function RotasOp(){
    return(
        <>
            <Route path="/check-gestao" element={<CheckGestaoPage/>}/>
        </>
    )
}