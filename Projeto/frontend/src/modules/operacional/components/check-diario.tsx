import { useState } from "react";
import BotaoSubmit from "../../../shared/components/botao-submit";
import InputLine from "../../../shared/components/inputLine";

type FormAberturaProps = {
    form: string;
}

export default function CheckDiario({form}: FormAberturaProps) {
    const [loading, setLoading] = useState(false);

    const [formTitle, setFormTitle] = useState(form)
    const [placaVeiculo,setPlacaVeiculo] = useState("")
    const [kmInicial,setkmInicial] = useState("")
    const [cidadeDestino,setCidadeDestino] = useState("")
    const [kmFinal,setkmFinal] = useState("")
    const [abastecimento,setAbastecimento] = useState(null)
    const [comprovanteEnviado,setComprovanteEnviado] = useState(null)
    const [oleoMotor,setOleoMotor] = useState(null)
    const [reservatorioAgua,setReservatorioAgua] = useState(null)
    const [sistemaEletrico,setSistemaEletrico] = useState(null)
    const [estadoPneus,setEstadoPneus] = useState(null)
    const [limpeza,setLimpeza] = useState(null)
    const [macaco,setMacaco] = useState(null)
    const [chaveRoda,setChaveRoda] = useState(null)
    const [documentoVigente,setDocumentoVigente] = useState(null)
    const [dataHoraEncerramento,setDataHoraEncerramento] = useState("")
    const [observacoes,setobservacoes] = useState("")

    const enviaForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
        alert("Formulário enviado!");
        setLoading(false);
        }, 2000);
    };

    const handleAbastecimentoChange = (event) => {
        setAbastecimento(event.target.value)
    }

    const handleComprovanteChange = (event) => {
        setComprovanteEnviado(event.target.value)
    }

    const handleOleoMototrChange = (event) => {
        setOleoMotor(event.target.value)
    }

    const handleReservatorioAguaChange = (event) => {
        setReservatorioAgua(event.target.value)
    }

    const handleSistemaEletricoChange = (event) => {
        setSistemaEletrico(event.target.value)
    }

    const handleEstadoPneuChange = (event) => {
        setEstadoPneus(event.target.value)
    }

    const handleLimpezaChange = (event) => {
        setLimpeza(event.target.value)
    }

    const handleMacacoChange = (event) => {
        setMacaco(event.target.value)
    }

    const handleChaveRodaChange = (event) => {
        setChaveRoda(event.target.value)
    }

    const handleDocumentoVigenteChange = (event) => {
        setDocumentoVigente(event.target.value)
    }


    return (
        <>
        <section>
            <h1 style={{ color: "#000000ff", fontSize: "2.5rem", fontWeight: 700 }}>Checklist Diário - Frota Newe</h1>
        </section>
            <form action="" onSubmit={enviaForm}>
                <InputLine type="text" placeholder="" id='placa-veiculo' htmlfor="placa-veiculo" onChange={(e) => setPlacaVeiculo(e.target.value)}>Placa do veículo</InputLine>
                <InputLine type="number" placeholder="" id='km-inicial' htmlfor="km-inicial" onChange={(e) => setkmInicial(e.target.value)}>KM Inicial</InputLine>
                <InputLine type="text" placeholder="" id='cidade-destino' htmlfor="cidade-destino" onChange={(e) => setCidadeDestino(e.target.value)}>Destino</InputLine>
                <InputLine type="number" placeholder="" id='km-final' htmlfor="km-final" onChange={(e) => setkmFinal(e.target.value)}>KM Final</InputLine>
                <fieldset>
                    <legend className="text-black">Teve abastecimento?</legend>
                    <InputLine type="radio" name="abastecimento" value="abastecimento-sim" id="abastecimento-sim" htmlfor="abastecimento-sim" checked={abastecimento==='abastecimento-sim'} onChange={handleAbastecimentoChange}>Sim</InputLine>
                    <InputLine type="radio" name="abastecimento" value="abastecimento-nao" id="abastecimento-nao" htmlfor="abastecimento-nao" checked={abastecimento==='abastecimento-nao'} onChange={handleAbastecimentoChange}>Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Comprovante de abastecimento enviado para gerência?</legend>
                    <InputLine type="radio" name="comprovanteEnviado" value="comprovante-enviado-sim" id="comprovante-enviado-sim" htmlfor="comprovante-enviado-sim" checked={comprovanteEnviado==='comprovante-enviado-sim'} onChange={handleComprovanteChange}>Sim</InputLine>
                    <InputLine type="radio" name="comprovanteEnviado" value="comprovante-enviado-nao" id="comprovante-enviado-nao" htmlfor="comprovante-enviado-nao" checked={comprovanteEnviado==='comprovante-enviado-nao'} onChange={handleComprovanteChange}>Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Óleo do motor ok?</legend>
                    <InputLine type="radio" name="oleoMotor" value="oleo-motor-sim" id="oleo-motor-sim" htmlfor="oleo-motor-sim" checked={oleoMotor==='oleo-motor-sim'} onChange={handleOleoMototrChange}>Sim</InputLine>
                    <InputLine type="radio" name="oleoMotor" value="oleo-motor-nao" id="oleo-motor-nao" htmlfor="oleo-motor-nao" checked={oleoMotor==='oleo-motor-nao'} onChange={handleOleoMototrChange}>Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Reservatório de água ok?</legend>
                    <InputLine type="radio" name="reservatorioAgua" value="reservatorio-agua-sim" id="reservatorio-agua-sim" htmlfor="reservatorio-agua-sim" checked={reservatorioAgua==='reservatorio-agua-sim'} onChange={handleReservatorioAguaChange}>Sim</InputLine>
                    <InputLine type="radio" name="reservatorioAgua" value="reservatorio-agua-nao" id="reservatorio-agua-nao" htmlfor="reservatorio-agua-nao" checked={reservatorioAgua==='reservatorio-agua-nao'} onChange={handleReservatorioAguaChange}>Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Sistema elétrico ok?</legend>
                    <InputLine type="radio" name="sistemaEletrico" value="sistema-eletrico-sim" id="sistema-eletrico-sim" htmlfor="sistema-eletrico-sim" checked={sistemaEletrico==='sistema-eletrico-sim'} onChange={handleSistemaEletricoChange}>Sim</InputLine>
                    <InputLine type="radio" name="sistemaEletrico" value="sistema-eletrico-nao" id="sistema-eletrico-nao" htmlfor="sistema-eletrico-nao" checked={sistemaEletrico==='sistema-eletrico-nao'} onChange={handleSistemaEletricoChange}>Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Estado dos pneus ok?</legend>
                    <InputLine type="radio" name="estadoPneus" value="estado-pneus-sim" id="estado-pneus-sim" htmlfor="estado-pneus-sim" checked={estadoPneus==='estado-pneus-sim'} onChange={handleEstadoPneuChange}>Sim</InputLine>
                    <InputLine type="radio" name="estadoPneus" value="estado-pneus-nao" id="estado-pneus-nao" htmlfor="estado-pneus-nao" checked={estadoPneus==='estado-pneus-nao'} onChange={handleEstadoPneuChange}>Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Limpeza baú/sider/cabine ok?</legend>
                    <InputLine type="radio" name="limpeza" value="limpeza-sim" id="limpeza-sim" htmlfor="limpeza-sim" checked={limpeza==='limpeza-sim'} onChange={handleLimpezaChange}>Sim</InputLine>
                    <InputLine type="radio" name="limpeza" value="limpeza-nao" id="limpeza-nao" htmlfor="limpeza-nao" checked={limpeza==='limpeza-nao'} onChange={handleLimpezaChange}>Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Macaco ok?</legend>
                    <InputLine type="radio" name="macaco" value="macaco-sim" id="macaco-sim" htmlfor="macaco-sim" checked={macaco==='macaco-sim'} onChange={handleMacacoChange}>Sim</InputLine>
                    <InputLine type="radio" name="macaco" value="macaco-sim" id="macaco-nao" htmlfor="macaco-nao" checked={macaco==='macaco-nao'} onChange={handleMacacoChange}>Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Chave de roda ok?</legend>
                    <InputLine type="radio" name="chaveRoda" value="chave-roda-sim" id="chave-roda-sim" htmlfor="chave-roda-sim" checked={chaveRoda==='chave-roda-sim'} onChange={handleChaveRodaChange}>Sim</InputLine>
                    <InputLine type="radio" name="chaveRoda" value="chave-roda-sim" id="chave-roda-nao" htmlfor="macchave-rodaaco-nao" checked={chaveRoda==='chave-roda-nao'} onChange={handleChaveRodaChange}>Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Documento vigente ok?</legend>
                    <InputLine type="radio" name="documentoVigente" value="documento-vigente-sim" id="documento-vigente-sim" htmlfor="documento-vigente-sim" checked={documentoVigente==='documento-vigente-sim'} onChange={handleDocumentoVigenteChange}>Sim</InputLine>
                    <InputLine type="radio" name="documentoVigente" value="documento-vigente-nao" id="documento-vigente-nao" htmlfor="documento-vigente-nao" checked={documentoVigente==='documento-vigente-nao'} onChange={handleDocumentoVigenteChange}>Não</InputLine>
                </fieldset>
                <InputLine type="datetime-local" id='data-hora-encerramento' htmlfor="data-hora-encerramento" required onChange={(e) => setDataHoraEncerramento(e.target.value)}>Data e hora do encerramento da atividade</InputLine>
                <InputLine type="text" placeholder="" id='observacoes' htmlfor="observacoes" required onChange={(e) => setobservacoes(e.target.value)}>Observações que sejam pertinentes</InputLine>
                <section>
                     <BotaoSubmit loading={loading} label="Enviar" type="submit"/>
                </section>
            </form>
        </>
    )
}