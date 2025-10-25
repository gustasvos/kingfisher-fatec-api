import React, { useState, useEffect } from "react";
import instance from "../../../services/api";

interface Evento {
  id: number;
  titulo: string;
  dataHora: string;
}

interface RelatorioAproveitamentoProps {
  tituloInicial?: string;
  dataInicial?: string;
  onFechar?: () => void;
}

export default function RelatorioAproveitamento({
  tituloInicial,
  dataInicial,
  onFechar,
}: RelatorioAproveitamentoProps) {
  const [evento, setEvento] = useState<Evento | null>(null);
  const [objetivo, setObjetivo] = useState("");
  const [avaliacao, setAvaliacao] = useState(0);
  const [comentarios, setComentarios] = useState("");
  const [respostaEnviada, setRespostaEnviada] = useState(false);

  const userId = localStorage.getItem("userId");

  // Buscar evento se título/data não forem passados
  useEffect(() => {
    async function fetchEvento() {
      try {
        const response = await instance.get<Evento[]>("/admin/events");
        if (response.data.length > 0) {
          const ev = response.data[0]; // pegar primeiro evento como exemplo
          setEvento(ev);
        }
      } catch (error) {
        console.error("Erro ao carregar dados do evento", error);
      }
    }

    if (!tituloInicial || !dataInicial) {
      fetchEvento();
    } else {
      setEvento({ id: 0, titulo: tituloInicial, dataHora: dataInicial });
    }
  }, [tituloInicial, dataInicial]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!evento) {
      alert("Evento não carregado.");
      return;
    }

    if (!userId) {
      alert("Usuário não logado!");
      return;
    }

    if (!objetivo.trim()) {
      alert("O objetivo da participação é obrigatório.");
      return;
    }

    if (avaliacao < 1 || avaliacao > 5) {
      alert("Por favor, faça uma avaliação do evento.");
      return;
    }

    try {
      await instance.post(
        `/admin/events/respostas/${evento.id}/participante/${userId}`,
        {
          titulo_evento: evento.titulo,
          objetivo,
          comentarios,
          avaliacao,
        }
      );

      setRespostaEnviada(true);
      alert("Relatório enviado com sucesso!");
    } catch (err: any) {
      console.error(err);
      if (err.response?.status === 409) {
        alert("Você já respondeu a este evento.");
        setRespostaEnviada(true);
      } else {
        alert("Erro ao enviar relatório.");
      }
    }
  };

  const formatarData = (data: string) => {
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

  if (!evento) return <p>Carregando evento...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10 w-[80vw] v-[50vh]">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Relatório de Aproveitamento
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título do evento
          </label>
          <p className="text-lg font-semibold text-gray-800">{evento.titulo}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data do evento
          </label>
          <p className="text-lg font-semibold text-gray-800">
            {formatarData(evento.dataHora)}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Objetivo da participação
          </label>
          <textarea
            placeholder="Descreva porque participou do evento e qual era a expectativa"
            value={objetivo}
            onChange={(e) => setObjetivo(e.target.value)}
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300 text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Avaliação geral do evento
          </label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setAvaliacao(star)}
                className={`text-2xl ${
                  avaliacao >= star ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Comentários
          </label>
          <textarea
            placeholder="Digite seus comentários"
            value={comentarios}
            onChange={(e) => setComentarios(e.target.value)}
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300 text-black"
          />
        </div>

        {!respostaEnviada && (
          <button
            type="submit"
            style={{ backgroundColor: "#135b78" }}
            className="w-full text-white font-semibold py-2 rounded-lg hover:brightness-110"
          >
            Enviar Relatório
          </button>
        )}

        {respostaEnviada && <p className="text-green-600 font-semibold">Você já respondeu a este evento.</p>}
      </form>
    </div>
  );
}
