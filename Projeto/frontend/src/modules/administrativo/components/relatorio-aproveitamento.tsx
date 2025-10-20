import React, { useState, useEffect } from "react";
import api from "../../../services/api";

interface Evento {
  id: number;
  titulo: string;
  dataHora: string;
}

export default function RelatorioAproveitamento({ tituloInicial, dataInicial, onFechar }: RelatorioAproveitamentoProps) {
  const [titulo, setTitulo] = useState(tituloInicial);
  const [data, setData] = useState(dataInicial);
  const [objetivo, setObjetivo] = useState("");
  const [avaliacao, setAvaliacao] = useState(0);
  const [comentarios, setComentarios] = useState("");

  // Se o título e data não forem passados, buscar a partir da API
  useEffect(() => {
    if (!titulo || !data) {
      async function fetchEvento() {
        try {
          const response = await api.get<Evento[]>("/admin/events");
          if (response.data.length > 0) {
            const evento = response.data[0]; // Pega o primeiro evento
            setTitulo(evento.titulo);
            setData(evento.dataHora); // Pega a data
          }
        } catch (error) {
          console.error("Erro ao carregar dados do evento", error);
        }
      }

      fetchEvento();
    }
  }, [titulo, data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!titulo.trim()) {
      alert("O título do evento é obrigatório.");
      return;
    }

    if (!data.trim()) {
      alert("A data do evento é obrigatória.");
      return;
    }

    if (!objetivo.trim()) {
      alert("O objetivo da participação é obrigatório.");
      return;
    }

    if (avaliacao === 0) {
      alert("Por favor, faça uma avaliação do evento.");
      return;
    }

    console.log({
      titulo,
      data,
      objetivo,
      avaliacao,
      comentarios,
    });

    alert("Relatório enviado com sucesso!");
  };

  // Formatação da data para exibir de forma legível
  const formatarData = (data: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    const dataFormatada = new Date(data).toLocaleString("pt-BR", options);
    return dataFormatada;
  };

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
          {/* Exibindo o título do evento como texto */}
          <p className="text-lg font-semibold text-gray-800">{titulo}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data do evento
          </label>
          {/* Exibindo a data formatada */}
          <p className="text-lg font-semibold text-gray-800">{formatarData(data)}</p>
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
                className={`text-2xl ${avaliacao >= star ? "text-yellow-400" : "text-gray-300"}`}
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

        <button
          type="submit"
          style={{ backgroundColor: "#135b78" }}
          className="w-full text-white font-semibold py-2 rounded-lg hover:brightness-110"
        >
          Enviar Relatório
        </button>
      </form>
    </div>
  );
}
