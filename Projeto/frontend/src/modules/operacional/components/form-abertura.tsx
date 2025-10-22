import InputLine from "../../../shared/components/inputLine"
import BotaoSubmit from "../../../shared/components/botao-submit"
import { useState } from "react";

export default function FormAbertura() {
    const [loading, setLoading] = useState(false);

    const [formTitle, setFormTitle] = useState("Formulário de abertura")
    const [dataAbertura,setDataAbertura] = useState("")
    const [cadeadoFrenteEmp,setCadeadoFrenteEmp] = useState(null)
    const [portaoSocial,setPortaoSocial] = useState(null)
    const [portaRolanteArmazem,setPortaRolanteArmazem] = useState(null)
    const [desblAlarme,setDesblAlarme] = useState(null)
    const [apagoLuzArmazem,setApagoLuzArmazem] = useState(null)
    const [acendeuLuzOp,setAcendeuLuzOp] = useState(null)
    const [ligouAr,setLigouAr] = useState(null)
    const [ligouTvCamera,setLigouTvCamera] = useState(null)
    const [ligouTvDashboard,setLigouTvDashboard] = useState(null)
    const [chaveInterna,setChaveInterna] = useState(null)
    const [abriuPortaBanheiro,setAbriuPortaBanheiro] = useState(null)
    const [removeCadeadoPortao1,setRemoveCadeadoPortao1] = useState(null)
    const [removeCadeadoPortao2,setRemoveCadeadoPortao2] = useState(null)
    const [coneEstacionamentoPcd,setConeEstacionamentoPcd] = useState(null)
    const [bebedouroTomadaPlastico,setBebedouroTomadaPlastico] = useState(null)
    const [tapeteLugar,setTapeteLugar] = useState(null)
    const [cafeFeito,setCafeFeito] = useState(null)
    const [sitAtipica,setSitAtipica] = useState("")

    const handleCadeadoFrenteChange = (event) => {
        setCadeadoFrenteEmp(event.target.value)
    }

    const handlePortaoSocialChange = (event) => {
        setPortaoSocial(event.target.value)
    }

    const handlePortaoRolanteArmazemChange = (event) => {
        setPortaRolanteArmazem(event.target.value)
    }

    const handleDesbAlarmeChange = (event) => {
        setDesblAlarme(event.target.value)
    }

    const handleAcendeuLuzOpChange = (event) => {
        setAcendeuLuzOp(event.target.value)
    }

    const handleApagoLuzArmazemChange = (event) => {
        setApagoLuzArmazem(event.target.value)
    }

    const handleLigouArChange = (event) => {
        setLigouAr(event.target.value)
    }

    const handleLigouTvCameraChange = (event) => {
        setLigouTvCamera(event.target.value)
    }

    const handleLigouTvDashboardChange = (event) => {
        setLigouTvDashboard(event.target.value)
    }

    const handleChaveInternaChange = (event) => {
        setChaveInterna(event.target.value)
    }

    const handleAbriuPortaBanheiroChange = (event) => {
        setAbriuPortaBanheiro(event.target.value)
    }

    const handleRemoveCadeadoPortao1Change = (event) => {
        setRemoveCadeadoPortao1(event.target.value)
    }

    const handleRemoveCadeadoPortao2Change = (event) => {
        setRemoveCadeadoPortao2(event.target.value)
    }

    const handleConeEstacionamentoPcdChange = (event) => {
        setConeEstacionamentoPcd(event.target.value)
    }

    const handleBebedouroTomadaPlasticoChange = (event) => {
        setBebedouroTomadaPlastico(event.target.value)
    }

    const handleTapeteLugarChange = (event) => {
        setTapeteLugar(event.target.value)
    }
 
    const handleCafeFeitoChange = (event) => {
        setCafeFeito(event.target.value)
    }

    
    const enviaForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            alert("Formulário enviado!");
            setLoading(false);
        }, 2000);
    };
    return (
        <section>
            <h1 className="text-black text-[30px] font-bold">Formulário de abertura</h1>
            <p className="text-black">Esse CHECK LIST tem a finalidade de registrar os procedimentos de ABERTURA da
                empresa NEWE LOG para garantir a perfeita execução.
                Atenção: Este checklist contempla os pontos essenciais da operação. No entanto,
                situações excepcionais ou imprevistas devem ser conduzidas com base no bom senso,
                zelo pelo patrimônio da empresa e comunicação imediata com a liderança. O não
                cumprimento de ações que comprometam a segurança, o funcionamento de
                equipamentos ou a integridade da operação poderá ser passível de advertência,
                mesmo que não descritas previamente neste documento.  </p>
            <section>
                <form action="" onSubmit={enviaForm}>
                    <InputLine type="date" placeholder="" id="data-abertura" htmlfor="data-abertura" required onChange={(e) => setDataAbertura(e.target.value)}>Data de abertura da empresa? </InputLine>
                    <fieldset>
                        <legend className="text-black">Abriu cadeado das correntes (FRENTE DA EMPRESA)?</legend>
                        <InputLine type="radio" name="cadeadoFrenteEmp" value="cadeado-sim" id="cadeado-sim" htmlfor="cadeado-sim" required checked={cadeadoFrenteEmp==='cadeado-sim'} onChange={handleCadeadoFrenteChange}>Sim</InputLine>
                        <InputLine type="radio" name="cadeadoFrenteEmp" value="cadeado-nao" id="cadeado-nao" htmlfor="cadeado-nao" required checked={cadeadoFrenteEmp==='cadeado-nao'} onChange={handleCadeadoFrenteChange}>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Abriu portão (SOCIAL)? </legend>
                        <InputLine type="radio" name="portaoSocial" value="portao-social-sim" id="portao-social-sim" htmlfor="portao-social-sim" required checked={portaoSocial==='portao-social-sim'} onChange={handlePortaoSocialChange}>Sim</InputLine>
                        <InputLine type="radio" name="portaoSocial" value="portao-social-nao" id="portao-social-nao" htmlfor="portao-social-nao" required checked={portaoSocial==='portao-social-nao'} onChange={handlePortaoSocialChange}>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Abriu porta rolante de ferro (ARMAZÉM)? </legend>
                        <InputLine type="radio" name="portaRolanteArmazem" value="porta-rolante-armazem-sim" id="porta-rolante-armazem-sim" htmlfor="porta-rolante-armazem-sim" required checked={portaRolanteArmazem==='porta-rolante-armazem-sim'} onChange={handlePortaoRolanteArmazemChange}>Sim</InputLine>
                        <InputLine type="radio" name="portaRolanteArmazem" value="porta-rolante-armazem-nao" id="porta-rolante-armazem-nao" htmlfor="porta-rolante-armazem-nao" required checked={portaRolanteArmazem==='porta-rolante-armazem-nao'} onChange={handlePortaoRolanteArmazemChange}>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black"> Desbloqueou o alarme?</legend>
                        <InputLine type="radio" name="desblAlarme" value="desbl-alarme-sim" id="desbl-alarme-sim" htmlfor="desbl-alarme-sim" required checked={desblAlarme==='desbl-alarme-sim'} onChange={handleDesbAlarmeChange}>Sim</InputLine>
                        <InputLine type="radio" name="desblAlarme" value="desbl-alarme-nao" id="desbl-alarme-nao" htmlfor="desbl-alarme-nao" required checked={desblAlarme==='desbl-alarme-nao'} onChange={handleDesbAlarmeChange}>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Apagou luzes (ARMAZÉM)?</legend>
                        <InputLine type="radio" name="apagoLuzArmazem" value="apago-luz-armazem-sim" id="apago-luz-armazem-sim" htmlfor="apago-luz-armazem-sim" required checked={apagoLuzArmazem==='apago-luz-armazem-sim'} onChange={handleApagoLuzArmazemChange}>Sim</InputLine>
                        <InputLine type="radio" name="apagoLuzArmazem" value="apago-luz-armazem-nao" id="apago-luz-armazem-nao" htmlfor="apago-luz-armazem-nao" required checked={apagoLuzArmazem==='apago-luz-armazem-nao'} onChange={handleApagoLuzArmazemChange}>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Acendeu luzes (OPERACIONAL)?</legend>
                        <InputLine type="radio" name="acendeuLuzOp" value="acendeu-luz-op-sim" id="acendeu-luz-op-sim" htmlfor="acendeu-luz-op-sim" checked={acendeuLuzOp==='acendeu-luz-op-sim'} onChange={handleAcendeuLuzOpChange}>Sim</InputLine>
                        <InputLine type="radio" name="acendeuLuzOp" value="acendeu-luz-op-nao" id="acendeu-luz-op-nao" htmlfor="acendeu-luz-op-nao" checked={acendeuLuzOp==='acendeu-luz-op-nao'} onChange={handleAcendeuLuzOpChange}>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Ligou o Ar condicionado?</legend>
                        <InputLine type="radio" name="ligouAr" value="ligou-ar-sim" id="ligou-ar-sim" htmlfor="ligou-ar-sim" checked={ligouAr==='ligou-ar-sim'} onChange={handleLigouArChange}>Sim</InputLine>
                        <InputLine type="radio" name="ligouAr" value="ligou-ar-nao" id="ligou-ar-nao" htmlfor="ligou-ar-nao" checked={ligouAr==='ligou-ar-nao'} onChange={handleLigouArChange}>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Ligou TV (CAMERAS)?</legend>
                        <InputLine type="radio" name="ligouTvCamera" value="ligou-tv-camera-sim" id="ligou-tv-camera-sim" htmlfor="ligou-tv-camera-sim" required checked={ligouTvCamera==='ligou-tv-camera-sim'} onChange={handleLigouTvCameraChange}>Sim</InputLine>
                        <InputLine type="radio" name="ligouTvCamera" value="ligou-tv-camera-nao" id="ligou-tv-camera-nao" htmlfor="ligou-tv-camera-nao" required checked={ligouTvCamera==='ligou-tv-camera-nao'} onChange={handleLigouTvCameraChange}>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Ligou TV (DASHBORD)?</legend>
                        <InputLine type="radio" name="ligouTvDashboard" value="ligou-tv-dashboard-sim" id="ligou-tv-dashboard-sim" htmlfor="ligou-tv-dashboard-sim" required checked={ligouTvDashboard==='ligou-tv-dashboard-sim'} onChange={handleLigouTvDashboardChange}>Sim</InputLine>
                        <InputLine type="radio" name="ligouTvDashboard" value="ligou-tv-dashboard-nao" id="ligou-tv-dashboard-nao" htmlfor="ligou-tv-dashboard-nao" required checked={ligouTvDashboard==='ligou-tv-dashboard-nao'} onChange={handleLigouTvDashboardChange}>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Coletou chaves internas no chaveiro?</legend>
                        <InputLine type="radio" name="chaveInterna" value="chave-interna-sim" id="chave-interna-sim" htmlfor="chave-interna-sim" required checked={chaveInterna==='chave-interna-sim'} onChange={handleChaveInternaChange}>Sim</InputLine>
                        <InputLine type="radio" name="chaveInterna" value="chave-interna-nao" id="chave-interna-nao" htmlfor="chave-interna-nao" required checked={chaveInterna==='chave-interna-nao'} onChange={handleChaveInternaChange}>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Abriu porta do banheiro?</legend>
                        <InputLine type="radio" name="abriuPortaBanheiro" value="abriu-porta-banheiro-sim" id="abriu-porta-banheiro-sim" htmlfor="abriu-porta-banheiro-sim" checked={abriuPortaBanheiro==='abriu-porta-banheiro-sim'} onChange={handleAbriuPortaBanheiroChange}>Sim</InputLine>
                        <InputLine type="radio" name="abriuPortaBanheiro" value="abriu-porta-banheiro-nao" id="abriu-porta-banheiro-nao" htmlfor="abriu-porta-banheiro-nao" checked={abriuPortaBanheiro==='abriu-porta-banheiro-nao'} onChange={handleAbriuPortaBanheiroChange}>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Removeu cadeado portão 1?</legend>
                        <InputLine type="radio" name="removeCadeadoPortao1" value="remove-cadeado-portao1-sim" id="remove-cadeado-portao1-sim" htmlfor="remove-cadeado-portao1-sim" checked={removeCadeadoPortao1==='remove-cadeado-portao1-sim'} onChange={handleRemoveCadeadoPortao1Change}>Sim</InputLine>
                        <InputLine type="radio" name="removeCadeadoPortao1" value="remove-cadeado-portao1-nao" id="remove-cadeado-portao1-nao" htmlfor="remove-cadeado-portao1-nao" checked={removeCadeadoPortao1==='remove-cadeado-portao1-nao'} onChange={handleRemoveCadeadoPortao1Change}>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Removeu cadeado portão 2?</legend>
                        <InputLine type="radio" name="removeCadeadoPortao2" value="remove-cadeado-portao2-sim" id="remove-cadeado-portao2-sim" htmlfor="remove-cadeado-portao2-sim" checked={removeCadeadoPortao2==='remove-cadeado-portao2-nao'} onChange={handleRemoveCadeadoPortao2Change}>Sim</InputLine>
                        <InputLine type="radio" name="removeCadeadoPortao2" value="remove-cadeado-portao2-nao" id="remove-cadeado-portao2-nao" htmlfor="remove-cadeado-portao2-nao" checked={removeCadeadoPortao2==='remove-cadeado-portao2-nao'} onChange={handleRemoveCadeadoPortao2Change}>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Posicionou cone no estacionamento PCD?</legend>
                        <InputLine type="radio" name="coneEstacionamentoPcd" value="cone-estacionamento-pcd-sim" id="cone-estacionamento-pcd-sim" htmlfor="cone-estacionamento-pcd-sim" checked={coneEstacionamentoPcd==='cone-estacionamento-pcd-sim'} onChange={handleConeEstacionamentoPcdChange}>Sim</InputLine>
                        <InputLine type="radio" name="coneEstacionamentoPcd" value="cone-estacionamento-pcd-nao" id="cone-estacionamento-pcd-nao" htmlfor="cone-estacionamento-pcd-nao" checked={coneEstacionamentoPcd==='cone-estacionamento-pcd-nao'} onChange={handleConeEstacionamentoPcdChange}>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Ligou tomada e retirou plástico do bebedouro?</legend>
                        <InputLine type="radio" name="bebedouroTomadaPlastico" value="bebedouro-tomada-plastico-sim" id="bebedouro-tomada-plastico-sim" htmlfor="bebedouro-tomada-plastico-sim" required checked={bebedouroTomadaPlastico==='bebedouro-tomada-plastico-sim'} onChange={handleBebedouroTomadaPlasticoChange}>Sim</InputLine>
                        <InputLine type="radio" name="bebedouroTomadaPlastico" value="bebedouro-tomada-plastico-nao" id="bebedouro-tomada-plastico-nao" htmlfor="bebedouro-tomada-plastico-nao" required checked={bebedouroTomadaPlastico==='bebedouro-tomada-plastico-nao'} onChange={handleBebedouroTomadaPlasticoChange}>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Colocou tapetes nos devidos lugares ? (Atividade às segundas-feiras)</legend>
                        <InputLine type="radio" name="tapeteLugar" value="tapete-lugar-sim" id="tapete-lugar-sim" htmlfor="tapete-lugar-sim" checked={tapeteLugar==='tapete-lugar-sim'} onChange={handleTapeteLugarChange}>Sim</InputLine>
                        <InputLine type="radio" name="tapeteLugar" value="tapete-lugar-nao" id="tapete-lugar-nao" htmlfor="tapete-lugar-nao" checked={tapeteLugar==='tapete-lugar-nao'} onChange={handleTapeteLugarChange}>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Fez café do dia?</legend>
                        <InputLine type="radio" name="cafeFeito" value="cafe-feito-sim" id="cafe-feito-sim" htmlfor="cafe-feito-sim" required checked={cafeFeito==='cafe-feito-sim'} onChange={handleCafeFeitoChange}>Sim</InputLine>
                        <InputLine type="radio" name="cafeFeito" value="cafe-feito-nao" id="cafe-feito-nao" htmlfor="cafe-feito-nao" required checked={cafeFeito==='cafe-feito-nao'} onChange={handleCafeFeitoChange}>Não</InputLine>
                    </fieldset>
                    <InputLine type="text" placeholder="" id="sit-atipica" htmlfor="sit-atipica" onChange={(e) => setSitAtipica(e.target.value)}>Houve alguma situação atípica que exigiu atenção ou ação fora do previsto  no checklist?</InputLine>
                    <section>
                        <BotaoSubmit loading={loading} label="Enviar" type="submit" />
                    </section>
                </form>
            </section>
        </section>
    )
}