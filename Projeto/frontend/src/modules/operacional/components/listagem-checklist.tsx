import { useEffect, useState } from "react";
import Navbar from "../../../shared/components/navbar";
import instance from "./../../../services/api";
import { format } from "date-fns";

type Checklist = {
    id: string;
    checklist: string;
    nome: string;
    tipo: string;
    timestamp: string;
    detalhes: Record<string, any>;
};

export default function ListagemChecklist() {
    const [checklists, setChecklists] = useState<Checklist[]>([]);
    const [loading, setLoading] = useState(true);
    const [filtro, setFiltro] = useState<"diario" | "semanal" | "mensal">("diario");
    const [detalhesAbertos, setDetalhesAbertos] = useState<Record<string, boolean>>({});

    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    const userId = parsedUser?.id || "";

    useEffect(() => {
        if (!userId) return;

        setLoading(true);

        instance
            .get(`/consulta/${userId}`)
            .then((res) => {
                const data = res.data;
                const listaChecklists: Checklist[] = [];

                if (data?.results) {
                    for (const key in data.results) {
                        if (Array.isArray(data.results[key])) {
                            listaChecklists.push(
                                ...data.results[key].map((item: any) => ({
                                    id: item["id-usuario"] || item.id || key,
                                    checklist: key,
                                    nome: item["nome-motorista"] || item.nome || "",
                                    tipo: "Diário",
                                    timestamp: item.timestamp || item["data-horario-encerramento"] || new Date().toISOString(),
                                    detalhes: item
                                }))
                            );
                        }
                    }
                }

                setChecklists(listaChecklists);
            })
            .catch((err) => console.error("Erro ao buscar checklists:", err))
            .finally(() => setLoading(false));
    }, [userId]);

    const checklistsFiltrados = checklists.filter((c) => {
        if (!c.timestamp) return false;

        const dataEnvio = new Date(c.timestamp);
        const hoje = new Date();
        let resultado = false;

        switch (filtro) {
            case "diario":
                resultado =
                    dataEnvio.getDate() === hoje.getDate() &&
                    dataEnvio.getMonth() === hoje.getMonth() &&
                    dataEnvio.getFullYear() === hoje.getFullYear();
                break;
            case "semanal":
                resultado = getWeekNumber(dataEnvio) === getWeekNumber(hoje);
                break;
            case "mensal":
                resultado =
                    dataEnvio.getMonth() === hoje.getMonth() &&
                    dataEnvio.getFullYear() === hoje.getFullYear();
                break;
            default:
                resultado = true;
        }

        return resultado;
    });

    const toggleDetalhes = (id: string) => {
        setDetalhesAbertos((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <>
            <Navbar />
            <main className="p-8">
                <h1 className="text-2xl font-bold mb-4 text-blue-900">Meus Checklists</h1>

                <div className="flex gap-4 mb-4">
                    <button
                        className={`px-4 py-2 rounded ${filtro === "diario" ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-900"
                            }`}
                        onClick={() => setFiltro("diario")}
                    >
                        Hoje
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${filtro === "semanal" ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-900"
                            }`}
                        onClick={() => setFiltro("semanal")}
                    >
                        Semana
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${filtro === "mensal" ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-900"
                            }`}
                        onClick={() => setFiltro("mensal")}
                    >
                        Mês
                    </button>
                </div>

                {loading ? (
                    <p className="text-blue-900">Carregando...</p>
                ) : (
                    <div className="rounded-md shadow-md">
                        {/* Cabeçalho da tabela */}
                        <div className="border-b border-blue-300 px-4 py-2 grid grid-cols-5 gap-4 text-left font-bold text-blue-900 bg-blue-200 rounded-t-md">
                            <div>Checklist</div>
                            <div>Nome do colaborador</div>
                            <div>Tipo</div>
                            <div>Data de envio</div>
                            <div>Detalhes</div>
                        </div>

                        {/* Linhas da tabela */}
                        {checklistsFiltrados.map((c, idx) => (
                            <div
                                key={c.id}
                                className={`border-b border-blue-300 ${idx % 2 === 0 ? "bg-blue-50" : "bg-blue-100"}`}
                            >
                                <div className="grid grid-cols-5 gap-4 px-4 py-2 text-left text-blue-900">
                                    <div>{c.checklist}</div>
                                    <div>{c.nome}</div>
                                    <div>{c.tipo}</div>
                                    <div>{format(new Date(c.timestamp), "dd/MM/yyyy HH:mm")}</div>
                                    <div>
                                        <button
                                            className="text-blue-600 underline"
                                            onClick={() => toggleDetalhes(c.id)}
                                        >
                                            {detalhesAbertos[c.id] ? "Ocultar" : "Ver detalhes"}
                                        </button>
                                    </div>
                                </div>

                                {detalhesAbertos[c.id] && (
                                    <div className="px-6 py-2 text-sm space-y-1 text-blue-900 bg-blue-50">
                                        {c.detalhes &&
                                            Object.entries(c.detalhes).map(([key, value]) => (
                                                <div key={key}>
                                                    <strong>{key}:</strong> {String(value)}
                                                </div>
                                            ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {checklistsFiltrados.length === 0 && (
                            <p className="p-4 text-blue-900">Nenhum checklist encontrado.</p>
                        )}
                    </div>
                )}
            </main>
        </>
    );
}

// Função utilitária para número da semana
function getWeekNumber(d: Date) {
    const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    return Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}
