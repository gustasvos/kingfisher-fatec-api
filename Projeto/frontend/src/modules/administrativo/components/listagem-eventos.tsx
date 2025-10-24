import { useEffect, useState } from "react";
import Navbar from "../../../shared/components/navbar";
import instance from "../../../services/api";
import Loading from "../../../shared/components/loading";
import Modal from "../../../shared/components/modal";
import EventoDetalhe from "./eventoDetalhe";
import RelatorioAproveitamento from "./relatorio-aproveitamento";

interface Evento {
  id: number;
  titulo: string;
  descricao?: string;
  localizacao: string;
  dataHora: string;
  participantes: {
    idConvite: number;
    funcionario: {
      id: number;
      nome: string;
      email: string;
    };
    status: string;
    motivo: string | null;
    criadoEm: string;
  }[];
}

export default function ListagemEventos() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [abertoModal, setAbertoModal] = useState(false);
  const [conteudoModal, setConteudoModal] = useState<React.ReactNode>(null);

  const userId = localStorage.getItem("userId");

  // Função para abrir o modal conforme o status do convite
  const abrirModalEvento = async(evento: Evento) => {
    const convite = evento.participantes.find(
      (p) => p.funcionario.id === parseInt(userId || "")
    );

    if (!convite) return;

    switch (convite.status.toUpperCase()) {
      case "PENDENTE":
        setConteudoModal(
          <EventoDetalhe
            evento={evento}
            onFechar={() => setAbertoModal(false)}
          />
        );
        break;

      case "CONFIRMADO":
      case "APROVADO":
        setConteudoModal(
          <RelatorioAproveitamento
            tituloInicial={evento.titulo}
            dataInicial={evento.dataHora}
            onFechar={() => setAbertoModal(false)}
          />
        );
        break;

      default:
        // Ignora recusado ou outros
        setConteudoModal(
          <p className="text-gray-700 p-4">
            Este evento não está disponível para você.
          </p>
        );
        break;
    }

    setAbertoModal(true);
  };

  // Buscar eventos e filtrar recusados
  const fetchEventos = async (userId: string) => {
    try {
      const res = await instance.get("/admin/events");
      const eventosFiltrados = res.data.filter((e: Evento) =>
        e.participantes.some(
          (p) => p.funcionario.id === parseInt(userId) && p.status !== "RECUSADO"
        )
      );
      setEventos(eventosFiltrados);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar eventos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchEventos(userId);
    } else {
      setError("Usuário não encontrado.");
      setLoading(false);
    }
  }, [userId]);

  const formatarDataHora = (data: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return new Date(data).toLocaleString("pt-BR", options);
  };

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  const eventosFiltrados = eventos
    .filter(
      (e) =>
        e.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.localizacao.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((e) => ({ ...e, dataHora: formatarDataHora(e.dataHora) }));

  return (
    <>
      <Navbar />
      <main className="p-8 min-h-screen bg-[#d8ecf3]">
        <form className="w-full mb-8" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Pesquisar evento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-3 rounded-full border border-[#9aa7ad]
               bg-[#f3fbfd] text-[#0f5260] placeholder-[#9aa7ad]
               focus:outline-none focus:ring-2 focus:ring-[#0f5260] focus:border-transparent
               transition-colors text-lg"
          />
        </form>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {eventosFiltrados.length > 0 ? (
            eventosFiltrados.map((evento) => (
              <div
                key={evento.id}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {evento.titulo}
                  </h2>

                  {evento.descricao && (
                    <p className="text-gray-700 mb-4">{evento.descricao}</p>
                  )}

                  <div className="flex flex-col gap-2 mt-2">
                    <div className="flex items-center gap-2 text-gray-800">
                      <span>{evento.localizacao}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-800">
                      <span>{evento.dataHora}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => abrirModalEvento(evento)}
                  className="mt-6 bg-[#135b78] hover:bg-[#114a5f] text-white px-4 py-2 rounded-lg shadow transition-all duration-200 w-full"
                >
                  Preencher
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-full">
              Nenhum evento encontrado.
            </p>
          )}
        </div>
      </main>

      <Modal aberto={abertoModal} onFechar={() => setAbertoModal(false)}>
        {conteudoModal}
      </Modal>
    </>
  );
}
