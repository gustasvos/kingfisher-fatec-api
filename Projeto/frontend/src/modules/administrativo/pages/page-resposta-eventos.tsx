import React, { useEffect, useState } from "react";
import Navbar from "../../../shared/components/navbar";
import axios from "axios";

type Relatorio = {
  id: number;
  nome?: string;
  setor?: string;
  enviado?: boolean;
};

const Relatorios: React.FC = () => {
  const [relatorios, setRelatorios] = useState<Relatorio[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [busca, setBusca] = useState("");
  const [filtroEnviado, setFiltroEnviado] = useState<
    "todos" | "enviado" | "nao_enviado"
  >("todos");

  useEffect(() => {
    const fetchRelatorios = async () => {
      try {
        const res = await axios.get("http://localhost:8080/admin/events/respostas/1");

        console.log("✅ Resposta da API:", res.data);

        const dados = Array.isArray(res.data)
          ? res.data
          : res.data?.data || [];

        setRelatorios(dados);
      } catch (err: any) {
        console.error("Erro ao buscar relatórios:", err);
        if (axios.isAxiosError(err)) {
          setErro(err.response?.data?.message || "Erro ao buscar relatórios");
        } else {
          setErro("Erro inesperado ao buscar relatórios");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRelatorios();
  }, []);

  const relatoriosFiltrados = (relatorios || []).filter((r) => {
    const nome = r.nome || "";
    const nomeMatch = nome.toLowerCase().includes(busca.toLowerCase());
    const filtroMatch =
      filtroEnviado === "todos"
        ? true
        : filtroEnviado === "enviado"
        ? r.enviado
        : !r.enviado;
    return nomeMatch && filtroMatch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#eaf5fb] text-[#156970] text-lg">
        Carregando relatórios...
      </div>
    );
  }

  if (erro) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#eaf5fb] text-red-600 text-lg">
        {erro}
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#eaf5fb]">
      <Navbar />

      <main className="flex-1 p-10 overflow-y-auto">
        <div className="flex flex-wrap gap-4 mb-10">
          <input
           type="text"
           placeholder="Pesquisar..."
           value={busca}
           onChange={(e) => setBusca(e.target.value)}
            className="flex-1 min-w-[250px] px-4 py-2 rounded-md border border-[#9aa7ad]
             bg-[#f3fbfd] text-[#0f5260] placeholder-[#9aa7ad]
             focus:outline-none focus:ring-2 focus:ring-[#156970] focus:border-transparent
             transition-colors"
        />

          <button
            onClick={() =>
              setFiltroEnviado((prev) =>
                prev === "todos"
                  ? "enviado"
                  : prev === "enviado"
                  ? "nao_enviado"
                  : "todos"
              )
            }
            className="bg-[#156970] text-white px-4 py-2 rounded-md shadow-sm 
                       hover:bg-[#0f5260] transition"
          >
            {filtroEnviado === "todos"
              ? "Mostrar: Todos"
              : filtroEnviado === "enviado"
              ? "Mostrar: Enviados"
              : "Mostrar: Não Enviados"}
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {relatoriosFiltrados.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-lg shadow-md p-6 flex justify-between items-center
                         border border-gray-200 hover:shadow-lg transition"
            >
              <div>
                <h3 className="text-lg font-semibold text-[#0f5260]">
                  {r.nome || "Sem nome"}
                </h3>
                <p className="text-[#9aa7ad]">{r.setor || "Sem setor"}</p>
              </div>

              <button
                className="bg-[#156970] text-white px-6 py-2 rounded-md hover:bg-[#0f5260] transition"
                onClick={() => console.log("Visualizar relatório:", r.id)}
              >
                Visualizar Relatório
              </button>
            </div>
          ))}

          {relatoriosFiltrados.length === 0 && (
            <p className="text-center text-[#9aa7ad] text-sm mt-6">
              Nenhum relatório encontrado.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Relatorios;