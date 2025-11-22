import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import BotaoSubmit from "../../../shared/components/botao-submit";
import InputLine from "../../../shared/components/inputLine";
import equacao1Img from "../../../assets/equacao1.png"
import equacao2Img from "../../../assets/equacao2.png"
import instance from "../../../services/api";

export default function CalculoCotacao() {
    const [loading, setLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [resultado, setResultado] = useState<number | null>(null);

    const variaveis = [
        ["V", "Valor da Mercadoria (base para cálculo de GRIS e Ad Valorem)"],
        ["G", "Taxa GRIS (Gerenciamento de Risco) – em decimal"],
        ["A", "Taxa Ad Valorem – em decimal"],
        ["Ktot", "Quilometragem total da viagem"],
        ["Ckm", "Custo Base por Quilômetro"],
        ["Cag", "Custo do agregado por quilômetro"],
        ["P", "Total de pedágios da viagem"],
        ["R", "Rentabilidade mínima desejada – em decimal"],
        ["Cfinal", "Custo cobrado do cliente"],
        ["Cadicional", "Custo adicional eventual (ex.: ajudante para descarregar, taxa extra)"],
    ]

    // Variáveis do formulário
    const [V, setV] = useState("");
    const [G, setG] = useState("");
    const [A, setA] = useState("");
    const [Ktot, setKtot] = useState("");
    const [Ckm, setCkm] = useState("");
    const [Cag, setCag] = useState("");
    const [P, setP] = useState("");
    const [R, setR] = useState("");
    const [Cadicional, setCadicional] = useState("");
    const [resultados, setResultados] = useState<any | null>(null);
    const [showDetails, setShowDetails] = useState(false);

    const [clientes, setClientes] = useState<{ id: number; NomeFantasia: string }[]>([]);
    const [clienteSelecionado, setClienteSelecionado] = useState<number | null>(null);
    const [dataValidade, setDataValidade] = useState<string>("");
    const [valorTotal, setValorTotal] = useState<number>(0);
    const [observacoesInternas, setObservacoesInternas] = useState<string>("");

    const [localColeta, setLocalColeta] = useState("");
    const [localEntrega, setLocalEntrega] = useState("");
    const [pesoEstimado, setPesoEstimado] = useState("");
    const [tipoVeiculo, setTipoVeiculo] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;
        const userId = parsedUser?.id || "";

        if (!userId || !token) return;

        const fetchClientes = async () => {
            try {
                const resp = await instance.get(`/cliente/comercial/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setClientes(resp.data); // espera array com {id, NomeFantasia}
            } catch (err) {
                console.error("Erro ao buscar clientes:", err);
            }
        };

        fetchClientes();
    }, []);

    const calculaCusto = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const v = parseFloat(V.replace(",", ".")) || 0;               // Valor da Mercadoria (base para cálculo de GRIS e Ad Valorem)
            const g = parseFloat(G.replace(",", ".")) || 0;               // Taxa GRIS (Gerenciamento de Risco)
            const a = parseFloat(A.replace(",", ".")) || 0;               // Taxa Ad Valorem
            const ktot = parseFloat(Ktot.replace(",", ".")) || 0;         // Quilometragem total da viagem
            const ckm = parseFloat(Ckm.replace(",", ".")) || 0;           // Custo Base por Quilômetro
            const cag = parseFloat(Cag.replace(",", ".")) || 0;           // Custo do agregado por quilômetro
            const p = parseFloat(P.replace(",", ".")) || 0;               // Total de pedágios da viagem
            const r = parseFloat(R.replace(",", ".")) || 0;               // Rentabilidade mínima desejada
            const cad = parseFloat(Cadicional.replace(",", ".")) || 0;    // Custo adicional eventual

            // 1) Frete base = Valor da Mercadoria * (GRIS + Ad Valorem) + (Quilometragem Total * Custo Base por km)
            const freteBase = v * (g + a) + ktot * ckm

            // 2) Custo do agregado = (Quilometragem Total * Custo do Agregado por km) + Pedágios
            const custoAgregado = ktot * cag + p

            // 3) Custos totais = Custo do Agregado + Valor da Mercadoria * (GRIS + Ad Valorem)
            const custoTotais = custoAgregado + v * (g + a);

            // 4) Rentabilidade =  Lucro / fretebase
            const rentabilidadeBase =
                (freteBase - custoTotais) / freteBase

            // 5) Definição de Cfinal
            let Cfinal

            if (rentabilidadeBase >= r) {
                Cfinal = freteBase
            } else {
                // Aplica fórmula para garantir rentabilidade mínima
                Cfinal = custoTotais / (1 - r)
            }

            // 6) Lucro é o total - ( custos + taxas )
            const lucro = Cfinal - custoTotais

            // 7) Rentabilidade final efetiva
            const rentabilidadeFinal = lucro / Cfinal;

            //8) Margem de rentabilidade mínima
            const margemRentabilidade = lucro - (ktot * ckm);

            // 9) Soma o adicional pois não está incluso no cálculo de rentabilidade
            Cfinal += cad;

            setValorTotal(Cfinal)
            setResultados({
                freteBase,
                margemRentabilidade,
                custoAgregado,
                rentabilidadeFinal,
                cad,
                lucro,
                Cfinal
            });
            setResultado(Cfinal);
            setShowResult(true);
        } catch (error) {
            console.error(error);
            alert("Erro ao calcular. Verifique os valores.");
        } finally {
            setLoading(false);
        }
    };

    const [showCalculation, setShowCalculation] = useState(false);

    // helper: retorna string 'YYYY-MM-DD' ou null
    const formatToYYYYMMDD = (input: string | null | undefined): string | null => {
        if (!input) return null

        // se for datetime-local (contém 'T'), pega parte antes do T
        if (input.includes("T")) return input.split("T")[0]

        const possibleDate = input.substring(0, 10)
        const d = new Date(possibleDate)

        // se já estiver em YYYY-MM-DD, retorna direto (pequena validação)
        if (!isNaN(d.getTime())) return possibleDate
        return null
    }

    // Função para enviar os dados para o backend
    const enviarBackend = async () => {
        if (!resultados || clienteSelecionado === null) {
            alert("Você precisa calcular antes de enviar ou selecionar um cliente!");
            return;
        }

        // formata data_validade corretamente
        let dataValidadePayload = formatToYYYYMMDD(dataValidade)

        // SE NÃO EXISTIR → bloqueia e alerta
        if (!dataValidadePayload) {
            alert("Por favor, preencha uma data de validade válida.")
            return
        }

        // "id_cliente": {{clienteId}},
        // "data_validade": "2025-12-31",
        // "status": "Rascunho",
        // "valor_total": 1850.75,
        // "detalhes_frete": "Carga leve | Origem: SP | Destino: RJ",
        // "motivo_recusa": "",
        // "caminho_arquivo_pdf": "",
        // "observacoes_internas": "",
        // "detalhes_internas": ""

        const payload = {
            id_cliente: clienteSelecionado,
            data_validade: dataValidadePayload,
            status: "Rascunho",
            valor_total: resultados.Cfinal,
            detalhes_frete: JSON.stringify({
                mercadoria: V,
                localColeta,
                localEntrega,
                pesoEstimado,
                tipoVeiculo,
            }),
            motivo_recusa: "",
            caminho_arquivo_pdf: "",
            observacoes_internas: observacoesInternas,
            detalhes_internas: JSON.stringify(resultados),
        };

        try {
            setLoading(true);

            const resp = await instance.post("/cotacao/create", payload);
            alert("Cotação salva com sucesso!");
            console.log(resp.data);
        } catch (error) {
            console.error(error);
            console.log(dataValidade)
            alert("Erro ao salvar a cotação.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (setter: (v: string) => void) => (e: ChangeEvent<HTMLInputElement>) =>
        setter(e.target.value);

    return (
        <div className="flex justify-center mt-8 px-4">
            <div className="bg-white shadow-lg rounded-3xl w-full max-w-5xl h-auto border border-gray-100 overflow-hidden">
                <div className="p-8">
                    <h1 className="text-3xl font-semibold text-[#015084] mb-6 text-center tracking-tight">
                        Cálculo da Cotação
                    </h1>


                    {/* Equação */}
                    <div className="p-6 rounded-2xl mb-6 flex flex-col space-y-6 bg-blue-50 border border-blue-300 text-center shadow-sm">
                        <div className="space-y-2">
                            <h2 className="text-lg font-semibold text-gray-700">Fórmula simplificada</h2>
                            <img
                                src={equacao1Img}
                                alt="Equação 1"
                                className="h-48 w-auto mx-auto object-contain border border-blue-100 rounded-lg p-2 bg-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-lg font-semibold text-gray-700">Cálculo final do frete</h2>
                            <img
                                src={equacao2Img}
                                alt="Equação 2"
                                className="h-48 w-auto mx-auto object-contain border border-blue-100 rounded-lg p-2 bg-white"
                            />
                        </div>
                    </div>


                    {/* Botão + Detalhes */}
                    <div className="overflow-x-auto mb-8 border border-gray-200 rounded-xl">
                        <table className="table-auto w-full text-left">
                            <thead className="bg-gray-200 text-black">
                                <tr>
                                    <th className="px-4 py-2" style={{ width: "10%" }}>Variável</th>
                                    <th className="px-4 py-2 flex justify-between items-center">
                                        <span>Descrição</span>
                                        <button
                                            type="button"
                                            onClick={() => setShowDetails(!showDetails)}
                                            className="text-[#17607f] font-bold hover:underline transition text-sm"
                                        >
                                            {showDetails ? "− Detalhes" : "+ Detalhes"}
                                        </button>
                                    </th>
                                </tr>
                            </thead>

                            {showDetails && (
                                <tbody>
                                    {variaveis.map(([varName, desc]) => (
                                        <tr key={varName} className="border-t border-gray-200">
                                            <td className="px-4 py-2 font-medium text-black" style={{ width: "10%" }}>
                                                {varName === "Ktot" ? (
                                                    <>K<sub className="italic">tot</sub></>
                                                ) : varName === "Ckm" ? (
                                                    <>C<sub className="italic">km</sub></>
                                                ) : varName === "Cag" ? (
                                                    <>C<sub className="italic">ag</sub></>
                                                ) : varName === "Cfinal" ? (
                                                    <>C<sub className="italic">final</sub></>
                                                ) : varName === "Cadicional" ? (
                                                    <>C<sub className="italic">adicional</sub></>
                                                ) : (
                                                    varName
                                                )}
                                            </td>
                                            <td className="px-4 py-2 text-black">{desc}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            )}
                        </table>
                    </div>

                    {/* Formulário */}
                    <form onSubmit={calculaCusto} className="space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mx-auto">
                            <div className="mb-4">
                                <label htmlFor="cliente" className="block text-sm font-medium text-[#015084]">
                                    Cliente
                                </label>
                                <select
                                    style={{ color: "#015084" }}
                                    id="cliente"
                                    value={clienteSelecionado ?? ""}
                                    onChange={(e) => setClienteSelecionado(Number(e.target.value))}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                >
                                    <option value="">Selecione um cliente</option>
                                    {clientes.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.NomeFantasia}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {([
                                ["dataValidade", dataValidade, setDataValidade, "Data de Validade"],
                                ["observacoesInternas", observacoesInternas, setObservacoesInternas, "Observações Internas"],
                                ["localColeta", localColeta, setLocalColeta, "Local da Coleta"],
                                ["localEntrega", localEntrega, setLocalEntrega, "Local da Entrega"],
                                ["pesoEstimado", pesoEstimado, setPesoEstimado, "Peso estimado"],
                                ["tipoVeiculo", tipoVeiculo, setTipoVeiculo, "Tipo do veículo"],
                                ["V", V, setV, "Valor Mercadoria"],
                                ["Ktot", Ktot, setKtot, "Quilometragem Total"],
                                ["G", G, setG, "Taxa GRIS (decimal)"],
                                ["Ckm", Ckm, setCkm, "Custo Base por km"],
                                ["A", A, setA, "Taxa Ad Valorem (decimal)"],
                                ["Cag", Cag, setCag, "Custo Agregado por km"],
                                ["P", P, setP, "Total Pedágios"],
                                ["Cadicional", Cadicional, setCadicional, "Custo Adicional"],
                                ["R", R, setR, "Rentabilidade mínima (decimal)"],
                            ] as [string, string, (v: string) => void, string][]).map(
                                ([id, value, setter, label]) => (
                                    <InputLine
                                        key={id}
                                        type={id === "dataValidade" ? "date" : label.includes("Data") ? "datetime-local" :
                                            label.includes("Custo") ? "number" :
                                                label.includes("Taxa") ? "number" :
                                                    label.includes("Total") ? "number" :
                                                        label.includes("Valor") ? "number" :
                                                            "text"
                                        }
                                        id={id}
                                        htmlfor={id}
                                        placeholder=""
                                        value={value}
                                        onChange={handleChange(setter)}
                                    >
                                        <span className="text-[#015084]">{label}</span>
                                    </InputLine>
                                )
                            )}
                        </div>

                        <div className="pt-6 flex items-center justify-around gap-4">
                            <BotaoSubmit
                                loading={false}
                                label="Mostrar Resultado"
                                type="submit"
                                onClick={() => setShowCalculation(true)}
                                className="text-white font-semibold rounded-xl px-8 py-3 transition-all duration-300 shadow-md hover:shadow-lg"
                            />

                            {/* Botão que faz submit e envia para o backend */}
                            <BotaoSubmit
                                loading={loading}
                                label={loading ? "Enviando..." : "Salvar Cotação"}
                                type="button" // mantemos type button e chamamos função
                                onClick={enviarBackend}
                                className="text-white font-semibold rounded-xl px-8 py-3 transition-all duration-300 shadow-md hover:shadow-lg"
                            />
                        </div>
                    </form>

                    {/* Resultado */}
                    {showCalculation && resultado !== null && (
                        <div className="mt-8 p-6 bg-green-50 border border-green-400 rounded-xl text-black text-lg">
                            <h2 className="text-2xl font-bold mb-4 text-center">Resultados</h2>
                            <p><b>Valor cobrado do cliente:</b> R$ {resultados.Cfinal.toFixed(2)}</p>
                            <p><b>Custo do agregado:</b> R$ {resultados.custoAgregado.toFixed(2)}</p>
                            <p><b>Lucro:</b> R$ {resultados.lucro.toFixed(2)}</p>
                            <p><b>Rentabilidade obtida:</b> {(resultados.rentabilidadeFinal * 100).toFixed(2)}%</p>
                            <p><b>Custo adicional:</b> {resultados.cad.toFixed(2)}</p>
                        </div>
                    )}
                </div>
            </div >
        </div >
    );
}
