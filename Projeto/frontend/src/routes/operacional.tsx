import { Route } from "react-router-dom"
import HomeOpAdminPage from "../modules/operacional/pages/home-op-admin"


export default function RotasOp(){
    return(
        <>
            <Route path="/home-op-admin" element={<HomeOpAdminPage/>}/>
        </>
    )
}