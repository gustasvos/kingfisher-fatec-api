import React, { useEffect, useState } from "react";
import Navbar from "../../../shared/components/navbar";
import axios from "axios";

type Relatorio = {
  id: number;
  nome: string;
  setor?: string;
  enviado: boolean;
  eventoTitulo?: string;
};

type DetalhesRelatorio = {
  id: number;
  titulo: string;
  descricao?: string;
  dataEnvio?: string;
  setor?: string;
  enviado: boolean;
  objetivo?: string;
  avaliacao?: number;
};

const formatarData = (data: string | undefined): string => {
  if (!data) return "Não disponível";
  const dataParte = data.split('T')[0];
  const partes = dataParte.split('-');

  if (partes.length === 3) {
    const [ano, mes, dia] = partes;
    return `${dia}/${mes}/${ano}`;
  }
  return dataParte;
};

const FiltroDropdown: React.FC<{
  filtro: "todos" | "enviado" | "nao_enviado";
  setFiltro: (value: "todos" | "enviado" | "nao_enviado") => void;
}> = ({ filtro, setFiltro }) => {
  const [aberto, setAberto] = useState(false);

  const opcoes = [
    { label: "Todos", value: "todos" },
    { label: "Enviados", value: "enviado" },
    { label: "Não Enviados", value: "nao_enviado" },
  ];

  return (
    <div className="relative">
      <div
        className="bg-[#0f5260] text-white px-4 py-2 rounded-full cursor-pointer shadow-sm hover:bg-[#156970] flex items-center justify-between min-w-[150px]"
        onClick={() => setAberto(!aberto)}
      >
        <span className="capitalize">
          {opcoes.find((o) => o.value === filtro)?.label}
        </span>
        <span className="ml-2">▾</span>
      </div>

      {aberto && (
        <div className="absolute mt-2 w-full bg-[#0f5260] rounded-xl shadow-lg overflow-hidden z-20">
          {opcoes.map((o) => (
            <div
              key={o.value}
              className={`px-4 py-2 cursor-pointer text-white hover:bg-[#156970] ${o.value === filtro ? "font-semibold" : "font-normal"
                }`}
              onClick={() => {
                setFiltro(o.value as "todos" | "enviado" | "nao_enviado");
                setAberto(false);
              }}
            >
              {o.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Modal: React.FC<{
  aberto: boolean;
  onClose: () => void;
  relatorio?: DetalhesRelatorio | null;
  carregando: boolean;
}> = ({ aberto, onClose, relatorio, carregando }) => {
  if (!aberto) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity">
      <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-xl"
        >
          ✕
        </button>

        {carregando ? (
          <div className="flex justify-center items-center h-40 text-[#156970] font-semibold">
            Carregando...
          </div>
        ) : relatorio ? (
          <>
            <h2 className="text-xl font-semibold text-[#0f5260] mb-4">
              {relatorio.titulo}
            </h2>
            <p className="text-gray-600 mb-2">
              <strong>Data do Evento:</strong> {formatarData(relatorio.dataEnvio)}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Objetivo:</strong> {relatorio.objetivo || "Não informado"}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Avaliação:</strong>{" "}
              {relatorio.avaliacao ? `${relatorio.avaliacao}/5` : "Sem avaliação"}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Comentários:</strong> {relatorio.descricao || "Sem comentários."}
            </p>
          </>

        ) : (
          <div className="text-gray-500">
            Não foi possível carregar o relatório.
          </div>
        )}
      </div>
    </div>
  );
};

const Relatorios: React.FC = () => {
  const [relatorios, setRelatorios] = useState<Relatorio[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [busca, setBusca] = useState("");
  const [filtroEnviado, setFiltroEnviado] = useState<
    "todos" | "enviado" | "nao_enviado"
  >("todos");

  const [modalAberto, setModalAberto] = useState(false);
  const [detalhes, setDetalhes] = useState<DetalhesRelatorio | null>(null);
  const [carregandoModal, setCarregandoModal] = useState(false);

  useEffect(() => {
    const fetchRelatorios = async () => {
      try {
        const res = await axios.get("http://localhost:8080/admin/events/respostas");
        const dados = Array.isArray(res.data) ? res.data : res.data?.data || [];

        const mapeados = dados.map((d: any) => ({
          id: d.id,
          nome: d.usuario?.nome || "Sem nome",
          setor: d.usuario?.setor || "Sem setor",
          eventoTitulo: d.evento?.titulo || "Evento",
          enviado: d.status === "enviado" || d.enviado === true,
        }));

        setRelatorios(mapeados);
      } catch (err) {
        console.error(err);
        setErro("Erro ao buscar relatórios");
      } finally {
        setLoading(false);
      }
    };

    fetchRelatorios();
  }, []);

  const abrirModal = async (id: number) => {
    setModalAberto(true);
    setCarregandoModal(true);
    setDetalhes(null);

    try {
      const res = await axios.get(
        `http://localhost:8080/admin/events/respostas/${id}`
      );

      const d = res.data;
      const detalhesMapeado: DetalhesRelatorio = {
        id: d.id,
        titulo: d.evento?.titulo || d.titulo_evento || "Sem título",
        descricao: d.comentarios || "Sem comentários.",
        dataEnvio: d.dataEvento || d.evento?.dataHora || "Não disponível",
        setor: d.usuario?.setor || "Não informado",
        enviado: true,
        objetivo: d.objetivo || "",
        avaliacao: d.avaliacao || null,
      };



      setDetalhes(detalhesMapeado);
    } catch (err) {
      console.error(err);
      setDetalhes(null);
    } finally {
      setCarregandoModal(false);
    }
  };

  const relatoriosFiltrados = relatorios.filter((r) => {
    const nome = r.nome.toLowerCase();
    const nomeMatch = nome.includes(busca.toLowerCase());
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
    <div className="flex h-screen bg-slate-50 relative">
      <Navbar />

      <main className="flex-1 p-10 overflow-y-auto">
        <div className="flex flex-wrap gap-4 mb-10">
          <input
            type="text"
            placeholder="Pesquisar..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="flex-1 min-w-[250px] px-4 py-2 rounded-full border border-[#9aa7ad]
                        text-[#0f5260] placeholder-[#9aa7ad]
                       focus:outline-none focus:ring-2 focus:ring-[#0f5260] focus:border-transparent
                       transition-colors"
          />

          <FiltroDropdown filtro={filtroEnviado} setFiltro={setFiltroEnviado} />
        </div>

        <div className="flex flex-col gap-6">
          {relatoriosFiltrados.map((r) => (
            <div
              key={r.id}
              className="bg-white/90 rounded-xl shadow-md p-6 flex justify-between items-center border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div>
                <h3 className="text-lg font-semibold text-[#0f5260]">
                  {r.nome}
                </h3>
                <p className="text-[#9aa7ad]">{r.setor}</p>
                <p className="text-sm text-[#0f5260]">
                  Evento: {r.eventoTitulo}
                </p>
              </div>

              <button
                onClick={() => abrirModal(r.id)}
                className="bg-[#0f5260] text-white px-6 py-2 rounded-full hover:bg-[#156970] transition-colors"
              >
                Visualizar
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

      <Modal
        aberto={modalAberto}
        onClose={() => setModalAberto(false)}
        relatorio={detalhes}
        carregando={carregandoModal}
      />
    </div>
  );
};

export default Relatorios;
