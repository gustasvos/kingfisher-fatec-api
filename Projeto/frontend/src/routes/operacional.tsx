import { Route } from "react-router-dom"
import HomeOpAdminPage from "../modules/operacional/pages/home-op-colab";

export default function RotasOp(){
    return (
        <>
            <Route path="/home-colab" element={<HomeOpAdminPage />} />
        </>
    )
}
