import React, { useState } from "react";

export default function RelatorioAproveitamento() {
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");
  const [objetivo, setObjetivo] = useState(""); 
  const [avaliacao, setAvaliacao] = useState(0);
  const [comentarios, setComentarios] = useState("");

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

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Relatório de Aproveitamento
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título do evento
          </label>
          <input
            type="text"
            placeholder="Digite o título do evento"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300 text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data do evento
          </label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300 text-black"
          />
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
