import { useState, FormEvent, ChangeEvent } from "react";
import BotaoSubmit from "../../../shared/components/botao-submit";
import InputLine from "../../../shared/components/inputLine";

type FormAberturaProps = {
    form: string;
};

export default function CheckDiario({ form }: FormAberturaProps) {
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [nomeMotorista, setNomeMotorista] = useState("");
    const [placaVeiculo, setPlacaVeiculo] = useState("");
    const [kmInicial, setKmInicial] = useState("");
    const [cidadeDestino, setCidadeDestino] = useState("");
    const [kmFinal, setKmFinal] = useState("");
    const [abastecimento, setAbastecimento] = useState<string | null>(null);
    const [comprovanteEnviado, setComprovanteEnviado] = useState<string | null>(null);
    const [oleoMotor, setOleoMotor] = useState<string | null>(null);
    const [reservatorioAgua, setReservatorioAgua] = useState<string | null>(null);
    const [sistemaEletrico, setSistemaEletrico] = useState<string | null>(null);
    const [estadoPneus, setEstadoPneus] = useState<string | null>(null);
    const [limpeza, setLimpeza] = useState<string | null>(null);
    const [macaco, setMacaco] = useState<string | null>(null);
    const [chaveRoda, setChaveRoda] = useState<string | null>(null);
    const [documentoVigente, setDocumentoVigente] = useState<string | null>(null);
    const [dataHoraEncerramento, setDataHoraEncerramento] = useState("");
    const [observacoes, setObservacoes] = useState("");

    const enviaForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();

            formData.append("formTitle", form);
            if (nomeMotorista) formData.append("nome-motorista", nomeMotorista);

            const simNao = (valor: string | null) =>
                valor ? (valor.includes("-sim") ? "SIM" : "NÃO") : "";

            if (placaVeiculo) formData.append("placa-veiculo", placaVeiculo);
            if (kmInicial) formData.append("km-inicial", kmInicial);
            if (cidadeDestino) formData.append("destino", cidadeDestino);
            if (kmFinal) formData.append("km-final", kmFinal);
            if (dataHoraEncerramento)
                formData.append("data-horario-encerramento", dataHoraEncerramento);
            if (observacoes) formData.append("observacoes", observacoes);

            if (abastecimento) formData.append("teve-abastecimento", simNao(abastecimento));
            if (comprovanteEnviado)
                formData.append("comprovante-enviado", simNao(comprovanteEnviado));
            if (oleoMotor) formData.append("oleo-motor-ok", simNao(oleoMotor));
            if (reservatorioAgua)
                formData.append("reservatorio-agua-ok", simNao(reservatorioAgua));
            if (sistemaEletrico)
                formData.append("sistema-eletrico-ok", simNao(sistemaEletrico));
            if (estadoPneus) formData.append("estado-pneus-ok", simNao(estadoPneus));
            if (limpeza) formData.append("limpeza-bau-sider-cabine-ok", simNao(limpeza));
            if (macaco) formData.append("macaco-ok", simNao(macaco));
            if (chaveRoda) formData.append("chave-roda-ok", simNao(chaveRoda));
            if (documentoVigente)
                formData.append("documento-vigente-ok", simNao(documentoVigente));

            const response = await fetch("http://localhost:8080/submit", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
            } else {
                const erro = await response.text();
                alert(`Erro ${response.status}: ${erro}`);
            }
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro de conexão com o backend");
        } finally {
            setLoading(false);
        }
    };

    const handleRadio =
        (setter: (v: string) => void) => (e: ChangeEvent<HTMLInputElement>) =>
            setter(e.target.value);

    return (
        <div className="w-full flex justify-center mt-8 px-4">
            <div className="bg-white shadow-lg rounded-3xl w-full max-w-5xl h-[90vh] border border-gray-100 overflow-hidden">
                <div className="h-full overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-[#17607f] scrollbar-track-gray-100 scrollbar-thumb-rounded-full">
                    <h1 className="text-3xl font-semibold text-[#17607f] mb-8 text-center tracking-tight">
                        {form}
                    </h1>

                    <form onSubmit={enviaForm} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputLine
                                type="text"
                                id="nome-motorista"
                                htmlfor="nome-motorista"
                                required
                                value={nomeMotorista}
                                onChange={(e) => setNomeMotorista(e.target.value)}
                            >
                                Nome do motorista
                            </InputLine>

                            <InputLine
                                type="text"
                                id="placa-veiculo"
                                htmlfor="placa-veiculo"
                                value={placaVeiculo}
                                onChange={(e) => setPlacaVeiculo(e.target.value)}
                            >
                                Placa do veículo
                            </InputLine>

                            <InputLine
                                type="number"
                                id="km-inicial"
                                htmlfor="km-inicial"
                                value={kmInicial}
                                onChange={(e) => setKmInicial(e.target.value)}
                            >
                                KM Inicial
                            </InputLine>

                            <InputLine
                                type="text"
                                id="cidade-destino"
                                htmlfor="cidade-destino"
                                value={cidadeDestino}
                                onChange={(e) => setCidadeDestino(e.target.value)}
                            >
                                Destino
                            </InputLine>

                            <InputLine
                                type="number"
                                id="km-final"
                                htmlfor="km-final"
                                value={kmFinal}
                                onChange={(e) => setKmFinal(e.target.value)}
                            >
                                KM Final
                            </InputLine>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                ["Teve abastecimento?", "abastecimento", abastecimento, setAbastecimento],
                                ["Comprovante enviado?", "comprovanteEnviado", comprovanteEnviado, setComprovanteEnviado],
                            ].map(([label, name, value, setter]) => (
                                <fieldset
                                    key={name}
                                    className="border border-gray-200 rounded-xl p-4 hover:border-[#17607f] transition-colors duration-200"
                                >
                                    <legend className="text-gray-700 font-medium">{label}</legend>
                                    <div className="flex flex-col gap-1 mt-2">
                                        <InputLine
                                            type="radio"
                                            name={name as string}
                                            value={`${name}-sim`}
                                            id={`${name}-sim`}
                                            htmlfor={`${name}-sim`}
                                            checked={value === `${name}-sim`}
                                            onChange={handleRadio(setter as any)}
                                        >
                                            Sim
                                        </InputLine>
                                        <InputLine
                                            type="radio"
                                            name={name as string}
                                            value={`${name}-nao`}
                                            id={`${name}-nao`}
                                            htmlfor={`${name}-nao`}
                                            checked={value === `${name}-nao`}
                                            onChange={handleRadio(setter as any)}
                                        >
                                            Não
                                        </InputLine>
                                    </div>
                                </fieldset>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                ["Óleo do motor OK?", "oleoMotor", oleoMotor, setOleoMotor],
                                ["Reservatório de água OK?", "reservatorioAgua", reservatorioAgua, setReservatorioAgua],
                                ["Sistema elétrico OK?", "sistemaEletrico", sistemaEletrico, setSistemaEletrico],
                                ["Estado dos pneus OK?", "estadoPneus", estadoPneus, setEstadoPneus],
                                ["Limpeza baú/sider/cabine OK?", "limpeza", limpeza, setLimpeza],
                                ["Macaco OK?", "macaco", macaco, setMacaco],
                                ["Chave de roda OK?", "chaveRoda", chaveRoda, setChaveRoda],
                                ["Documento vigente OK?", "documentoVigente", documentoVigente, setDocumentoVigente],
                            ].map(([label, name, value, setter]) => (
                                <fieldset
                                    key={name}
                                    className="border border-gray-200 rounded-xl p-4 hover:border-[#17607f] transition-colors duration-200"
                                >
                                    <legend className="text-gray-700 font-medium">{label}</legend>
                                    <div className="flex flex-col gap-1 mt-2">
                                        <InputLine
                                            type="radio"
                                            name={name as string}
                                            value={`${name}-sim`}
                                            id={`${name}-sim`}
                                            htmlfor={`${name}-sim`}
                                            checked={value === `${name}-sim`}
                                            onChange={handleRadio(setter as any)}
                                        >
                                            Sim
                                        </InputLine>
                                        <InputLine
                                            type="radio"
                                            name={name as string}
                                            value={`${name}-nao`}
                                            id={`${name}-nao`}
                                            htmlfor={`${name}-nao`}
                                            checked={value === `${name}-nao`}
                                            onChange={handleRadio(setter as any)}
                                        >
                                            Não
                                        </InputLine>
                                    </div>
                                </fieldset>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputLine
                                type="datetime-local"
                                id="data-hora-encerramento"
                                htmlfor="data-hora-encerramento"
                                required
                                value={dataHoraEncerramento}
                                onChange={(e) => setDataHoraEncerramento(e.target.value)}
                            >
                                Data e hora do encerramento
                            </InputLine>

                            <InputLine
                                type="text"
                                id="observacoes"
                                htmlfor="observacoes"
                                required
                                value={observacoes}
                                onChange={(e) => setObservacoes(e.target.value)}
                            >
                                Observações pertinentes
                            </InputLine>
                        </div>

                        <div className="pt-6 flex justify-center">
                            <BotaoSubmit
                                loading={loading}
                                label={loading ? "Enviando..." : "Enviar"}
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
