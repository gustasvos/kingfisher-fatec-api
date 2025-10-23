import { useState, FormEvent, ChangeEvent } from "react";
import BotaoSubmit from "../../../shared/components/botao-submit";
import InputLine from "../../../shared/components/inputLine";

interface FormAberturaProps {
  form: string;
}

export default function CheckDiario({ form }: FormAberturaProps) {
    const [loading, setLoading] = useState(false);

    const [nomeMotorista, setNomeMotorista] = useState("")
    const [placaVeiculo, setPlacaVeiculo] = useState("")
    const [kmInicial, setKmInicial] = useState("")
    const [cidadeDestino, setCidadeDestino] = useState("")
    const [kmFinal, setKmFinal] = useState("")
    const [abastecimento, setAbastecimento] = useState<string | null>(null)
    const [comprovanteEnviado, setComprovanteEnviado] = useState<string | null>(null)
    const [oleoMotor, setOleoMotor] = useState<string | null>(null)
    const [reservatorioAgua, setReservatorioAgua] = useState<string | null>(null)
    const [sistemaEletrico, setSistemaEletrico] = useState<string | null>(null)
    const [estadoPneus, setEstadoPneus] = useState<string | null>(null)
    const [limpeza, setLimpeza] = useState<string | null>(null)
    const [macaco, setMacaco] = useState<string | null>(null)
    const [chaveRoda, setChaveRoda] = useState<string | null>(null)
    const [documentoVigente, setDocumentoVigente] = useState<string | null>(null)
    const [dataHoraEncerramento, setDataHoraEncerramento] = useState("")
    const [observacoes, setObservacoes] = useState("")

    const enviaForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            
            formData.append('formTitle', form);
            
            if (nomeMotorista) formData.append('nome-motorista', nomeMotorista);
            
            const converterParaSimNao = (valor: string | null) => {
                if (valor === null) return '';
                return valor.includes('-sim') ? 'SIM' : 'NÃO';
            };

            if (placaVeiculo) formData.append('placa-veiculo', placaVeiculo);
            if (kmInicial) formData.append('km-inicial', kmInicial);
            if (cidadeDestino) formData.append('destino', cidadeDestino);
            if (kmFinal) formData.append('km-final', kmFinal);
            if (dataHoraEncerramento) formData.append('data-horario-encerramento', dataHoraEncerramento);
            if (observacoes) formData.append('observacoes', observacoes);

            if (abastecimento) formData.append('teve-abastecimento', converterParaSimNao(abastecimento));
            if (comprovanteEnviado) formData.append('comprovante-enviado', converterParaSimNao(comprovanteEnviado));
            if (oleoMotor) formData.append('oleo-motor-ok', converterParaSimNao(oleoMotor));
            if (reservatorioAgua) formData.append('reservatorio-agua-ok', converterParaSimNao(reservatorioAgua));
            if (sistemaEletrico) formData.append('sistema-eletrico-ok', converterParaSimNao(sistemaEletrico));
            if (estadoPneus) formData.append('estado-pneus-ok', converterParaSimNao(estadoPneus));
            if (limpeza) formData.append('limpeza-bau-sider-cabine-ok', converterParaSimNao(limpeza));
            if (macaco) formData.append('macaco-ok', converterParaSimNao(macaco));
            if (chaveRoda) formData.append('chave-roda-ok', converterParaSimNao(chaveRoda));
            if (documentoVigente) formData.append('documento-vigente-ok', converterParaSimNao(documentoVigente));

            console.log('Enviando FormData para /submit');
            
            const response = await fetch('http://localhost:8080/submit', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const resultado = await response.json();
                console.log('Sucesso! Backend respondeu:', resultado);
                alert("Formulário enviado com sucesso!");
            } else {
                const erroDetalhado = await response.text();
                console.log('Erro do backend:', response.status, erroDetalhado);
                alert(`Erro ${response.status}: ${erroDetalhado}`);
            }
        } catch (error) {
            console.log('Erro de rede:', error);
            alert("Erro de conexão com o backend");
        } finally {
            setLoading(false);
        }
    };

  const handleAbastecimentoChange = (e: React.ChangeEvent<HTMLInputElement>) => setAbastecimento(e.target.value);
  const handleComprovanteChange = (e: React.ChangeEvent<HTMLInputElement>) => setComprovanteEnviado(e.target.value);
  const handleOleoMotorChange = (e: React.ChangeEvent<HTMLInputElement>) => setOleoMotor(e.target.value);
  const handleReservatorioAguaChange = (e: React.ChangeEvent<HTMLInputElement>) => setReservatorioAgua(e.target.value);
  const handleSistemaEletricoChange = (e: React.ChangeEvent<HTMLInputElement>) => setSistemaEletrico(e.target.value);
  const handleEstadoPneuChange = (e: React.ChangeEvent<HTMLInputElement>) => setEstadoPneus(e.target.value);
  const handleLimpezaChange = (e: React.ChangeEvent<HTMLInputElement>) => setLimpeza(e.target.value);
  const handleMacacoChange = (e: React.ChangeEvent<HTMLInputElement>) => setMacaco(e.target.value);
  const handleChaveRodaChange = (e: React.ChangeEvent<HTMLInputElement>) => setChaveRoda(e.target.value);
  const handleDocumentoVigenteChange = (e: React.ChangeEvent<HTMLInputElement>) => setDocumentoVigente(e.target.value);

  return (
    <div className="w-full flex justify-center mt-8 px-4">
      <div className="bg-white shadow-lg rounded-3xl w-full max-w-5xl h-[90vh] border border-gray-100 overflow-hidden">
        <div className="h-full overflow-y-auto p-8
                        scrollbar-thin scrollbar-thumb-[#17607f] scrollbar-track-gray-100 scrollbar-thumb-rounded-full">
          
          <h1 className="text-3xl font-semibold text-[#17607f] mb-8 text-center tracking-tight">
            Checklist Diário - Frota Newe
          </h1>

          <form onSubmit={enviaForm} className="space-y-8">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputLine type="text" id="placa-veiculo" htmlfor="placa-veiculo" onChange={(e) => setPlacaVeiculo(e.target.value)}>
                Placa do veículo
              </InputLine>

              <InputLine type="number" id="km-inicial" htmlfor="km-inicial" onChange={(e) => setkmInicial(e.target.value)}>
                KM Inicial
              </InputLine>

              <InputLine type="text" id="cidade-destino" htmlfor="cidade-destino" onChange={(e) => setCidadeDestino(e.target.value)}>
                Destino
              </InputLine>

              <InputLine type="number" id="km-final" htmlfor="km-final" onChange={(e) => setkmFinal(e.target.value)}>
                KM Final
              </InputLine>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <fieldset className="border border-gray-200 rounded-xl p-4 hover:border-[#17607f] transition-colors duration-200">
                <legend className="text-gray-700 font-medium">Teve abastecimento?</legend>
                <div className="flex flex-col gap-1 mt-2">
                  <InputLine type="radio" name="abastecimento" value="abastecimento-sim" id="abastecimento-sim"
                    htmlfor="abastecimento-sim" checked={abastecimento === 'abastecimento-sim'} onChange={handleAbastecimentoChange}>Sim</InputLine>
                  <InputLine type="radio" name="abastecimento" value="abastecimento-nao" id="abastecimento-nao"
                    htmlfor="abastecimento-nao" checked={abastecimento === 'abastecimento-nao'} onChange={handleAbastecimentoChange}>Não</InputLine>
                </div>
              </fieldset>

              <fieldset className="border border-gray-200 rounded-xl p-4 hover:border-[#17607f] transition-colors duration-200">
                <legend className="text-gray-700 font-medium">Comprovante enviado?</legend>
                <div className="flex flex-col gap-1 mt-2">
                  <InputLine type="radio" name="comprovanteEnviado" value="comprovante-enviado-sim" id="comprovante-enviado-sim"
                    htmlfor="comprovante-enviado-sim" checked={comprovanteEnviado === 'comprovante-enviado-sim'} onChange={handleComprovanteChange}>Sim</InputLine>
                  <InputLine type="radio" name="comprovanteEnviado" value="comprovante-enviado-nao" id="comprovante-enviado-nao"
                    htmlfor="comprovante-enviado-nao" checked={comprovanteEnviado === 'comprovante-enviado-nao'} onChange={handleComprovanteChange}>Não</InputLine>
                </div>
              </fieldset>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[["Óleo do motor ok?", "oleoMotor", oleoMotor, handleOleoMotorChange],
                ["Reservatório de água ok?", "reservatorioAgua", reservatorioAgua, handleReservatorioAguaChange],
                ["Sistema elétrico ok?", "sistemaEletrico", sistemaEletrico, handleSistemaEletricoChange],
                ["Estado dos pneus ok?", "estadoPneus", estadoPneus, handleEstadoPneuChange],
                ["Limpeza baú/sider/cabine ok?", "limpeza", limpeza, handleLimpezaChange],
                ["Macaco ok?", "macaco", macaco, handleMacacoChange],
                ["Chave de roda ok?", "chaveRoda", chaveRoda, handleChaveRodaChange],
                ["Documento vigente ok?", "documentoVigente", documentoVigente, handleDocumentoVigenteChange],
              ].map(([label, name, value, handler]) => (
                <fieldset key={name as string} className="border border-gray-200 rounded-xl p-4 hover:border-[#17607f] transition-colors duration-200">
                  <legend className="text-gray-700 font-medium">{label}</legend>
                  <div className="flex flex-col gap-1 mt-2">
                    <InputLine type="radio" name={name as string} value={`${name}-sim`} id={`${name}-sim`}
                      htmlfor={`${name}-sim`} checked={value === `${name}-sim`} onChange={handler as any}>Sim</InputLine>
                    <InputLine type="radio" name={name as string} value={`${name}-nao`} id={`${name}-nao`}
                      htmlfor={`${name}-nao`} checked={value === `${name}-nao`} onChange={handler as any}>Não</InputLine>
                  </div>
                </fieldset>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputLine type="datetime-local" id="data-hora-encerramento" htmlfor="data-hora-encerramento"
                required onChange={(e) => setDataHoraEncerramento(e.target.value)}>
                Data e hora do encerramento da atividade
              </InputLine>

              <InputLine type="text" id="observacoes" htmlfor="observacoes" onChange={(e) => setobservacoes(e.target.value)}>
                Observações
              </InputLine>
            </div>

            <div className="pt-6 flex justify-center">
              <BotaoSubmit
                loading={loading}
                label="Enviar"
                type="submit"
                className="bg-[#17607f] hover:bg-[#14536f] text-white font-semibold rounded-xl px-8 py-3 transition-all duration-300 shadow-md hover:shadow-lg"
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