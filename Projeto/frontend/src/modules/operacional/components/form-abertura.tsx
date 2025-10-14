import InputLine from "../../../shared/components/inputLine"
import BotaoSubmit from "../../../shared/components/botao-submit"
import { useState } from "react";

export default function FormAbertura() {
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
                <form action="">
                    <InputLine type="text" placeholder="" id="nome" htmlfor="nome" required>Quem está preenchendo? </InputLine>
                    <InputLine type="date" placeholder="" id="data-abertura" htmlfor="data-abertura" required>Data de abertura da empresa? </InputLine>
                    <fieldset>
                        <legend className="text-black">Abriu cadeado das correntes (FRENTE DA EMPRESA)?</legend>
                        <InputLine type="radio" name="cadeado-frente-emp" value="cadeado-sim" id="cadeado-sim" htmlfor="cadeado-sim" required>Sim</InputLine>
                        <InputLine type="radio" name="cadeado-frente-emp" value="cadeado-nao" id="cadeado-nao" htmlfor="cadeado-nao" required>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Abriu portão (SOCIAL)? </legend>
                        <InputLine type="radio" name="portao-social" value="portao-social-sim" id="portao-social-sim" htmlfor="portao-social-sim" required>Sim</InputLine>
                        <InputLine type="radio" name="portao-social" value="portao-social-nao" id="portao-social-nao" htmlfor="portao-social-nao" required>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Abriu porta rolante de ferro (ARMAZÉM)? </legend>
                        <InputLine type="radio" name="porta-rolante-armazem" value="porta-rolante-armazem-sim" id="porta-rolante-armazem-sim" htmlfor="porta-rolante-armazem-sim" required>Sim</InputLine>
                        <InputLine type="radio" name="porta-rolante-armazem" value="porta-rolante-armazem-nao" id="porta-rolante-armazem-nao" htmlfor="porta-rolante-armazem-nao" required>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black"> Desbloqueou o alarme?</legend>
                        <InputLine type="radio" name="desbl-alarme" value="desbl-alarme-sim" id="desbl-alarme-sim" htmlfor="desbl-alarme-sim" required>Sim</InputLine>
                        <InputLine type="radio" name="desbl-alarme" value="desbl-alarme-nao" id="desbl-alarme-nao" htmlfor="desbl-alarme-nao" required>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Apagou luzes (ARMAZÉM)?</legend>
                        <InputLine type="radio" name="apago-luz-armazem" value="apago-luz-armazem-sim" id="apago-luz-armazem-sim" htmlfor="apago-luz-armazem-sim" required>Sim</InputLine>
                        <InputLine type="radio" name="apago-luz-armazem" value="apago-luz-armazem-nao" id="apago-luz-armazem-nao" htmlfor="apago-luz-armazem-nao" required>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Acendeu luzes (OPERACIONAL)?</legend>
                        <InputLine type="radio" name="acendeu-luz-op" value="acendeu-luz-op-sim" id="acendeu-luz-op-sim" htmlfor="acendeu-luz-op-sim">Sim</InputLine>
                        <InputLine type="radio" name="acendeu-luz-op" value="acendeu-luz-op-nao" id="acendeu-luz-op-nao" htmlfor="acendeu-luz-op-nao">Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Ligou o Ar condicionado?</legend>
                        <InputLine type="radio" name="ligou-ar" value="ligou-ar-sim" id="ligou-ar-sim" htmlfor="ligou-ar-sim">Sim</InputLine>
                        <InputLine type="radio" name="ligou-ar" value="ligou-ar-nao" id="ligou-ar-nao" htmlfor="ligou-ar-nao">Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Ligou TV (CAMERAS)?</legend>
                        <InputLine type="radio" name="ligou-tv-camera" value="ligou-tv-camera-sim" id="ligou-tv-camera-sim" htmlfor="ligou-tv-camera-sim" required>Sim</InputLine>
                        <InputLine type="radio" name="ligou-tv-camera" value="ligou-tv-camera-nao" id="ligou-tv-camera-nao" htmlfor="ligou-tv-camera-nao" required>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Ligou TV (DASHBORD)?</legend>
                        <InputLine type="radio" name="ligou-tv-dashboard" value="ligou-tv-dashboard-sim" id="ligou-tv-dashboard-sim" htmlfor="ligou-tv-dashboard-sim" required>Sim</InputLine>
                        <InputLine type="radio" name="ligou-tv-dashboard" value="ligou-tv-dashboard-nao" id="ligou-tv-dashboard-nao" htmlfor="ligou-tv-dashboard-nao" required>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Coletou chaves internas no chaveiro?</legend>
                        <InputLine type="radio" name="chave-interna" value="chave-interna-sim" id="chave-interna-sim" htmlfor="chave-interna-sim" required>Sim</InputLine>
                        <InputLine type="radio" name="chave-interna" value="chave-interna-nao" id="chave-interna-nao" htmlfor="chave-interna-nao" required>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Abriu porta do banheiro?</legend>
                        <InputLine type="radio" name="abriu-porta-banheiro" value="abriu-porta-banheiro-sim" id="abriu-porta-banheiro-sim" htmlfor="abriu-porta-banheiro-sim">Sim</InputLine>
                        <InputLine type="radio" name="abriu-porta-banheiro" value="abriu-porta-banheiro-nao" id="abriu-porta-banheiro-nao" htmlfor="abriu-porta-banheiro-nao">Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Removeu cadeado portão 1?</legend>
                        <InputLine type="radio" name="remove-cadeado-portao1" value="remove-cadeado-portao1-sim" id="remove-cadeado-portao1-sim" htmlfor="remove-cadeado-portao1-sim">Sim</InputLine>
                        <InputLine type="radio" name="remove-cadeado-portao1" value="remove-cadeado-portao1-nao" id="remove-cadeado-portao1-nao" htmlfor="remove-cadeado-portao1-nao">Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Removeu cadeado portão 2?</legend>
                        <InputLine type="radio" name="remove-cadeado-portao2" value="remove-cadeado-portao2-sim" id="remove-cadeado-portao2-sim" htmlfor="remove-cadeado-portao2-sim">Sim</InputLine>
                        <InputLine type="radio" name="remove-cadeado-portao2" value="remove-cadeado-portao2-nao" id="remove-cadeado-portao2-nao" htmlfor="remove-cadeado-portao2-nao">Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Posicionou cone no estacionamento PCD?</legend>
                        <InputLine type="radio" name="cone-estacionamento-pcd" value="cone-estacionamento-pcd-sim" id="cone-estacionamento-pcd-sim" htmlfor="cone-estacionamento-pcd-sim">Sim</InputLine>
                        <InputLine type="radio" name="cone-estacionamento-pcd" value="cone-estacionamento-pcd-nao" id="cone-estacionamento-pcd-nao" htmlfor="cone-estacionamento-pcd-nao">Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Ligou tomada e retirou plástico do bebedouro?</legend>
                        <InputLine type="radio" name="bebedouro-tomada-plastico" value="bebedouro-tomada-plastico-sim" id="bebedouro-tomada-plastico-sim" htmlfor="bebedouro-tomada-plastico-sim" required>Sim</InputLine>
                        <InputLine type="radio" name="bebedouro-tomada-plastico" value="bebedouro-tomada-plastico-nao" id="bebedouro-tomada-plastico-nao" htmlfor="bebedouro-tomada-plastico-nao" required>Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Colocou tapetes nos devidos lugares ? (Atividade às segundas-feiras)</legend>
                        <InputLine type="radio" name="tapete-lugar" value="tapete-lugar-sim" id="tapete-lugar-sim" htmlfor="tapete-lugar-sim">Sim</InputLine>
                        <InputLine type="radio" name="tapete-lugar" value="tapete-lugar-nao" id="tapete-lugar-nao" htmlfor="tapete-lugar-nao">Não</InputLine>
                    </fieldset>
                    <fieldset>
                        <legend className="text-black">Fez café do dia?</legend>
                        <InputLine type="radio" name="cafe-feito" value="cafe-feito-sim" id="cafe-feito-sim" htmlfor="cafe-feito-sim" required>Sim</InputLine>
                        <InputLine type="radio" name="cafe-feito" value="cafe-feito-nao" id="cafe-feito-nao" htmlfor="cafe-feito-nao" required>Não</InputLine>
                    </fieldset>
                    <InputLine type="text" placeholder="" id="sit-atipica" htmlfor="sit-atipica">Houve alguma situação atípica que exigiu atenção ou ação fora do previsto  no checklist?</InputLine>
                    <section>
                     <BotaoSubmit  loading={loading} label="Enviar" type="submit"/>
                </section>
                </form>
            </section>
        </section>
    )
}