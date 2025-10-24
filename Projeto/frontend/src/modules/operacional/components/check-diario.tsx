import { useState, FormEvent, ChangeEvent } from "react";
import BotaoSubmit from "../../../shared/components/botao-submit";
import InputLine from "../../../shared/components/inputLine";

type FormAberturaProps = {
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

    const handleAbastecimentoChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAbastecimento(event.target.value)
    }

    const handleComprovanteChange = (event: ChangeEvent<HTMLInputElement>) => {
        setComprovanteEnviado(event.target.value)
    }

    const handleOleoMotorChange = (event: ChangeEvent<HTMLInputElement>) => {
        setOleoMotor(event.target.value)
    }

    const handleReservatorioAguaChange = (event: ChangeEvent<HTMLInputElement>) => {
        setReservatorioAgua(event.target.value)
    }

    const handleSistemaEletricoChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSistemaEletrico(event.target.value)
    }

    const handleEstadoPneusChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEstadoPneus(event.target.value)
    }

    const handleLimpezaChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLimpeza(event.target.value)
    }

    const handleMacacoChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMacaco(event.target.value)
    }

    const handleChaveRodaChange = (event: ChangeEvent<HTMLInputElement>) => {
        setChaveRoda(event.target.value)
    }

    const handleDocumentoVigenteChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDocumentoVigente(event.target.value)
    }

    return (
        <>
        <section>
            <h1 style={{ color: "#000000ff", fontSize: "2.5rem", fontWeight: 700 }}>{form}</h1>
        </section>
            <form onSubmit={enviaForm}>
                <InputLine 
                    type="text" 
                    placeholder="" 
                    id='nome-motorista' 
                    htmlFor="nome-motorista" 
                    value={nomeMotorista}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNomeMotorista(e.target.value)}
                    required
                >
                    Nome do Motorista
                </InputLine>
                
                <InputLine 
                    type="text" 
                    placeholder="" 
                    id='placa-veiculo' 
                    htmlFor="placa-veiculo" 
                    value={placaVeiculo}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPlacaVeiculo(e.target.value)}
                >
                    Placa do veículo
                </InputLine>
                
                <InputLine 
                    type="number" 
                    placeholder="" 
                    id='km-inicial' 
                    htmlFor="km-inicial" 
                    value={kmInicial}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setKmInicial(e.target.value)}
                >
                    KM Inicial
                </InputLine>
                
                <InputLine 
                    type="text" 
                    placeholder="" 
                    id='cidade-destino' 
                    htmlFor="cidade-destino" 
                    value={cidadeDestino}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setCidadeDestino(e.target.value)}
                >
                    Destino
                </InputLine>
                
                <InputLine 
                    type="number" 
                    placeholder="" 
                    id='km-final' 
                    htmlFor="km-final" 
                    value={kmFinal}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setKmFinal(e.target.value)}
                >
                    KM Final
                </InputLine>
                
                <fieldset>
                    <legend className="text-black">Teve abastecimento?</legend>
                    <InputLine 
                        type="radio" 
                        name="abastecimento" 
                        value="abastecimento-sim" 
                        id="abastecimento-sim" 
                        htmlFor="abastecimento-sim" 
                        checked={abastecimento==='abastecimento-sim'} 
                        onChange={handleAbastecimentoChange}
                    >
                        Sim
                    </InputLine>
                    <InputLine 
                        type="radio" 
                        name="abastecimento" 
                        value="abastecimento-nao" 
                        id="abastecimento-nao" 
                        htmlFor="abastecimento-nao" 
                        checked={abastecimento==='abastecimento-nao'} 
                        onChange={handleAbastecimentoChange}
                    >
                        Não
                    </InputLine>
                </fieldset>
                
                <fieldset>
                    <legend className="text-black">Comprovante de abastecimento enviado para gerência?</legend>
                    <InputLine 
                        type="radio" 
                        name="comprovanteEnviado" 
                        value="comprovante-enviado-sim" 
                        id="comprovante-enviado-sim" 
                        htmlFor="comprovante-enviado-sim" 
                        checked={comprovanteEnviado==='comprovante-enviado-sim'} 
                        onChange={handleComprovanteChange}
                    >
                        Sim
                    </InputLine>
                    <InputLine 
                        type="radio" 
                        name="comprovanteEnviado" 
                        value="comprovante-enviado-nao" 
                        id="comprovante-enviado-nao" 
                        htmlFor="comprovante-enviado-nao" 
                        checked={comprovanteEnviado==='comprovante-enviado-nao'} 
                        onChange={handleComprovanteChange}
                    >
                        Não
                    </InputLine>
                </fieldset>
                
                <fieldset>
                    <legend className="text-black">Óleo do motor OK?</legend>
                    <InputLine 
                        type="radio" 
                        name="oleoMotor" 
                        value="oleo-motor-sim" 
                        id="oleo-motor-sim" 
                        htmlFor="oleo-motor-sim" 
                        checked={oleoMotor==='oleo-motor-sim'} 
                        onChange={handleOleoMotorChange}
                    >
                        Sim
                    </InputLine>
                    <InputLine 
                        type="radio" 
                        name="oleoMotor" 
                        value="oleo-motor-nao" 
                        id="oleo-motor-nao" 
                        htmlFor="oleo-motor-nao" 
                        checked={oleoMotor==='oleo-motor-nao'} 
                        onChange={handleOleoMotorChange}
                    >
                        Não
                    </InputLine>
                </fieldset>
                
                <fieldset>
                    <legend className="text-black">Reservatório de água OK?</legend>
                    <InputLine 
                        type="radio" 
                        name="reservatorioAgua" 
                        value="reservatorio-agua-sim" 
                        id="reservatorio-agua-sim" 
                        htmlFor="reservatorio-agua-sim" 
                        checked={reservatorioAgua==='reservatorio-agua-sim'} 
                        onChange={handleReservatorioAguaChange}
                    >
                        Sim
                    </InputLine>
                    <InputLine 
                        type="radio" 
                        name="reservatorioAgua" 
                        value="reservatorio-agua-nao" 
                        id="reservatorio-agua-nao" 
                        htmlFor="reservatorio-agua-nao" 
                        checked={reservatorioAgua==='reservatorio-agua-nao'} 
                        onChange={handleReservatorioAguaChange}
                    >
                        Não
                    </InputLine>
                </fieldset>
                
                <fieldset>
                    <legend className="text-black">Sistema elétrico OK?</legend>
                    <InputLine 
                        type="radio" 
                        name="sistemaEletrico" 
                        value="sistema-eletrico-sim" 
                        id="sistema-eletrico-sim" 
                        htmlFor="sistema-eletrico-sim" 
                        checked={sistemaEletrico==='sistema-eletrico-sim'} 
                        onChange={handleSistemaEletricoChange}
                    >
                        Sim
                    </InputLine>
                    <InputLine 
                        type="radio" 
                        name="sistemaEletrico" 
                        value="sistema-eletrico-nao" 
                        id="sistema-eletrico-nao" 
                        htmlFor="sistema-eletrico-nao" 
                        checked={sistemaEletrico==='sistema-eletrico-nao'} 
                        onChange={handleSistemaEletricoChange}
                    >
                        Não
                    </InputLine>
                </fieldset>
                
                <fieldset>
                    <legend className="text-black">Estado dos pneus OK?</legend>
                    <InputLine 
                        type="radio" 
                        name="estadoPneus" 
                        value="estado-pneus-sim" 
                        id="estado-pneus-sim" 
                        htmlFor="estado-pneus-sim" 
                        checked={estadoPneus==='estado-pneus-sim'} 
                        onChange={handleEstadoPneusChange}
                    >
                        Sim
                    </InputLine>
                    <InputLine 
                        type="radio" 
                        name="estadoPneus" 
                        value="estado-pneus-nao" 
                        id="estado-pneus-nao" 
                        htmlFor="estado-pneus-nao" 
                        checked={estadoPneus==='estado-pneus-nao'} 
                        onChange={handleEstadoPneusChange}
                    >
                        Não
                    </InputLine>
                </fieldset>
                
                <fieldset>
                    <legend className="text-black">Limpeza do baú/sider/cabine OK?</legend>
                    <InputLine 
                        type="radio" 
                        name="limpeza" 
                        value="limpeza-sim" 
                        id="limpeza-sim" 
                        htmlFor="limpeza-sim" 
                        checked={limpeza==='limpeza-sim'} 
                        onChange={handleLimpezaChange}
                    >
                        Sim
                    </InputLine>
                    <InputLine 
                        type="radio" 
                        name="limpeza" 
                        value="limpeza-nao" 
                        id="limpeza-nao" 
                        htmlFor="limpeza-nao" 
                        checked={limpeza==='limpeza-nao'} 
                        onChange={handleLimpezaChange}
                    >
                        Não
                    </InputLine>
                </fieldset>
                
                <fieldset>
                    <legend className="text-black">Macaco OK?</legend>
                    <InputLine 
                        type="radio" 
                        name="macaco" 
                        value="macaco-sim" 
                        id="macaco-sim" 
                        htmlFor="macaco-sim" 
                        checked={macaco==='macaco-sim'} 
                        onChange={handleMacacoChange}
                    >
                        Sim
                    </InputLine>
                    <InputLine 
                        type="radio" 
                        name="macaco" 
                        value="macaco-nao" 
                        id="macaco-nao" 
                        htmlFor="macaco-nao" 
                        checked={macaco==='macaco-nao'} 
                        onChange={handleMacacoChange}
                    >
                        Não
                    </InputLine>
                </fieldset>
                
                <fieldset>
                    <legend className="text-black">Chave de roda OK?</legend>
                    <InputLine 
                        type="radio" 
                        name="chaveRoda" 
                        value="chave-roda-sim" 
                        id="chave-roda-sim" 
                        htmlFor="chave-roda-sim" 
                        checked={chaveRoda==='chave-roda-sim'} 
                        onChange={handleChaveRodaChange}
                    >
                        Sim
                    </InputLine>
                    <InputLine 
                        type="radio" 
                        name="chaveRoda" 
                        value="chave-roda-nao" 
                        id="chave-roda-nao" 
                        htmlFor="chave-roda-nao" 
                        checked={chaveRoda==='chave-roda-nao'} 
                        onChange={handleChaveRodaChange}
                    >
                        Não
                    </InputLine>
                </fieldset>
                
                <fieldset>
                    <legend className="text-black">Documento vigente OK?</legend>
                    <InputLine 
                        type="radio" 
                        name="documentoVigente" 
                        value="documento-vigente-sim" 
                        id="documento-vigente-sim" 
                        htmlFor="documento-vigente-sim" 
                        checked={documentoVigente==='documento-vigente-sim'} 
                        onChange={handleDocumentoVigenteChange}
                    >
                        Sim
                    </InputLine>
                    <InputLine 
                        type="radio" 
                        name="documentoVigente" 
                        value="documento-vigente-nao" 
                        id="documento-vigente-nao" 
                        htmlFor="documento-vigente-nao" 
                        checked={documentoVigente==='documento-vigente-nao'} 
                        onChange={handleDocumentoVigenteChange}
                    >
                        Não
                    </InputLine>
                </fieldset>
                
                <InputLine 
                    type="datetime-local" 
                    id='data-hora-encerramento' 
                    htmlFor="data-hora-encerramento" 
                    required 
                    value={dataHoraEncerramento}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setDataHoraEncerramento(e.target.value)}
                >
                    Data e hora do encerramento da atividade
                </InputLine>
                
                <InputLine 
                    type="text" 
                    placeholder="" 
                    id='observacoes' 
                    htmlFor="observacoes" 
                    required 
                    value={observacoes}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setObservacoes(e.target.value)}
                >
                    Observações que sejam pertinentes
                </InputLine>
                
                <section>
                    <BotaoSubmit loading={loading} label={loading ? "Enviando..." : "Enviar"} type="submit"/>
                </section>
            </form>
        </>
    )
}