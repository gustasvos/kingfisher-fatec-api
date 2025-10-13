import InputLine from "../../../shared/components/inputLine"
import BotaoSubmit from "../../../shared/components/botao-submit"
import { useState } from "react";

export default function FormFechamento() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
                <form action="">
                    <InputLine type="text" placeholder="" id="nome" htmlfor="nome" required>Quem está preenchendo?</InputLine>
                    <InputLine type="date" placeholder="" id="nome" htmlfor="nome" required>Data da FECHAMENTO da empresa?</InputLine>
                    <fieldset>
                        <legend className="text-black">Tirou o lixo orgânico da cozinha e trocou o cestinho lixo com saco limpo para orgânico?</legend>
                        <InputLine type="radio" name="lixo-organico" value="lixo-organico-sim" id="lixo-organico-sim" htmlfor="lixo-organico-sim" required>Sim</InputLine>
                        <InputLine type="radio" name="lixo-organico" value="lixo-organico-nao" id="lixo-organico-nao" htmlfor="lixo-organico-nao" required>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Se for SEXTA FEIRA Colocou o lixo reciclável no cesto de lixo fora da empresa? (Atividade para sextas-feiras)</legend>
                        <InputLine type="radio" name="lixo-reciclavel" value="lixo-reciclavel-sim" id="lixo-reciclavel-sim" htmlfor="lixo-reciclavel-sim">Sim</InputLine>
                        <InputLine type="radio" name="lixo-reciclavel" value="lixo-reciclavel-nao" id="lixo-reciclavel-nao" htmlfor="lixo-reciclavel-nao">Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Deixou a cozinha organizada?</legend>
                        <InputLine type="radio" name="cozinha-organizada" value="cozinha-organizada-sim" id="cozinha-organizada-sim" htmlfor="cozinha-organizada-sim">Sim</InputLine>
                        <InputLine type="radio" name="cozinha-organizada" value="cozinha-organizada-nao" id="cozinha-organizada-nao" htmlfor="cozinha-organizada-nao">Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Apagou as luzes e fechou a porta da cozinha?</legend>
                        <InputLine type="radio" name="luz-porta" value="luz-porta-sim" id="luz-porta-sim" htmlfor="luz-porta-sim" required>Sim</InputLine>
                        <InputLine type="radio" name="luz-porta" value="luz-porta-nao" id="luz-porta-nao" htmlfor="luz-porta-nao" required>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Trancou cadeado do portão 2?</legend>
                        <InputLine type="radio" name="trancou-portao2" value="trancou-portao2-sim" id="trancou-portao2-sim" htmlfor="trancou-portao2-sim" required>Sim</InputLine>
                        <InputLine type="radio" name="trancou-portao2" value="trancou-portao2-nao" id="trancou-portao2-nao" htmlfor="trancou-portao2-nao" required>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Trancou cadeado do portão 1?</legend>
                        <InputLine type="radio" name="trancou-portao1" value="trancou-portao1-sim" id="trancou-portao1-sim" htmlfor="trancou-portao1-sim" required>Sim</InputLine>
                        <InputLine type="radio" name="trancou-portao1" value="trancou-portao1-nao" id="trancou-portao1-nao" htmlfor="trancou-portao1-nao" required>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Verificou se torneiras estão fechadas e se válvula do mictório não está pressionada?</legend>
                        <InputLine type="radio" name="torneira-fechada" value="torneira-fechada-sim" id="torneira-fechada-sim" htmlfor="torneira-fechada-sim" required>Sim</InputLine>
                        <InputLine type="radio" name="torneira-fechada" value="torneira-fechada-nao" id="torneira-fechada-nao" htmlfor="torneira-fechada-nao" required>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Tirou o lixo do Banheiro e colocou no cesto fora da empresa?</legend>
                        <InputLine type="radio" name="banheiro" value="banheiro-sim" id="banheiro-sim" htmlfor="banheiro-sim" required>Sim</InputLine>
                        <InputLine type="radio" name="banheiro" value="banheiro-nao" id="banheiro-nao" htmlfor="banheiro-nao" required>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Trancou a porta do banheiro?</legend>
                        <InputLine type="radio" name="trancou-banheiro" value="trancou-banheiro-sim" id="trancou-banheiro-sim" htmlfor="trancou-banheiro-sim" required>Sim</InputLine>
                        <InputLine type="radio" name="trancou-banheiro" value="trancou-banheiro-nao" id="trancou-banheiro-nao" htmlfor="trancou-banheiro-nao" required>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Desligou da tomada e colocou o plástico do bebedouro?</legend>
                        <InputLine type="radio" name="bebedouro" value="bebedouro-sim" id="bebedouro-sim" htmlfor="bebedouro-sim" required>Sim</InputLine>
                        <InputLine type="radio" name="bebedouro" value="bebedouro-nao" id="bebedouro-nao" htmlfor="bebedouro-nao" required>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Deixou as chaves internas no chaveiro do operacional?</legend>
                        <InputLine type="radio" name="chave-chaveiro" value="chave-chaveiro-sim" id="chave-chaveiro-sim" htmlfor="chave-chaveiro-sim" required>Sim</InputLine>
                        <InputLine type="radio" name="chave-chaveiro" value="chave-chaveiro-nao" id="chave-chaveiro-nao" htmlfor="chave-chaveiro-nao" required>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Desligou a TV das CAMERAS?</legend>
                        <InputLine type="radio" name="desligou-tv-camera" value="desligou-tv-camera-sim" id="desligou-tv-camera-sim" htmlfor="desligou-tv-camera-sim" required>Sim</InputLine>
                        <InputLine type="radio" name="desligou-tv-camera" value="desligou-tv-camera-nao" id="desligou-tv-camera-nao" htmlfor="desligou-tv-camera-nao" required>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Desligou a TV do DASHBOARD?</legend>
                        <InputLine type="radio" name="desligou-tv-dashboard" value="desligou-tv-dashboard-sim" id="desligou-tv-dashboard-sim" htmlfor="desligou-tv-dashboard-sim" required>Sim</InputLine>
                        <InputLine type="radio" name="desligou-tv-dashboard" value="desligou-tv-dashboard-nao" id="desligou-tv-dashboard-nao" htmlfor="desligou-tv-dashboard-nao" required>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Desligou o Ar condicionado?</legend>
                        <InputLine type="radio" name="desligou-ar" value="desligou-ar-sim" id="desligou-ar-sim" htmlfor="desligou-ar-sim" required>Sim</InputLine>
                        <InputLine type="radio" name="desligou-ar" value="desligou-ar-nao" id="desligou-ar-nao" htmlfor="desligou-ar-nao" required>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Desligou as luzes do escritório OPERACIONAL?</legend>
                        <InputLine type="radio" name="desligou-luz-op" value="desligou-luz-op-sim" id="desligou-luz-op-sim" htmlfor="desligou-luz-op-sim" required>Sim</InputLine>
                        <InputLine type="radio" name="desligou-luz-op" value="desligou-luz-op-nao" id="desligou-luz-op-nao" htmlfor="desligou-luz-op-nao" required>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Acendeu as luzes do ARMAZÉM?</legend>
                        <InputLine type="radio" name="acendeu-luz-armazem" value="acendeu-luz-armazem-sim" id="acendeu-luz-armazem-sim" htmlfor="acendeu-luz-armazem-sim" required>Sim</InputLine>
                        <InputLine type="radio" name="acendeu-luz-armazem" value="acendeu-luz-armazem-nao" id="acendeu-luz-armazem-nao" htmlfor="acendeu-luz-armazem-nao" required>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Retirou o cone do estacionamento PCD?</legend>
                        <InputLine type="radio" name="cone-estaciona-pcd" value="cone-estaciona-pcd-sim" id="cone-estaciona-pcd-sim" htmlfor="cone-estaciona-pcd-sim" required>Sim</InputLine>
                        <InputLine type="radio" name="cone-estaciona-pcd" value="cone-estaciona-pcd-nao" id="cone-estaciona-pcd-nao" htmlfor="cone-estaciona-pcd-nao" required>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Acionou o ALARME?</legend>
                        <InputLine type="radio" name="alarma" value="alarma-sim" id="alarma-sim" htmlfor="alarma-sim" required>Sim</InputLine>
                        <InputLine type="radio" name="alarma" value="alarma-nao" id="alarma-nao" htmlfor="alarma-nao" required>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Fechou a porta de entrada do ARMAZÉM?</legend>
                        <InputLine type="radio" name="fechou-porta-armazem" value="fechou-porta-armazem-sim" id="fechou-porta-armazem-sim" htmlfor="fechou-porta-armazem-sim" required>Sim</InputLine>
                        <InputLine type="radio" name="fechou-porta-armazem" value="fechou-porta-armazem-nao" id="fechou-porta-armazem-nao" htmlfor="fechou-porta-armazem-nao" required>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Trancou o cadeado das correntes?</legend>
                        <InputLine type="radio" name="trancou-correntes" value="trancou-correntes-sim" id="trancou-correntes-sim" htmlfor="trancou-correntes-sim" required>Sim</InputLine>
                        <InputLine type="radio" name="trancou-correntes" value="trancou-correntes-nao" id="trancou-correntes-nao" htmlfor="trancou-correntes-nao" required>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Algum dos motores dos portões apresenta ruídos ou travamentos ? Verifique ao menos uma vez no dia, e se caso algum dos portões for selecionado reporte imediatamente a gestão.</legend>
                        <InputLine type="radio" name="ruido-portao" value="ruido-portao-sim" id="ruido-portao-sim" htmlfor="ruido-portao-sim" required>Sim</InputLine>
                        <InputLine type="radio" name="ruido-portao" value="ruido-portao-nao" id="ruido-portao-nao" htmlfor="ruido-portao-nao" required>Não</InputLine>
                    </fieldset>
                    <InputLine type="text" placeholder="" id="sit-atipico" htmlfor="sit-atipico">Houve alguma situação atípica que exigiu atenção ou ação fora do previsto no checklist?</InputLine>
                    <BotaoSubmit loading={loading} label="Enviar" type="submit"/>
                </form>
            </section>
        </section>
    )
}