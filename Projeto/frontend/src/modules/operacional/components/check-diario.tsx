import { useState } from "react";
import BotaoSubmit from "../../../shared/components/botao-submit";
import InputLine from "../../../shared/components/inputLine";

export default function CheckDiario() {
    const [loading, setLoading] = useState(false);

    const [placaVeiculo,setPlacaVeiculo] = useState("")
    const [kmInicial,setkmInicial] = useState("")
    const [cidadeDestino,setcidadeDestino] = useState("")
    const [kmFinal,setkmFinal] = useState("")
    const [abastecimento,setAbastecimento] = useState(null)
    const [comprovanteEnviado,setComprovanteEnviado] = useState(null)
    const [oleoMotor,setOleoMotor] = useState(null)
    const [reservatorioAgua,setReservatorioAgua] = useState(null)
    const [sistemaEletrico,setSistemaEletrico] = useState(null)
    const [estadoPneus,setEstadoPneus] = useState(null)
    const [limpeza,setLimpeza] = useState(null)
    const [macaco,setMacaco] = useState(null)
    const [chaveroda,setchaveroda] = useState(null)
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
    return (
        <>
        <section>
            <h1 style={{ color: "#000000ff", fontSize: "2.5rem", fontWeight: 700 }}>Checklist Diário - Frota Newe</h1>
        </section>
            <form action="" onSubmit={enviaForm}>
                {/* <InputLine type="text" placeholder="" id='nome' htmlfor="nome" required>Nome Completo</InputLine> */}
                <InputLine type="text" placeholder="" id='placa-veiculo' htmlfor="placa-veiculo">Placa do veículo</InputLine>
                <InputLine type="number" placeholder="" id='km-inicial' htmlfor="km-inicial">KM Inicial</InputLine>
                <InputLine type="text" placeholder="" id='cidade-destino' htmlfor="cidade-destino">Destino</InputLine>
                <InputLine type="number" placeholder="" id='km-final' htmlfor="km-final">KM Final</InputLine>
                <fieldset>
                    <legend className="text-black">Teve abastecimento?</legend>
                    <InputLine type="radio" name="abastecimento" value="abastecimento-sim" id="abastecimento-sim" htmlfor="abastecimento-sim">Sim</InputLine>
                    <InputLine type="radio" name="abastecimento" value="abastecimento-nao" id="abastecimento-nao" htmlfor="abastecimento-nao">Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Comprovante de abastecimento enviado para gerência?</legend>
                    <InputLine type="radio" name="comprovante-enviado" value="comprovante-enviado-sim" id="comprovante-enviado-sim" htmlfor="comprovante-enviado-sim">Sim</InputLine>
                    <InputLine type="radio" name="comprovante-enviado" value="comprovante-enviado-nao" id="comprovante-enviado-nao" htmlfor="comprovante-enviado-nao">Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Óleo do motor ok?</legend>
                    <InputLine type="radio" name="oleo-motor" value="oleo-motor-sim" id="oleo-motor-sim" htmlfor="oleo-motor-sim">Sim</InputLine>
                    <InputLine type="radio" name="oleo-motor" value="oleo-motor-nao" id="oleo-motor-nao" htmlfor="oleo-motor-nao">Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Reservatório de água ok?</legend>
                    <InputLine type="radio" name="reservatorio-agua" value="reservatorio-agua-sim" id="reservatorio-agua-sim" htmlfor="reservatorio-agua-sim">Sim</InputLine>
                    <InputLine type="radio" name="reservatorio-agua" value="reservatorio-agua-nao" id="reservatorio-agua-nao" htmlfor="reservatorio-agua-nao">Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Sistema elétrico ok?</legend>
                    <InputLine type="radio" name="sistema-eletrico" value="sistema-eletrico-sim" id="sistema-eletrico-sim" htmlfor="sistema-eletrico-sim">Sim</InputLine>
                    <InputLine type="radio" name="sistema-eletrico" id="sistema-eletrico-nao" htmlfor="sistema-eletrico-nao">Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Estado dos pneus ok?</legend>
                    <InputLine type="radio" name="estado-pneus" value="estado-pneus-sim" id="estado-pneus-sim" htmlfor="estado-pneus-sim">Sim</InputLine>
                    <InputLine type="radio" name="estado-pneus" id="estado-pneus-nao" htmlfor="estado-pneus-nao">Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Limpeza baú/sider/cabine ok?</legend>
                    <InputLine type="radio" name="limpeza" value="limpeza-sim" id="limpeza-sim" htmlfor="limpeza-sim">Sim</InputLine>
                    <InputLine type="radio" name="limpeza" id="limpeza-nao" htmlfor="limpeza-nao">Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Macaco ok?</legend>
                    <InputLine type="radio" name="macaco" value="macaco-sim" id="macaco-sim" htmlfor="macaco-sim">Sim</InputLine>
                    <InputLine type="radio" name="macaco" id="macaco-nao" htmlfor="macaco-nao">Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Chave de roda ok?</legend>
                    <InputLine type="radio" name="chave-roda" value="chave-roda-sim" id="chave-roda-sim" htmlfor="chave-roda-sim">Sim</InputLine>
                    <InputLine type="radio" name="chave-roda" id="chave-roda-nao" htmlfor="macchave-rodaaco-nao">Não</InputLine>
                </fieldset>
                <fieldset>
                    <legend className="text-black">Documento vigente ok?</legend>
                    <InputLine type="radio" name="documento-vigente" value="documento-vigente-sim" id="documento-vigente-sim" htmlfor="documento-vigente-sim">Sim</InputLine>
                    <InputLine type="radio" name="documento-vigente" id="documento-vigente-nao" htmlfor="documento-vigente-nao">Não</InputLine>
                </fieldset>
                <InputLine type="datetime-local" id='data-hora-encerramento' htmlfor="data-hora-encerramento" required>Data e hora do encerramento da atividade</InputLine>
                <InputLine type="text" placeholder="" id='observacoes' htmlfor="observacoes" required>Observações que sejam pertinentes</InputLine>
                <section>
                     <BotaoSubmit loading={loading} label="Enviar" type="submit"/>
                </section>
            </form>
        </>
    )
}