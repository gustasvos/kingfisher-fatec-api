import { useState } from "react";
import InputLine from "../../../shared/components/inputLine";
import BotaoSubmit from "../../../shared/components/botao-submit";
import { BASE_URL } from "./../../../services/api";

type FormAberturaProps = {
  form: string;
  onAcaoConcluida?: () => void
};

export default function FormManutencao({ form, onAcaoConcluida }: FormAberturaProps) {
  const [mostraCadeira, setMostraCadeira] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formTitle] = useState(form);

  const [dataVerificacao, setDataVerificacao] = useState("");
  const [condicaoPisoEscritorio, setCondicaoPisoEscritorio] = useState("");
  const [condicaoPisoOperacional, setCondicaoPisoOperacional] = useState("");
  const [condicaoPisoGalpao, setCondicaoPisoGalpao] = useState("");
  const [condicaoPisoRefeitorio, setCondicaoPisoRefeitorio] = useState("");

  const [condicaoForroEscritorio, setCondicaoForroEscritorio] = useState("");
  const [condicaoForroOperacional, setCondicaoForroOperacional] = useState("");
  const [condicaoForroGalpao, setCondicaoForroGalpao] = useState("");
  const [condicaoForroRefeitorio, setCondicaoForroRefeitorio] = useState("");

  const [estadoGeralEletrica, setEstadoGeralEletrica] = useState("");
  const [protecaoRaio, setProtecaoRaio] = useState("");

  const [arAdm, setArAdm] = useState<string | null>(null);
  const [arDiretoria, setArDiretoria] = useState<string | null>(null);
  const [arReuniao, setArReuniao] = useState<string | null>(null);
  const [arOperacional, setArOperacional] = useState<string | null>(null);

  const [lampadaAdm, setLampadaAdm] = useState<string | null>(null);
  const [lampadaDiretoria, setLampadaDiretoria] = useState<string | null>(null);
  const [lampadaReuniao, setLampadaReuniao] = useState<string | null>(null);
  const [lampadaOperacional, setLampadaOperacional] = useState<string | null>(null);
  const [lampadaGalpao, setLampadaGalpao] = useState<string | null>(null);
  const [lampadaRefeitorio, setLampadaRefeitorio] = useState<string | null>(null);
  const [lampadaBanheiroFem, setLampadaBanheiroFem] = useState<string | null>(null);
  const [lampadaBanheiroMasc, setLampadaBanheiroMasc] = useState<string | null>(null);

  const [macanetaBoa, setMacanetaBoa] = useState<string | null>(null);
  const [mesaOpProtegida, setMesaOpProtegida] = useState<string | null>(null);
  const [condicaoPratileira, setCondicaoPratileira] = useState("");
  const [organizacaoSegura, setOrganizacaoSegura] = useState("");
  const [cameraFunciona, setCameraFunciona] = useState<string | null>(null);

  const [balancaPiso, setBalancaPiso] = useState("");
  const [dataBalanca, setDataBalanca] = useState("");
  const [condicaoMicLav, setCondicaoMicLav] = useState("");
  const [dataBebedouro, setDataBebedouro] = useState("");
  const [dataProximaDetetizacao, setDataProximaDetetizacao] = useState("");
  const [dataUltimoExtintor, setDataUltimoExtintor] = useState("");
  const [dataProximoExtintor, setDataProximoExtintor] = useState("");
  const [dataUltimaCaixaAgua, setDataUltimaCaixaAgua] = useState("");
  const [dataProximaCaixaAgua, setDataProximaCaixaAgua] = useState("");

  const [cadeiraRuim, setCadeiraRuim] = useState<string | null>(null);
  const [setorCadeiraRuim, setSetorCadeiraRuim] = useState("");
  const [detalheAdd, setDetalheAdd] = useState("");

  const handleCadeiraChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCadeiraRuim(e.target.value);
    setMostraCadeira(e.target.value === "sim");
  };

  const enviaForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 🔹 Dados do usuário logado
      const storedUser = localStorage.getItem("user");
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      const userId = parsedUser?.id || "";
      const userCpf = parsedUser?.cpf || "";

      // Montagem do payload
      const payload = {
        "formTitle": "Formulário de manutenção predial",
        "data_verificacao": dataVerificacao,

        "condicoes_piso_escritorio": condicaoPisoEscritorio,
        "condicoes_piso_operacional": condicaoPisoOperacional,
        "condicoes_piso_galpao": condicaoPisoGalpao,
        "condicoes_piso_refeitorio": condicaoPisoRefeitorio,

        "condicoes_forro_escritorio": condicaoForroEscritorio,
        "condicoes_forro_operacional": condicaoForroOperacional,
        "condicoes_forro_galpao": condicaoForroGalpao,
        "condicoes_forro_refeitorio": condicaoForroRefeitorio,

        "estado_geral_instalacoes_eletricas": estadoGeralEletrica,
        "estado_geral_protecao_raios": protecaoRaio,

        "carga_ar_condicionado_sala_adm": arAdm,
        "carga_ar_condicionado_sala_diretoria": arDiretoria,
        "carga_ar_condicionado_sala_reuniao": arReuniao,
        "carga_ar_condicionado_sala_operacional": arOperacional,

        "lampadas_sala_adm": lampadaAdm,
        "lampadas_sala_diretoria": lampadaDiretoria,
        "lampadas_sala_reuniao": lampadaReuniao,
        "lampadas_sala_operacional": lampadaOperacional,
        "lampadas_galpao": lampadaGalpao,
        "lampadas_refeitorio": lampadaRefeitorio,
        "lampadas_banheiro_feminino": lampadaBanheiroFem,
        "lampadas_banheiro_masculino": lampadaBanheiroMasc,

        "macanetas_portas": macanetaBoa,
        "mesas_operacional": mesaOpProtegida,
        "condicoes_paleteiras_carrinho": condicaoPratileira,
        "organizacao_locais_trabalho": organizacaoSegura,
        "cameras_seguranca": cameraFunciona,
        "condicoes_balanca_piso": balancaPiso,
        "data_ultima_afericao_balanca": dataBalanca,
        "condicoes_mictorios_lavatorios": condicaoMicLav,
        "data_ultima_limpeza_bebedouro": dataBebedouro,
        "data_proxima_dedetizacao": dataProximaDetetizacao,
        "data_ultima_recarga_extintores": dataUltimoExtintor,
        "data_proxima_recarga_extintores": dataProximoExtintor,
        "data_ultima_limpeza_caixa_dagua": dataUltimaCaixaAgua,
        "data_proxima_limpeza_caixa_dagua": dataProximaCaixaAgua,
        "cadeira_ma_condicao": cadeiraRuim,
        "descricao_cadeira_ma_condicao": setorCadeiraRuim,
        "detalhe_adicional": detalheAdd,

        "id-usuario": userId,
        "cpf-usuario": userCpf
      };

      const response = await fetch(`${BASE_URL}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Erro ao enviar: ${response.status}`);
      }

      if (response.status === 201 || response.status === 200) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false)
          onAcaoConcluida && onAcaoConcluida()
        }, 1000)
      } else {
        alert(`Erro ${response.status}: ${response.statusText}`);
      }

    } catch (error) {
      console.error("Erro no envio:", error);
      alert("Falha ao enviar o formulário.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center p-6 bg-gray-100">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-6 overflow-y-auto h-[90vh] 
        scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">

        <h1 className="text-blue-600 text-3xl font-bold mb-4 text-center">
          Formulário de manutenção predial
        </h1>

        <p className="text-black mb-6 text-center">
          Esse formulário tem o objetivo de verificar as condições do local afim de manter segurança, funcionalidade e conservação do ambiente de trabalho
        </p>

        <form onSubmit={enviaForm} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputLine type="date" placeholder="" id="dataVerificacao" htmlfor="data-verificacao" onChange={e => setDataVerificacao(e.target.value)}>
            Data da verificação
          </InputLine>

          <InputLine type="string" placeholder="" id="condicaoPisoEscritorio" htmlfor="condicao-piso-escritorio" onChange={e => setCondicaoPisoEscritorio(e.target.value)}>
            Condição do piso do escritório (ADM/Sala reunião)
          </InputLine>
          <InputLine type="string" placeholder="" id="condicaoPisoOperacional" htmlfor="condicao-piso-operacional" onChange={e => setCondicaoPisoOperacional(e.target.value)}>
            Condição do piso da sala operacional
          </InputLine>
          <InputLine type="string" placeholder="" id="condicaoPisoGalpao" htmlfor="condicao-piso-galpao" onChange={e => setCondicaoPisoGalpao(e.target.value)}>
            Condição do piso do galpão
          </InputLine>
          <InputLine type="string" placeholder="" id="condicaoPisoRefeitorio" htmlfor="condicao-piso-refeitorio" onChange={e => setCondicaoPisoRefeitorio(e.target.value)}>
            Condição do piso do refeitório
          </InputLine>

          <InputLine type="string" placeholder="" id="condicaoForroEscritorio" htmlfor="condicao-forro-escritorio" onChange={e => setCondicaoForroEscritorio(e.target.value)}>
            Condição do forro do escritório
          </InputLine>
          <InputLine type="string" placeholder="" id="condicaoForroOperacional" htmlfor="condicao-forro-operacional" onChange={e => setCondicaoForroOperacional(e.target.value)}>
            Condição do forro operacional
          </InputLine>
          <InputLine type="string" placeholder="" id="condicaoForroGalpao" htmlfor="condicao-forro-galpao" onChange={e => setCondicaoForroGalpao(e.target.value)}>
            Condição do forro do galpão
          </InputLine>
          <InputLine type="string" placeholder="" id="condicaoForroRefeitorio" htmlfor="condicao-forro-refeitorio" onChange={e => setCondicaoForroRefeitorio(e.target.value)}>
            Condição do forro do refeitório
          </InputLine>

          <InputLine type="string" placeholder="" id="estadoGeralEletrica" htmlfor="estado-geral-eletrica" onChange={e => setEstadoGeralEletrica(e.target.value)}>
            Estado geral das instalações elétricas
          </InputLine>
          <InputLine type="string" placeholder="" id="protecaoRaio" htmlfor="protecao-raio" onChange={e => setProtecaoRaio(e.target.value)}>
            Proteção contra raios
          </InputLine>

          {[{ nome: "Administrativo", valor: arAdm, setValor: setArAdm },
          { nome: "Diretoria", valor: arDiretoria, setValor: setArDiretoria },
          { nome: "Reunião", valor: arReuniao, setValor: setArReuniao },
          { nome: "Operacional", valor: arOperacional, setValor: setArOperacional }
          ].map(({ nome, valor, setValor }) => (
            <fieldset key={nome}>
              <legend className="text-black">Ar-condicionado - Sala {nome}</legend>
              <InputLine type="radio" name={`ar-${nome}`} value="sim" checked={valor === "sim"} onChange={e => setValor(e.target.value)}>Sim</InputLine>
              <InputLine type="radio" name={`ar-${nome}`} value="não" checked={valor === "não"} onChange={e => setValor(e.target.value)}>Não</InputLine>
            </fieldset>
          ))}

          {[{ nome: "ADM", valor: lampadaAdm, setValor: setLampadaAdm },
          { nome: "Diretoria", valor: lampadaDiretoria, setValor: setLampadaDiretoria },
          { nome: "Reunião", valor: lampadaReuniao, setValor: setLampadaReuniao },
          { nome: "Operacional", valor: lampadaOperacional, setValor: setLampadaOperacional },
          { nome: "Galpão", valor: lampadaGalpao, setValor: setLampadaGalpao },
          { nome: "Refeitório", valor: lampadaRefeitorio, setValor: setLampadaRefeitorio },
          { nome: "Banheiro Fem.", valor: lampadaBanheiroFem, setValor: setLampadaBanheiroFem },
          { nome: "Banheiro Masc.", valor: lampadaBanheiroMasc, setValor: setLampadaBanheiroMasc }
          ].map(({ nome, valor, setValor }) => (
            <fieldset key={nome}>
              <legend className="text-black">Lâmpadas - {nome}</legend>
              <InputLine type="radio" name={`lampada-${nome}`} value="sim" checked={valor === "sim"} onChange={e => setValor(e.target.value)}>Sim</InputLine>
              <InputLine type="radio" name={`lampada-${nome}`} value="não" checked={valor === "não"} onChange={e => setValor(e.target.value)}>Não</InputLine>
            </fieldset>
          ))}

          <fieldset>
            <legend className="text-black">Macanetas em bom estado?</legend>
            <InputLine type="radio" name="macaneta" value="sim" checked={macanetaBoa === "sim"} onChange={e => setMacanetaBoa(e.target.value)}>Sim</InputLine>
            <InputLine type="radio" name="macaneta" value="não" checked={macanetaBoa === "não"} onChange={e => setMacanetaBoa(e.target.value)}>Não</InputLine>
          </fieldset>

          <fieldset>
            <legend className="text-black">Mesas do operacional protegidas?</legend>
            <InputLine type="radio" name="mesa" value="sim" checked={mesaOpProtegida === "sim"} onChange={e => setMesaOpProtegida(e.target.value)}>Sim</InputLine>
            <InputLine type="radio" name="mesa" value="não" checked={mesaOpProtegida === "não"} onChange={e => setMesaOpProtegida(e.target.value)}>Não</InputLine>
          </fieldset>

          <InputLine type="string" placeholder="" id="condicaoPratileira" htmlfor="condicao-pratileira" onChange={e => setCondicaoPratileira(e.target.value)}>
            Condição das prateleiras
          </InputLine>
          <InputLine type="string" placeholder="" id="organizacaoSegura" htmlfor="organizacao-segura" onChange={e => setOrganizacaoSegura(e.target.value)}>
            Organização segura?
          </InputLine>

          <fieldset>
            <legend className="text-black">Câmeras funcionando?</legend>
            <InputLine type="radio" name="camera" value="sim" checked={cameraFunciona === "sim"} onChange={e => setCameraFunciona(e.target.value)}>Sim</InputLine>
            <InputLine type="radio" name="camera" value="não" checked={cameraFunciona === "não"} onChange={e => setCameraFunciona(e.target.value)}>Não</InputLine>
          </fieldset>

          <InputLine type="string" placeholder="" id="balancaPiso" htmlfor="balanca-piso" onChange={e => setBalancaPiso(e.target.value)}>Condição da balança de piso</InputLine>
          <InputLine type="date" placeholder="" id="dataBalanca" htmlfor="data-balanca" onChange={e => setDataBalanca(e.target.value)}>Data da última verificação da balança</InputLine>
          <InputLine type="string" placeholder="" id="condicaoMicLav" htmlfor="condicao-mic-lav" onChange={e => setCondicaoMicLav(e.target.value)}>Condição de microondas/lavadoras</InputLine>
          <InputLine type="date" placeholder="" id="dataBebedouro" htmlfor="data-bebedouro" onChange={e => setDataBebedouro(e.target.value)}>Data do último abastecimento do bebedouro</InputLine>
          <InputLine type="date" placeholder="" id="dataProximaDetetizacao" htmlfor="data-proxima-detetizacao" onChange={e => setDataProximaDetetizacao(e.target.value)}>Data da próxima detetização</InputLine>
          <InputLine type="date" placeholder="" id="dataUltimoExtintor" htmlfor="data-ultimo-extintor" onChange={e => setDataUltimoExtintor(e.target.value)}>Data da última manutenção do extintor</InputLine>
          <InputLine type="date" placeholder="" id="dataProximoExtintor" htmlfor="data-proximo-extintor" onChange={e => setDataProximoExtintor(e.target.value)}>Data da próxima manutenção do extintor</InputLine>
          <InputLine type="date" placeholder="" id="dataUltimaCaixaAgua" htmlfor="data-ultima-caixa-agua" onChange={e => setDataUltimaCaixaAgua(e.target.value)}>Data da última limpeza da caixa d’água</InputLine>
          <InputLine type="date" placeholder="" id="dataProximaCaixaAgua" htmlfor="data-proxima-caixa-agua" onChange={e => setDataProximaCaixaAgua(e.target.value)}>Data da próxima limpeza da caixa d’água</InputLine>

          <fieldset>
            <legend className="text-black">Alguma cadeira está em má condição?</legend>
            <InputLine type="radio" name="cadeira" value="sim" checked={cadeiraRuim === "sim"} onChange={handleCadeiraChange}>Sim</InputLine>
            <InputLine type="radio" name="cadeira" value="não" checked={cadeiraRuim === "não"} onChange={handleCadeiraChange}>Não</InputLine>
          </fieldset>

          {mostraCadeira && (
            <InputLine type="string" placeholder="" id="setorCadeiraRuim" htmlfor="setor-cadeira-ruim" onChange={e => setSetorCadeiraRuim(e.target.value)}>
              Descreva o setor e posição da cadeira
            </InputLine>
          )}

          <InputLine type="string" placeholder="" id="detalheAdd" htmlfor="detalhe-add" onChange={e => setDetalheAdd(e.target.value)}>
            Detalhes adicionais
          </InputLine>

          <div className="col-span-1 md:col-span-2 flex justify-center">
            <BotaoSubmit
              loading={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300"
            />
          </div>
        </form>
      </div>

      {showSuccess && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-500">
          Formulário enviado com sucesso!
        </div>
      )}
    </section>
  );
}