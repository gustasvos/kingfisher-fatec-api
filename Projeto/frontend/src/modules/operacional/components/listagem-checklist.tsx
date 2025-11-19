import { useEffect, useState } from "react";
import Navbar from "../../../shared/components/navbar";
import instance from "./../../../services/api";
import { format } from "date-fns";
import Modal from "../../../shared/components/modal";
import FormAberturaPage from "../pages/form-abertura-page";
import FormFechamentoPage from "../pages/form-fechamento-page";
import CheckDiario from "./check-diario";
import CheckDiarioPage from "../pages/check-diario-page";
import CheckGestaoPage from "../pages/check-gestao-page";
import CheckManutencao from "../pages/form-manutencao-page"

type Checklist = {
  id: string;
  checklist: string;
  nome?: string;
  tipo?: string;
  timestamp: string;
  detalhes: Record<string, any>;
};

export default function ListagemChecklist() {
  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState<"diario" | "semanal" | "mensal">("diario");
  const [detalheAbertoId, setDetalheAbertoId] = useState<string | null>(null); // Apenas 1 aberto por vez

  const storedUser = localStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const userId = parsedUser?.id || "";
  const [abertoModal, setAbertoModal] = useState(false);
  const [conteudoModal, setConteudoModal] = useState<React.ReactNode>(null);

  const abrirModalAbertura = (e: React.MouseEvent) => {
    e.preventDefault()
    setConteudoModal(<FormAberturaPage />)
    setAbertoModal(true)
  }

  const abrirModalFechamento = (e: React.MouseEvent) => {
    e.preventDefault()
    setConteudoModal(<FormFechamentoPage/>)
    setAbertoModal(true)
  }
  
  const abrirModalDiario = (e: React.MouseEvent) => {
    e.preventDefault()
    setConteudoModal(<CheckDiarioPage/>)
    setAbertoModal(true)
  }

  const abrirModalGestao = (e: React.MouseEvent) => {
    e.preventDefault()
    setConteudoModal(<CheckGestaoPage/>)
    setAbertoModal(true)
  }

  const abrirModalManutencao = (e: React.MouseEvent) => {
    e.preventDefault()
    setConteudoModal(<CheckManutencao/>)
    setAbertoModal(true)
  }
  

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
                ...data.results[key].map((item: any, index: number) => ({
                  // ID único: checklist + index + timestamp
                  id: `${key}-${index}-${item.timestamp || new Date().toISOString()}`,
                  checklist: key,
                  timestamp:
                    item.timestamp ||
                    item["data-horario-encerramento"] ||
                    new Date().toISOString(),
                  detalhes: item,
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
    setDetalheAbertoId((prev) => (prev === id ? null : id)); // Apenas 1 aberto
  };

  return (
    <section className="bg-[#d4eeff] flex">
      <section>
        <Navbar />
      </section>

      <main className="w-screen p-8 ml-[80px] max-h-screen overflow-auto text-black">
        {/* Seção de formulários disponíveis */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-black mb-2">Formulários disponíveis</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { nome: "Checklist Veículo", link: "/check-veiculo", copiar: true },
              { nome: "Checklist Moto", link: "/check-moto", copiar: true },
              { nome: "Checklist Diário", acao:abrirModalDiario, copiar: false },
              { nome: "Formulário de Abertura", acao: abrirModalAbertura, copiar: false },
              { nome: "Formulário de Fechamento", acao:abrirModalFechamento, copiar: false },
              { nome: "Checklist Gestão de Coleta", acao:abrirModalGestao, copiar: false },              
              { nome: "Formulário de manutenção predial", acao:abrirModalManutencao, copiar: false },              
            ].map((form) => (
              <div
                key={form.link}
                className="flex justify-between items-center bg-white rounded-[15px] px-4 py-3 shadow-md"
              >
                <span className="font-medium text-black">{form.nome}</span>

                {form.copiar ? (
                  <button
                    onClick={() => {
                      const fullUrl = `${window.location.origin}${form.link}`;
                      navigator.clipboard.writeText(fullUrl);
                      alert(`Link copiado: ${fullUrl}`);
                    }}
                    className="bg-[#007bff] hover:bg-[#005fcc] text-white px-3 py-1 rounded text-sm"
                  >
                    Copiar link
                  </button>
                ) : form.acao ? ( 
                    <button
                      onClick={form.acao}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm text-center"
                    >
                      Abrir formulário
                    </button>
                  ) : (
                    <a
                      href={form.link}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm text-center"
                    >
                      Abrir página
                    </a>
                  )}
              </div>
            ))}
          </div>
        </div>

        {/* Seção dos checklists */}
        <h1 className="text-2xl font-bold mb-4 text-black">Meus Checklists</h1>

        <div className="flex gap-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${filtro === "diario"
              ? "bg-[#007bff] text-white"
              : "bg-white text-black border border-gray-300"
              }`}
            onClick={() => setFiltro("diario")}
          >
            Hoje
          </button>
          <button
            className={`px-4 py-2 rounded ${filtro === "semanal"
              ? "bg-[#007bff] text-white"
              : "bg-white text-black border border-gray-300"
              }`}
            onClick={() => setFiltro("semanal")}
          >
            Semana
          </button>
          <button
            className={`px-4 py-2 rounded ${filtro === "mensal"
              ? "bg-[#007bff] text-white"
              : "bg-white text-black border border-gray-300"
              }`}
            onClick={() => setFiltro("mensal")}
          >
            Mês
          </button>
        </div>

        {loading ? (
          <p className="text-black">Carregando...</p>
        ) : (
          <div className="rounded-[15px] shadow-md bg-white">
            {/* Cabeçalho da tabela */}
            <div className="border-b border-gray-300 px-4 py-2 grid grid-cols-5 gap-4 text-left font-bold text-black bg-[#e7f4ff] rounded-t-[15px]">
              <div>Checklist</div>
              <div>Data de envio</div>
              <div>Detalhes</div>
            </div>

            {/* Linhas da tabela */}
            {checklistsFiltrados.map((c, idx) => (
              <div
                key={c.id}
                className={`border-b border-gray-200 ${idx % 2 === 0 ? "bg-[#f8fbff]" : "bg-white"
                  }`}
              >
                <div className="grid grid-cols-5 gap-4 px-4 py-2 text-left text-black">
                  <div>{c.checklist}</div>
                  <div>{format(new Date(c.timestamp), "dd/MM/yyyy HH:mm")}</div>
                  <div>
                    <button
                      className="text-[#007bff] underline"
                      onClick={() => toggleDetalhes(c.id)}
                    >
                      {detalheAbertoId === c.id ? "Ocultar" : "Ver detalhes"}
                    </button>
                  </div>
                </div>

                {detalheAbertoId === c.id && (
                  <div className="px-6 py-2 text-sm space-y-1 text-black bg-[#f0f8ff]">
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
              <p className="p-4 text-black">Nenhum checklist encontrado.</p>
            )}
          </div>
        )}
      </main>
      <Modal aberto={abertoModal} onFechar={() => setAbertoModal(false)}>
        {conteudoModal}
      </Modal>
    </section>
  );
}

function getWeekNumber(d: Date) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}
