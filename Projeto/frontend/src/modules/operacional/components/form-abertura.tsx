import InputLine from "../../../shared/components/inputLine";
import BotaoSubmit from "../../../shared/components/botao-submit";
import { useState } from "react";

type FormAberturaProps = {
  form: string;
};

export default function FormAbertura({ form }: FormAberturaProps) {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [dataAbertura, setDataAbertura] = useState("");
  const [cadeadoFrenteEmp, setCadeadoFrenteEmp] = useState<string | null>(null);
  const [portaoSocial, setPortaoSocial] = useState<string | null>(null);
  const [portaRolanteArmazem, setPortaRolanteArmazem] = useState<string | null>(null);
  const [desblAlarme, setDesblAlarme] = useState<string | null>(null);
  const [apagoLuzArmazem, setApagoLuzArmazem] = useState<string | null>(null);
  const [acendeuLuzOp, setAcendeuLuzOp] = useState<string | null>(null);
  const [ligouAr, setLigouAr] = useState<string | null>(null);
  const [ligouTvCamera, setLigouTvCamera] = useState<string | null>(null);
  const [ligouTvDashboard, setLigouTvDashboard] = useState<string | null>(null);
  const [chaveInterna, setChaveInterna] = useState<string | null>(null);
  const [abriuPortaBanheiro, setAbriuPortaBanheiro] = useState<string | null>(null);
  const [removeCadeadoPortao1, setRemoveCadeadoPortao1] = useState<string | null>(null);
  const [removeCadeadoPortao2, setRemoveCadeadoPortao2] = useState<string | null>(null);
  const [coneEstacionamentoPcd, setConeEstacionamentoPcd] = useState<string | null>(null);
  const [bebedouroTomadaPlastico, setBebedouroTomadaPlastico] = useState<string | null>(null);
  const [tapeteLugar, setTapeteLugar] = useState<string | null>(null);
  const [cafeFeito, setCafeFeito] = useState<string | null>(null);
  const [sitAtipica, setSitAtipica] = useState("");

  const enviaForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div className="w-full flex justify-center mt-8 px-4">
      <div className="bg-white shadow-lg rounded-3xl w-full max-w-5xl h-[90vh] border border-gray-100 overflow-hidden">
        <div className="h-full overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-100 scrollbar-thumb-rounded-full">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4 text-center tracking-tight">
            Formulário de Abertura
          </h1>
          <p className="text-gray-800 mb-6">
            Esse CHECKLIST tem a finalidade de registrar os procedimentos de ABERTURA da empresa NEWE LOG para garantir a perfeita execução.
            Atenção: Este checklist contempla os pontos essenciais da operação. No entanto, situações excepcionais ou imprevistas devem ser conduzidas com base no bom senso,
            zelo pelo patrimônio da empresa e comunicação imediata com a liderança. O não cumprimento de ações que comprometam a segurança, o funcionamento de
            equipamentos ou a integridade da operação poderá ser passível de advertência, mesmo que não descritas previamente neste documento.
          </p>

          <form onSubmit={enviaForm} className="space-y-6">

            <InputLine
              type="date"
              id="data-abertura"
              htmlfor="data-abertura"
              required
              onChange={(e) => setDataAbertura(e.target.value)}
            >
              Data de abertura da empresa?
            </InputLine>

        <fieldset className="border border-gray-300 rounded-xl p-4 hover:border-gray-700 transition-colors duration-200">
        <legend className="text-gray-800">Abriu cadeado das correntes (FRENTE DA EMPRESA)?</legend>
        <InputLine type="radio" name="cadeadoFrenteEmp" value="cadeado-sim" id="cadeado-sim" htmlfor="cadeado-sim" checked={cadeadoFrenteEmp==='cadeado-sim'} onChange={(e) => setCadeadoFrenteEmp(e.target.value)}>Sim</InputLine>
        <InputLine type="radio" name="cadeadoFrenteEmp" value="cadeado-nao" id="cadeado-nao" htmlfor="cadeado-nao" checked={cadeadoFrenteEmp==='cadeado-nao'} onChange={(e) => setCadeadoFrenteEmp(e.target.value)}>Não</InputLine>
        </fieldset>

        <fieldset className="border border-gray-300 rounded-xl p-4 hover:border-gray-700 transition-colors duration-200">
        <legend className="text-gray-800">Abriu portão (SOCIAL)?</legend>
        <InputLine type="radio" name="portaoSocial" value="portao-social-sim" id="portao-social-sim" htmlfor="portao-social-sim" checked={portaoSocial==='portao-social-sim'} onChange={(e) => setPortaoSocial(e.target.value)}>Sim</InputLine>
        <InputLine type="radio" name="portaoSocial" value="portao-social-nao" id="portao-social-nao" htmlfor="portao-social-nao" checked={portaoSocial==='portao-social-nao'} onChange={(e) => setPortaoSocial(e.target.value)}>Não</InputLine>
        </fieldset>

        <fieldset className="border border-gray-300 rounded-xl p-4 hover:border-gray-700 transition-colors duration-200">
        <legend className="text-gray-800">Abriu porta rolante de ferro (ARMAZÉM)?</legend>
        <InputLine type="radio" name="portaRolanteArmazem" value="porta-rolante-armazem-sim" id="porta-rolante-armazem-sim" htmlfor="porta-rolante-armazem-sim" checked={portaRolanteArmazem==='porta-rolante-armazem-sim'} onChange={(e) => setPortaRolanteArmazem(e.target.value)}>Sim</InputLine>
        <InputLine type="radio" name="portaRolanteArmazem" value="porta-rolante-armazem-nao" id="porta-rolante-armazem-nao" htmlfor="porta-rolante-armazem-nao" checked={portaRolanteArmazem==='porta-rolante-armazem-nao'} onChange={(e) => setPortaRolanteArmazem(e.target.value)}>Não</InputLine>
        </fieldset>

        <fieldset className="border border-gray-300 rounded-xl p-4 hover:border-gray-700 transition-colors duration-200">
        <legend className="text-gray-800">Desbloqueou o alarme?</legend>
        <InputLine type="radio" name="desblAlarme" value="desbl-alarme-sim" id="desbl-alarme-sim" htmlfor="desbl-alarme-sim" checked={desblAlarme==='desbl-alarme-sim'} onChange={(e) => setDesblAlarme(e.target.value)}>Sim</InputLine>
        <InputLine type="radio" name="desblAlarme" value="desbl-alarme-nao" id="desbl-alarme-nao" htmlfor="desbl-alarme-nao" checked={desblAlarme==='desbl-alarme-nao'} onChange={(e) => setDesblAlarme(e.target.value)}>Não</InputLine>
        </fieldset>

        <fieldset className="border border-gray-300 rounded-xl p-4 hover:border-gray-700 transition-colors duration-200">
        <legend className="text-gray-800">Apagou luzes (ARMAZÉM)?</legend>
        <InputLine type="radio" name="apagoLuzArmazem" value="apago-luz-armazem-sim" id="apago-luz-armazem-sim" htmlfor="apago-luz-armazem-sim" checked={apagoLuzArmazem==='apago-luz-armazem-sim'} onChange={(e) => setApagoLuzArmazem(e.target.value)}>Sim</InputLine>
        <InputLine type="radio" name="apagoLuzArmazem" value="apago-luz-armazem-nao" id="apago-luz-armazem-nao" htmlfor="apago-luz-armazem-nao" checked={apagoLuzArmazem==='apago-luz-armazem-nao'} onChange={(e) => setApagoLuzArmazem(e.target.value)}>Não</InputLine>
        </fieldset>

        <fieldset className="border border-gray-300 rounded-xl p-4 hover:border-gray-700 transition-colors duration-200">
        <legend className="text-gray-800">Acendeu luzes (OPERACIONAL)?</legend>
        <InputLine type="radio" name="acendeuLuzOp" value="acendeu-luz-op-sim" id="acendeu-luz-op-sim" htmlfor="acendeu-luz-op-sim" checked={acendeuLuzOp==='acendeu-luz-op-sim'} onChange={(e) => setAcendeuLuzOp(e.target.value)}>Sim</InputLine>
        <InputLine type="radio" name="acendeuLuzOp" value="acendeu-luz-op-nao" id="acendeu-luz-op-nao" htmlfor="acendeu-luz-op-nao" checked={acendeuLuzOp==='acendeu-luz-op-nao'} onChange={(e) => setAcendeuLuzOp(e.target.value)}>Não</InputLine>
        </fieldset>

        <fieldset className="border border-gray-300 rounded-xl p-4 hover:border-gray-700 transition-colors duration-200">
        <legend className="text-gray-800">Ligou o Ar condicionado?</legend>
        <InputLine type="radio" name="ligouAr" value="ligou-ar-sim" id="ligou-ar-sim" htmlfor="ligou-ar-sim" checked={ligouAr==='ligou-ar-sim'} onChange={(e) => setLigouAr(e.target.value)}>Sim</InputLine>
        <InputLine type="radio" name="ligouAr" value="ligou-ar-nao" id="ligou-ar-nao" htmlfor="ligou-ar-nao" checked={ligouAr==='ligou-ar-nao'} onChange={(e) => setLigouAr(e.target.value)}>Não</InputLine>
        </fieldset>

        <fieldset className="border border-gray-300 rounded-xl p-4 hover:border-gray-700 transition-colors duration-200">
        <legend className="text-gray-800">Ligou TV (CAMERAS)?</legend>
        <InputLine type="radio" name="ligouTvCamera" value="ligou-tv-camera-sim" id="ligou-tv-camera-sim" htmlfor="ligou-tv-camera-sim" checked={ligouTvCamera==='ligou-tv-camera-sim'} onChange={(e) => setLigouTvCamera(e.target.value)}>Sim</InputLine>
        <InputLine type="radio" name="ligouTvCamera" value="ligou-tv-camera-nao" id="ligou-tv-camera-nao" htmlfor="ligou-tv-camera-nao" checked={ligouTvCamera==='ligou-tv-camera-nao'} onChange={(e) => setLigouTvCamera(e.target.value)}>Não</InputLine>
        </fieldset>

        <fieldset className="border border-gray-300 rounded-xl p-4 hover:border-gray-700 transition-colors duration-200">
        <legend className="text-gray-800">Ligou TV (DASHBOARD)?</legend>
        <InputLine type="radio" name="ligouTvDashboard" value="ligou-tv-dashboard-sim" id="ligou-tv-dashboard-sim" htmlfor="ligou-tv-dashboard-sim" checked={ligouTvDashboard==='ligou-tv-dashboard-sim'} onChange={(e) => setLigouTvDashboard(e.target.value)}>Sim</InputLine>
        <InputLine type="radio" name="ligouTvDashboard" value="ligou-tv-dashboard-nao" id="ligou-tv-dashboard-nao" htmlfor="ligou-tv-dashboard-nao" checked={ligouTvDashboard==='ligou-tv-dashboard-nao'} onChange={(e) => setLigouTvDashboard(e.target.value)}>Não</InputLine>
        </fieldset>

        <fieldset className="border border-gray-300 rounded-xl p-4 hover:border-gray-700 transition-colors duration-200">
        <legend className="text-gray-800">Coletou chaves internas no chaveiro?</legend>
        <InputLine type="radio" name="chaveInterna" value="chave-interna-sim" id="chave-interna-sim" htmlfor="chave-interna-sim" checked={chaveInterna==='chave-interna-sim'} onChange={(e) => setChaveInterna(e.target.value)}>Sim</InputLine>
        <InputLine type="radio" name="chaveInterna" value="chave-interna-nao" id="chave-interna-nao" htmlfor="chave-interna-nao" checked={chaveInterna==='chave-interna-nao'} onChange={(e) => setChaveInterna(e.target.value)}>Não</InputLine>
        </fieldset>

        <fieldset className="border border-gray-300 rounded-xl p-4 hover:border-gray-700 transition-colors duration-200">
        <legend className="text-gray-800">Abriu porta do banheiro?</legend>
        <InputLine type="radio" name="abriuPortaBanheiro" value="abriu-porta-banheiro-sim" id="abriu-porta-banheiro-sim" htmlfor="abriu-porta-banheiro-sim" checked={abriuPortaBanheiro==='abriu-porta-banheiro-sim'} onChange={(e) => setAbriuPortaBanheiro(e.target.value)}>Sim</InputLine>
        <InputLine type="radio" name="abriuPortaBanheiro" value="abriu-porta-banheiro-nao" id="abriu-porta-banheiro-nao" htmlfor="abriu-porta-banheiro-nao" checked={abriuPortaBanheiro==='abriu-porta-banheiro-nao'} onChange={(e) => setAbriuPortaBanheiro(e.target.value)}>Não</InputLine>
        </fieldset>

        <fieldset className="border border-gray-300 rounded-xl p-4 hover:border-gray-700 transition-colors duration-200">
        <legend className="text-gray-800">Removeu cadeado portão 1?</legend>
        <InputLine type="radio" name="removeCadeadoPortao1" value="remove-cadeado-portao1-sim" id="remove-cadeado-portao1-sim" htmlfor="remove-cadeado-portao1-sim" checked={removeCadeadoPortao1==='remove-cadeado-portao1-sim'} onChange={(e) => setRemoveCadeadoPortao1(e.target.value)}>Sim</InputLine>
        <InputLine type="radio" name="removeCadeadoPortao1" value="remove-cadeado-portao1-nao" id="remove-cadeado-portao1-nao" htmlfor="remove-cadeado-portao1-nao" checked={removeCadeadoPortao1==='remove-cadeado-portao1-nao'} onChange={(e) => setRemoveCadeadoPortao1(e.target.value)}>Não</InputLine>
        </fieldset>

        <fieldset className="border border-gray-300 rounded-xl p-4 hover:border-gray-700 transition-colors duration-200">
        <legend className="text-gray-800">Removeu cadeado portão 2?</legend>
        <InputLine type="radio" name="removeCadeadoPortao2" value="remove-cadeado-portao2-sim" id="remove-cadeado-portao2-sim" htmlfor="remove-cadeado-portao2-sim" checked={removeCadeadoPortao2==='remove-cadeado-portao2-sim'} onChange={(e) => setRemoveCadeadoPortao2(e.target.value)}>Sim</InputLine>
        <InputLine type="radio" name="removeCadeadoPortao2" value="remove-cadeado-portao2-nao" id="remove-cadeado-portao2-nao" htmlfor="remove-cadeado-portao2-nao" checked={removeCadeadoPortao2==='remove-cadeado-portao2-nao'} onChange={(e) => setRemoveCadeadoPortao2(e.target.value)}>Não</InputLine>
        </fieldset>

        <fieldset className="border border-gray-300 rounded-xl p-4 hover:border-gray-700 transition-colors duration-200">
        <legend className="text-gray-800">Posicionou cone no estacionamento PCD?</legend>
        <InputLine type="radio" name="coneEstacionamentoPcd" value="cone-estacionamento-pcd-sim" id="cone-estacionamento-pcd-sim" htmlfor="cone-estacionamento-pcd-sim" checked={coneEstacionamentoPcd==='cone-estacionamento-pcd-sim'} onChange={(e) => setConeEstacionamentoPcd(e.target.value)}>Sim</InputLine>
        <InputLine type="radio" name="coneEstacionamentoPcd" value="cone-estacionamento-pcd-nao" id="cone-estacionamento-pcd-nao" htmlfor="cone-estacionamento-pcd-nao" checked={coneEstacionamentoPcd==='cone-estacionamento-pcd-nao'} onChange={(e) => setConeEstacionamentoPcd(e.target.value)}>Não</InputLine>
        </fieldset>

        <fieldset className="border border-gray-300 rounded-xl p-4 hover:border-gray-700 transition-colors duration-200">
        <legend className="text-gray-800">Ligou tomada e retirou plástico do bebedouro?</legend>
        <InputLine type="radio" name="bebedouroTomadaPlastico" value="bebedouro-tomada-plastico-sim" id="bebedouro-tomada-plastico-sim" htmlfor="bebedouro-tomada-plastico-sim" checked={bebedouroTomadaPlastico==='bebedouro-tomada-plastico-sim'} onChange={(e) => setBebedouroTomadaPlastico(e.target.value)}>Sim</InputLine>
        <InputLine type="radio" name="bebedouroTomadaPlastico" value="bebedouro-tomada-plastico-nao" id="bebedouro-tomada-plastico-nao" htmlfor="bebedouro-tomada-plastico-nao" checked={bebedouroTomadaPlastico==='bebedouro-tomada-plastico-nao'} onChange={(e) => setBebedouroTomadaPlastico(e.target.value)}>Não</InputLine>
        </fieldset>

        <fieldset className="border border-gray-300 rounded-xl p-4 hover:border-gray-700 transition-colors duration-200">
        <legend className="text-gray-800">Colocou tapetes nos devidos lugares ? (Atividade às segundas-feiras)</legend>
        <InputLine type="radio" name="tapeteLugar" value="tapete-lugar-sim" id="tapete-lugar-sim" htmlfor="tapete-lugar-sim" checked={tapeteLugar==='tapete-lugar-sim'} onChange={(e) => setTapeteLugar(e.target.value)}>Sim</InputLine>
        <InputLine type="radio" name="tapeteLugar" value="tapete-lugar-nao" id="tapete-lugar-nao" htmlfor="tapete-lugar-nao" checked={tapeteLugar==='tapete-lugar-nao'} onChange={(e) => setTapeteLugar(e.target.value)}>Não</InputLine>
        </fieldset>

        <fieldset className="border border-gray-300 rounded-xl p-4 hover:border-gray-700 transition-colors duration-200">
        <legend className="text-gray-800">Fez café do dia?</legend>
        <InputLine type="radio" name="cafeFeito" value="cafe-feito-sim" id="cafe-feito-sim" htmlfor="cafe-feito-sim" checked={cafeFeito==='cafe-feito-sim'} onChange={(e) => setCafeFeito(e.target.value)}>Sim</InputLine>
        <InputLine type="radio" name="cafeFeito" value="cafe-feito-nao" id="cafe-feito-nao" htmlfor="cafe-feito-nao" checked={cafeFeito==='cafe-feito-nao'} onChange={(e) => setCafeFeito(e.target.value)}>Não</InputLine>
        </fieldset>

            <InputLine
              type="text"
              id="sit-atipica"
              htmlfor="sit-atipica"
              onChange={(e) => setSitAtipica(e.target.value)}
            >
              Houve alguma situação atípica que exigiu atenção ou ação fora do previsto no checklist?
            </InputLine>

            <div className="pt-6 flex justify-center">
              <BotaoSubmit
                loading={loading}
                label="Enviar"
                type="submit"
                className="bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-xl px-8 py-3 transition-all duration-300 shadow-md hover:shadow-lg"
              />
            </div>
          </form>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 animate-fade-in-out">
          Formulário enviado com sucesso!
        </div>
      )}
    </div>
  );
}