import { useEffect, useState, useCallback } from "react";
import Navbar from "../../../shared/components/navbar";
import instance from "../../../services/api";
import Loading from "../../../shared/components/loading";
import Modal from "../../../shared/components/modal";
import EventoDetalhe from "./eventoDetalhe";
import RelatorioAproveitamento from "./relatorio-aproveitamento";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

interface Evento {
  id: number;
  conviteId: number;
  titulo: string;
  descricao?: string;
  localizacao: string;
  dataHora: string; // Manter como string ISO
  statusConvite?: string;
  motivo?: string | null;
}

export default function ListagemEventos() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [abertoModal, setAbertoModal] = useState(false);
  const [conteudoModal, setConteudoModal] = useState<React.ReactNode>(null);;
  const userString = localStorage.getItem("user");
  const userId = userString ? JSON.parse(userString).id : null;
  const navigate = useNavigate();

  // Função para fechar o modal e atualizar a lista
  const fecharModalEAtualizar = useCallback(() => {
    setAbertoModal(false);
    if (userId) {
      fetchEventos(userId);
    }
  }, [userId]);

  // Buscar eventos do usuário
  const fetchEventos = useCallback(async (currentUserId: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await instance.get(`/admin/events/convidado/${currentUserId}`);
      console.log("Convites recebidos da API:", res.data);

      // Se não vier nenhum evento, apenas limpa a lista e sai
      if (!res.data || res.data.length === 0) {
        navigate("/eventos");
        return;
      }

      // Mapeia os dados recebidos para a interface Evento
      const eventosMapeados = res.data.map((convite: any) => ({
        ...convite.evento,
        conviteId: convite.idConvite,
        statusConvite: convite.status,
        motivo: convite.motivo,
      }));

      setEventos(eventosMapeados);
    } catch (error: unknown) {
      console.error("Erro ao buscar eventos:", error);
      // Se for 404, redireciona para a página de eventos
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          navigate("/eventos");
          alert("Nenhum evento encontrado para este usuário.");
          return;
        }
      }
      setError("Erro ao carregar eventos.");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Abrir modal conforme status do convite
  const abrirModalEvento = (evento: Evento) => {
    const status = evento.statusConvite?.toUpperCase() || "";

    switch (status) {
      case "PENDENTE":
        setConteudoModal(
          <EventoDetalhe
            eventoId={evento.id}
            conviteId={evento.conviteId}
            onFechar={fecharModalEAtualizar}
            statusConvite={evento.statusConvite}
            motivoConvite={evento.motivo}
          />
        );
        break;

      case "CONFIRMADO":
      case "APROVADO":
        setConteudoModal(
          <RelatorioAproveitamento
            eventoId={evento.id}
            tituloInicial={evento.titulo}
            dataInicial={evento.dataHora}
            onFechar={() => setAbertoModal(false)}
          />
        );
        break;

      case "RECUSADO":
        setConteudoModal(
          <EventoDetalhe
            eventoId={evento.id}
            conviteId={evento.conviteId}
            onFechar={() => setAbertoModal(false)}
            statusConvite={evento.statusConvite}
            motivoConvite={evento.motivo}
          />
        );
        break;

      default:
        setConteudoModal(
          <EventoDetalhe
            eventoId={evento.id}
            conviteId={evento.conviteId}
            onFechar={fecharModalEAtualizar}
            statusConvite={evento.statusConvite}
            motivoConvite={evento.motivo}
          />
        );
        break;
    }

    setAbertoModal(true);
  };

  useEffect(() => {
    if (userId) {
      fetchEventos(userId);
    } else {
      setError("Usuário não encontrado.");
      setLoading(false);
    }
  }, [userId, fetchEventos]);

  // Formata a data para exibição
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

  // Define cor do status
  const getStatusColor = (status: string | undefined) => {
    switch (status?.toUpperCase()) {
      case "CONFIRMADO":
      case "APROVADO":
        return "text-green-600 font-bold";
      case "RECUSADO":
        return "text-red-600 font-bold";
      case "PENDENTE":
        return "text-yellow-600 font-bold";
      default:
        return "text-gray-500";
    }
  };

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  const eventosFiltrados = eventos.filter(
    (e) =>
      e.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.localizacao.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-[#135b78]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 0v10m0 0l-4-4m4 4l4-4"
                        />
                      </svg>
                      <span>{evento.localizacao}</span>
                    </div>

                    {/* Data */}
                    <div className="flex items-center gap-2 text-gray-800">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-[#135b78]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>{formatarDataHora(evento.dataHora)}</span>
                    </div>

                    <div className="mt-2">
                      <span className="text-sm font-semibold text-gray-700">
                        Status:{" "}
                      </span>
                      <span className={`text-sm ${getStatusColor(evento.statusConvite)}`}>
                        {evento.statusConvite || "PENDENTE"}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => abrirModalEvento(evento)}
                  className="mt-6 bg-[#135b78] hover:bg-[#114a5f] text-white px-4 py-2 rounded-lg shadow transition-all duration-200 w-full"
                >
                  {evento.statusConvite === "PENDENTE"
                    ? "Responder Convite"
                    : "Ver Detalhes"}
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

      <Modal aberto={abertoModal} onFechar={fecharModalEAtualizar}>
        {conteudoModal}
      </Modal>
    </>
  );
}
