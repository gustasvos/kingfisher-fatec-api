import { Route } from "react-router-dom"
import CheckVeiculosPage from "../modules/operacional/pages/check-veiculos-page"
import CheckDiarioPage from "../modules/operacional/pages/check-diario-page"
import CheckMotoPage from "../modules/operacional/pages/check-moto-page"
import FormAberturaPage from "../modules/operacional/pages/form-abertura-page"
import HomeOpColabPage from "../modules/operacional/pages/home-op-colab"
import FormFechamentoPage from "../modules/operacional/pages/form-fechamento-page"
import PrivateWrapper from "./../shared/components/PrivateWrapper";
import ListagemChecklist from "../modules/operacional/components/listagem-checklist";

export default function RotasOp(){
    return(
        <>
            <Route path="/check-veiculo" element={<CheckVeiculosPage/>}/>
            <Route path="/check-diario" element={<PrivateWrapper roles={['operacional']}><CheckDiarioPage/></PrivateWrapper>}/>
            <Route path="/check-moto" element={<CheckMotoPage/>}/>
            <Route path="/form-abertura" element={<PrivateWrapper roles={['operacional']}><FormAberturaPage/></PrivateWrapper>}/>
            <Route path="/home-colab" element={<PrivateWrapper roles={['operacional']}><HomeOpColabPage /></PrivateWrapper>}/>
            <Route path="/form-fechamento" element={<PrivateWrapper roles={['operacional']}><FormFechamentoPage /></PrivateWrapper>}/>
            <Route path="/check-veiculo" element={<PrivateWrapper roles={['operacional']}><CheckVeiculosPage/></PrivateWrapper>}/>
            <Route path="/lista-check-colaborador" element={<PrivateWrapper roles={['operacional']}><ListagemChecklist /></PrivateWrapper>} />
        </>
    )
}
