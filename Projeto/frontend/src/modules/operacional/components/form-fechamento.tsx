import InputLine from "../../../shared/components/inputLine"
import BotaoSubmit from "../../../shared/components/botao-submit"
import { useState } from "react";

export default function FormFechamento() {
    const [loading, setLoading] = useState(false);

    const [formTitle, setFormTitle] = useState("Formulário de fechamento")
    const [dataFechamento, setDataFechamento] = useState("")
    const [lixoOrganico,setLixoOrganico] = useState(null)
    const [lixoReciclavel,setLixoReciclavel] = useState(null)
    const [cozinhaOrganizada,setCozinhaOrganizada] = useState(null)
    const [luzPorta,setLuzPorta] = useState(null)
    const [trancouPortao2,setTrancouPortao2] = useState(null)
    const [trancouPortao1,setTrancouPortao1] = useState(null)
    const [torneiraFechada,setTorneiraFechada] = useState(null)
    const [banheiro,setBanheiro] = useState(null)
    const [trancouBanheiro,setTrancouBanheiro] = useState(null)
    const [bebedouro,setBebedouro] = useState(null)
    const [chaveChaveiro,setChaveChaveiro] = useState(null)
    const [desligouTvCamera,setDesligouTvCamera] = useState(null)
    const [desligouTvDashboard,setDesligouTvDashboard] = useState(null)
    const [desligouAr,setDesligouAr] = useState(null)
    const [desligouLuzOp,setDesligouLuzOp] = useState(null)
    const [acendeuLuzArmazem,setAcendeuLuzArmazem] = useState(null)
    const [coneEstacionaPcd,setConeEstacionaPcd] = useState(null)
    const [alarme,setAlarme] = useState(null)
    const [fechouPortaArmazem,setFechouPortaArmazem] = useState(null)
    const [trancouCorrentes,setTrancouCorrentes] = useState(null)
    const [ruidoPortao,setRuidoPortao] = useState(null)
    const [sitAtipico, setSitAtipico] = useState("")

    const handleLixoOrganicoChange = (event) => {
        setLixoOrganico(event.target.value)
    }

    const handleLixoReciclavelChange = (event) => {
        setLixoReciclavel(event.target.value)
    }

    const handleCozinhaOrganizadaChange = (event) => {
        setCozinhaOrganizada(event.target.value)
    }
    
    const handleLuzPortaChange = (event) => {
        setLuzPorta(event.target.value)
    }

    const handleTrancouPortao2Change = (event) => {
        setTrancouPortao2(event.target.value)
    }
    
    const handleTrancouPortao1Change = (event) => {
        setTrancouPortao1(event.target.value)
    }
    
    const handleTorneiraFechadaChange = (event) => {
        setTorneiraFechada(event.target.value)
    }
    const handleBanheiroChange = (event) => {
        setBanheiro(event.target.value)
    }

    const handleTrancouBanheiroChange = (event) => {
        setTrancouBanheiro(event.target.value)
    }

    const handleBebedouroChange = (event) => {
        setBebedouro(event.target.value)
    }

    const handleChaveChaveiroChange = (event) => {
        setChaveChaveiro(event.target.value)
    }

    const handleDesligouTvCameraChange = (event) => {
        setDesligouTvCamera(event.target.value)
    }

    const handleDesligouTvDashboardChange = (event) => {
        setDesligouTvDashboard(event.target.value)
    }

    const handleDesligouArChange = (event) => {
        setDesligouAr(event.target.value)
    }

    const handleDesligouLuzOpChange = (event) => {
        setDesligouLuzOp(event.target.value)
    }

    const handleAcendeuLuzArmazemChange = (event) => {
        setAcendeuLuzArmazem(event.target.value)
    }

    const handleConeEstacionaPcdChange = (event) => {
        setConeEstacionaPcd(event.target.value)
    }

    const handleAlarmeChange = (event) => {
        setAlarme(event.target.value)
    }

    const handleFechouPortaArmazemChange = (event) => {
        setFechouPortaArmazem(event.target.value)
    }

    const handleTrancouCorrentesChange = (event) => {
        setTrancouCorrentes(event.target.value)
    }    

    const handleRuidoPortaoChange = (event) => {
        setRuidoPortao(event.target.value)
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
            <h1 className="text-black text-[30px] font-bold">Formulário de fechamento</h1>
            <p className="text-black">Esse CHECK LIST tem a finalidade de registrar os procedimentos de FECHAMENTO da
                empresa NEWE para garantir a perfeita execução e evitar custos desnecessários com
                água e energia elétrica.
                Atenção: Este checklist contempla os pontos essenciais da operação. No entanto,
                situações excepcionais ou imprevistas devem ser conduzidas com base no bom senso,
                zelo pelo patrimônio da empresa e comunicação imediata com a liderança.
                O não cumprimento de ações que comprometam a segurança, o funcionamento de
                equipamentos ou a integridade da operação poderá ser passível de advertência,
                mesmo que não descritas previamente neste documento.</p>
            <section>
                <form action="" onSubmit={enviaForm}>
                    <InputLine type="date" placeholder="" id="dataFechamento" htmlfor="dataFechamento" required onChange={(e) => setDataFechamento(e.target.value)}>Data da FECHAMENTO da empresa?</InputLine>
                    <fieldset>
                        <legend className="text-black">Tirou o lixo orgânico da cozinha e trocou o cestinho lixo com saco limpo para orgânico?</legend>
                        <InputLine type="radio" name="lixoOrganico" value="lixo-organico-sim" id="lixo-organico-sim" htmlfor="lixo-organico-sim" required checked={lixoOrganico==='lixo-organico-sim'} onChange={handleLixoOrganicoChange}>Sim</InputLine>
                        <InputLine type="radio" name="lixoOrganico" value="lixo-organico-nao" id="lixo-organico-nao" htmlfor="lixo-organico-nao" required checked={lixoOrganico==='lixo-organico-nao'} onChange={handleLixoOrganicoChange}>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Se for SEXTA FEIRA Colocou o lixo reciclável no cesto de lixo fora da empresa? (Atividade para sextas-feiras)</legend>
                        <InputLine type="radio" name="lixoReciclavel" value="lixo-reciclavel-sim" id="lixo-reciclavel-sim" htmlfor="lixo-reciclavel-sim" checked={lixoReciclavel==='lixo-reciclavel-sim'} onChange={handleLixoReciclavelChange}>Sim</InputLine>
                        <InputLine type="radio" name="lixoReciclavel" value="lixo-reciclavel-nao" id="lixo-reciclavel-nao" htmlfor="lixo-reciclavel-nao" checked={lixoReciclavel==='lixo-reciclavel-nao'} onChange={handleLixoReciclavelChange}>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Deixou a cozinha organizada?</legend>
                        <InputLine type="radio" name="cozinhaOrganizada" value="cozinha-organizada-sim" id="cozinha-organizada-sim" htmlfor="cozinha-organizada-sim" checked={cozinhaOrganizada==='cozinha-organizada-sim'} onChange={handleCozinhaOrganizadaChange}>Sim</InputLine>
                        <InputLine type="radio" name="cozinhaOrganizada" value="cozinha-organizada-nao" id="cozinha-organizada-nao" htmlfor="cozinha-organizada-nao" checked={cozinhaOrganizada==='cozinha-organizada-nao'} onChange={handleCozinhaOrganizadaChange}>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Apagou as luzes e fechou a porta da cozinha?</legend>
                        <InputLine type="radio" name="luzPorta" value="luz-porta-sim" id="luz-porta-sim" htmlfor="luz-porta-sim" required checked={luzPorta==='luz-porta-sim'} onChange={handleLuzPortaChange}>Sim</InputLine>
                        <InputLine type="radio" name="luzPorta" value="luz-porta-nao" id="luz-porta-nao" htmlfor="luz-porta-nao" required checked={luzPorta==='luz-porta-nao'} onChange={handleLuzPortaChange}>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Trancou cadeado do portão 2?</legend>
                        <InputLine type="radio" name="trancouPortao2" value="trancou-portao2-sim" id="trancou-portao2-sim" htmlfor="trancou-portao2-sim" required checked={trancouPortao2==='trancou-portao2-sim'} onChange={handleTrancouPortao2Change}>Sim</InputLine>
                        <InputLine type="radio" name="trancouPortao2" value="trancou-portao2-nao" id="trancou-portao2-nao" htmlfor="trancou-portao2-nao" required checked={trancouPortao2==='trancou-portao2-nao'} onChange={handleTrancouPortao2Change}>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Trancou cadeado do portão 1?</legend>
                        <InputLine type="radio" name="trancouPortao1" value="trancou-portao1-sim" id="trancou-portao1-sim" htmlfor="trancou-portao1-sim" required checked={trancouPortao1==='trancou-portao1-sim'} onChange={handleTrancouPortao1Change}>Sim</InputLine>
                        <InputLine type="radio" name="trancouPortao1" value="trancou-portao1-nao" id="trancou-portao1-nao" htmlfor="trancou-portao1-nao" required checked={trancouPortao1==='trancou-portao1-nao'} onChange={handleTrancouPortao1Change}>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Verificou se torneiras estão fechadas e se válvula do mictório não está pressionada?</legend>
                        <InputLine type="radio" name="torneiraFechada" value="torneira-fechada-sim" id="torneira-fechada-sim" htmlfor="torneira-fechada-sim" required checked={torneiraFechada==='torneira-fechada-sim'} onChange={handleTorneiraFechadaChange}>Sim</InputLine>
                        <InputLine type="radio" name="torneiraFechada" value="torneira-fechada-nao" id="torneira-fechada-nao" htmlfor="torneira-fechada-nao" required checked={torneiraFechada==='torneira-fechada-nao'} onChange={handleTorneiraFechadaChange}>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Tirou o lixo do Banheiro e colocou no cesto fora da empresa?</legend>
                        <InputLine type="radio" name="banheiro" value="banheiro-sim" id="banheiro-sim" htmlfor="banheiro-sim" required checked={banheiro==='banheiro-sim'} onChange={handleBanheiroChange}>Sim</InputLine>
                        <InputLine type="radio" name="banheiro" value="banheiro-nao" id="banheiro-nao" htmlfor="banheiro-nao" required checked={banheiro==='banheiro-nao'} onChange={handleBanheiroChange}>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Trancou a porta do banheiro?</legend>
                        <InputLine type="radio" name="trancouBanheiro" value="trancou-banheiro-sim" id="trancou-banheiro-sim" htmlfor="trancou-banheiro-sim" required checked={trancouBanheiro==='trancou-banheiro-sim'} onChange={handleTrancouBanheiroChange}>Sim</InputLine>
                        <InputLine type="radio" name="trancouBanheiro" value="trancou-banheiro-nao" id="trancou-banheiro-nao" htmlfor="trancou-banheiro-nao" required checked={trancouBanheiro==='trancou-banheiro-nao'} onChange={handleTrancouBanheiroChange}>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Desligou da tomada e colocou o plástico do bebedouro?</legend>
                        <InputLine type="radio" name="bebedouro" value="bebedouro-sim" id="bebedouro-sim" htmlfor="bebedouro-sim" required checked={bebedouro==='bebedouro-sim'} onChange={handleBebedouroChange}>Sim</InputLine>
                        <InputLine type="radio" name="bebedouro" value="bebedouro-nao" id="bebedouro-nao" htmlfor="bebedouro-nao" required checked={bebedouro==='bebedouro-nao'} onChange={handleBebedouroChange}>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Deixou as chaves internas no chaveiro do operacional?</legend>
                        <InputLine type="radio" name="chaveChaveiro" value="chave-chaveiro-sim" id="chave-chaveiro-sim" htmlfor="chave-chaveiro-sim" required checked={chaveChaveiro==='chave-chaveiro-sim'} onChange={handleChaveChaveiroChange}>Sim</InputLine>
                        <InputLine type="radio" name="chaveChaveiro" value="chave-chaveiro-nao" id="chave-chaveiro-nao" htmlfor="chave-chaveiro-nao" required checked={chaveChaveiro==='chave-chaveiro-nao'} onChange={handleChaveChaveiroChange}>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Desligou a TV das CAMERAS?</legend>
                        <InputLine type="radio" name="desligouTvCamera" value="desligou-tv-camera-sim" id="desligou-tv-camera-sim" htmlfor="desligou-tv-camera-sim" required checked={desligouTvCamera==='desligou-tv-camera-sim'} onChange={handleDesligouTvCameraChange}>Sim</InputLine>
                        <InputLine type="radio" name="desligouTvCamera" value="desligou-tv-camera-nao" id="desligou-tv-camera-nao" htmlfor="desligou-tv-camera-nao" required checked={desligouTvCamera==='desligou-tv-camera-nao'} onChange={handleDesligouTvCameraChange}>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Desligou a TV do DASHBOARD?</legend>
                        <InputLine type="radio" name="desligouTvDashboard" value="desligou-tv-dashboard-sim" id="desligou-tv-dashboard-sim" htmlfor="desligou-tv-dashboard-sim" required checked={desligouTvDashboard==='desligou-tv-dashboard-sim'} onChange={handleDesligouTvDashboardChange}>Sim</InputLine>
                        <InputLine type="radio" name="desligouTvDashboard" value="desligou-tv-dashboard-nao" id="desligou-tv-dashboard-nao" htmlfor="desligou-tv-dashboard-nao" required checked={desligouTvDashboard==='desligou-tv-dashboard-nao'} onChange={handleDesligouTvDashboardChange}>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Desligou o Ar condicionado?</legend>
                        <InputLine type="radio" name="desligouAr" value="desligou-ar-sim" id="desligou-ar-sim" htmlfor="desligou-ar-sim" required checked={desligouAr==='desligou-ar-sim'} onChange={handleDesligouArChange}>Sim</InputLine>
                        <InputLine type="radio" name="desligouAr" value="desligou-ar-nao" id="desligou-ar-nao" htmlfor="desligou-ar-nao" required checked={desligouAr==='desligou-ar-nao'} onChange={handleDesligouArChange}>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Desligou as luzes do escritório OPERACIONAL?</legend>
                        <InputLine type="radio" name="desligouLuzOp" value="desligou-luz-op-sim" id="desligou-luz-op-sim" htmlfor="desligou-luz-op-sim" required checked={desligouLuzOp==='desligou-luz-op-sim'} onChange={handleDesligouLuzOpChange}>Sim</InputLine>
                        <InputLine type="radio" name="desligouLuzOp" value="desligou-luz-op-nao" id="desligou-luz-op-nao" htmlfor="desligou-luz-op-nao" required checked={desligouLuzOp==='desligou-luz-op-nao'} onChange={handleDesligouLuzOpChange}>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Acendeu as luzes do ARMAZÉM?</legend>
                        <InputLine type="radio" name="acendeuLuzArmazem" value="acendeu-luz-armazem-sim" id="acendeu-luz-armazem-sim" htmlfor="acendeu-luz-armazem-sim" required checked={acendeuLuzArmazem==='acendeu-luz-armazem-sim'} onChange={handleAcendeuLuzArmazemChange}>Sim</InputLine>
                        <InputLine type="radio" name="acendeuLuzArmazem" value="acendeu-luz-armazem-nao" id="acendeu-luz-armazem-nao" htmlfor="acendeu-luz-armazem-nao" required checked={acendeuLuzArmazem==='acendeu-luz-armazem-nao'} onChange={handleAcendeuLuzArmazemChange}>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Retirou o cone do estacionamento PCD?</legend>
                        <InputLine type="radio" name="coneEstacionaPcd" value="cone-estaciona-pcd-sim" id="cone-estaciona-pcd-sim" htmlfor="cone-estaciona-pcd-sim" required checked={coneEstacionaPcd==='cone-estaciona-pcd-sim'} onChange={handleConeEstacionaPcdChange}>Sim</InputLine>
                        <InputLine type="radio" name="coneEstacionaPcd" value="cone-estaciona-pcd-nao" id="cone-estaciona-pcd-nao" htmlfor="cone-estaciona-pcd-nao" required checked={coneEstacionaPcd==='cone-estaciona-pcd-nao'} onChange={handleConeEstacionaPcdChange}>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Acionou o ALARME?</legend>
                        <InputLine type="radio" name="alarme" value="alarme-sim" id="alarme-sim" htmlfor="alarme-sim" required checked={alarme==='alarme-sim'} onChange={handleAlarmeChange}>Sim</InputLine>
                        <InputLine type="radio" name="alarme" value="alarme-nao" id="alarme-nao" htmlfor="alarme-nao" required checked={alarme==='alarme-nao'} onChange={handleAlarmeChange}>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Fechou a porta de entrada do ARMAZÉM?</legend>
                        <InputLine type="radio" name="fechouPortaArmazem" value="fechou-porta-armazem-sim" id="fechou-porta-armazem-sim" htmlfor="fechou-porta-armazem-sim" required checked={fechouPortaArmazem==='fechou-porta-armazem-sim'} onChange={handleFechouPortaArmazemChange}>Sim</InputLine>
                        <InputLine type="radio" name="fechouPortaArmazem" value="fechou-porta-armazem-nao" id="fechou-porta-armazem-nao" htmlfor="fechou-porta-armazem-nao" required checked={fechouPortaArmazem==='fechou-porta-armazem-nao'} onChange={handleFechouPortaArmazemChange}>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Trancou o cadeado das correntes?</legend>
                        <InputLine type="radio" name="trancouCorrentes" value="trancou-correntes-sim" id="trancou-correntes-sim" htmlfor="trancou-correntes-sim" required checked={trancouCorrentes==='trancou-correntes-sim'} onChange={handleTrancouCorrentesChange}>Sim</InputLine>
                        <InputLine type="radio" name="trancouCorrentes" value="trancou-correntes-nao" id="trancou-correntes-nao" htmlfor="trancou-correntes-nao" required checked={trancouCorrentes==='trancou-correntes-nao'} onChange={handleTrancouCorrentesChange}>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Algum dos motores dos portões apresenta ruídos ou travamentos ? Verifique ao menos uma vez no dia, e se caso algum dos portões for selecionado reporte imediatamente a gestão.</legend>
                        <InputLine type="radio" name="ruidoPortao" value="ruido-portao-sim" id="ruido-portao-sim" htmlfor="ruido-portao-sim" required checked={ruidoPortao==='ruido-portao-sim'} onChange={handleRuidoPortaoChange}>Sim</InputLine>
                        <InputLine type="radio" name="ruidoPortao" value="ruido-portao-nao" id="ruido-portao-nao" htmlfor="ruido-portao-nao" required checked={ruidoPortao==='ruido-portao-nao'} onChange={handleRuidoPortaoChange}>Não</InputLine>
                    </fieldset>
                    <InputLine type="text" placeholder="" id="sitAtipico" htmlfor="sit-atipico" onChange={(e) => setSitAtipico(e.target.value)}>Houve alguma situação atípica que exigiu atenção ou ação fora do previsto no checklist?</InputLine>
                    <BotaoSubmit loading={loading} label="Enviar" type="submit"/>
                </form>
            </section>
        </section>
    )
}