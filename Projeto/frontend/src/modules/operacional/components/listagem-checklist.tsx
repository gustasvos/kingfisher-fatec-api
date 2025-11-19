import { useEffect, useState, useMemo } from "react";
import Navbar from "../../../shared/components/navbar";
import instance from "./../../../services/api";
import { format } from "date-fns";
import Modal from "../../../shared/components/modal";
import FormAberturaPage from "../pages/form-abertura-page";
import FormFechamentoPage from "../pages/form-fechamento-page";
import CheckDiarioPage from "../pages/check-diario-page";
import CheckGestaoPage from "../pages/check-gestao-page";

type Checklist = {
  id: string;
  checklist: string;
  nome?: string;
  tipo?: string;
  timestamp: string;
  detalhes: Record<string, any>;
};

const CHECKLIST_TIPO_OPCOES = [
  { value: '', label: 'Todos os Tipos' },
  { value: 'Checklist Diário - Frota Newe', label: 'Checklist Diário' },
  { value: 'Formulário de abertura', label: 'Form. Abertura' },
  { value: 'Formulário de fechamento', label: 'Form. Fechamento' },
  { value: 'formsGestaoColetaSchema', label: 'Checklist Gestão' },
]

export default function ListagemChecklist() {
  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const [loading, setLoading] = useState(true);
  const [detalheAbertoId, setDetalheAbertoId] = useState<string | null>(null); // Apenas 1 aberto por vez

  const storedUser = localStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const userId = parsedUser?.id || "";
  const [abertoModal, setAbertoModal] = useState(false);
  const [conteudoModal, setConteudoModal] = useState<React.ReactNode>(null);
  const [filtroTipo, setFiltroTipo] = useState<string>('')

  const abrirModalAbertura = (e: React.MouseEvent) => {
    e.preventDefault()
    setConteudoModal(<FormAberturaPage />)
    setAbertoModal(true)
  }

  const abrirModalFechamento = (e: React.MouseEvent) => {
    e.preventDefault()
    setConteudoModal(<FormFechamentoPage />)
    setAbertoModal(true)
  }

  const abrirModalDiario = (e: React.MouseEvent) => {
    e.preventDefault()
    setConteudoModal(<CheckDiarioPage />)
    setAbertoModal(true)
  }

  const abrirModalGestao = (e: React.MouseEvent) => {
    e.preventDefault()
    setConteudoModal(<CheckGestaoPage />)
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

  const checklistsFiltrados = useMemo(() => {
    return checklists.filter((c) => {

      const matchesTipo = filtroTipo === '' || c.checklist === filtroTipo

      return matchesTipo
    })
  }, [checklists, filtroTipo])

  const toggleDetalhes = (id: string) => {
    setDetalheAbertoId((prev) => (prev === id ? null : id)); // Apenas 1 aberto
  };

  console.log('Tipos recebidos:', checklists.map(c => c.checklist))

  const labels: Record<string, string> = {
    "id-usuario": "ID do Usuário",
    "cpf-usuario": "CPF do Usuário",
    "timestamp": "Data/Hora de Envio",
    "nome-motorista": "Motorista",
    "placa-veiculo": "Placa do Veículo",
    "km-inicial": "KM Inicial",
    "destino": "Destino",
    "km-final": "KM Final",
    "teve-abastecimento": "Teve Abastecimento",
    "comprovante-enviado": "Comprovante Enviado",
    "oleo-motor-ok": "Óleo do Motor",
    "reservatorio-agua-ok": "Reservatório de Água",
    "sistema-eletrico-ok": "Sistema Elétrico",
    "estado-pneus-ok": "Estado dos Pneus",
    "limpeza-bau-sider-cabine-ok": "Limpeza (Baú, Sider e Cabine)",
    "lubrificacao-suspensoes-ok": "Lubrificação de Suspensões",
    "macaco-ok": "Macaco",
    "chave-roda-ok": "Chave de Roda",
    "documento-vigente-ok": "Documento Vigente",
    "data-horario-encerramento": "Data/Horário de Encerramento",
    "observacoes": "Observações",
    "abriu-cadeado-correntes-frente": "Abriu Cadeado da Frente",
    "abriu-portao-social": "Abriu Portao Social",
    "abriu-porta-rolante-armazem": "Abriu a Porta Rolante do Armazem",
    "desbloqueou-alarme": "Desbloqueou o Alarme",
    "apagou-luzes-armazem": "Apagou as Luzes do Armazem",
    "acendeu-luzes-operacional": "Acendeu as Luzes do Operacional",
    "ligou-ar-condicionado": "Ligou ar-condicionado",
    "ligou-tv-cameras": "Ligou TV câmeras",
    "ligou-tv-dashboard": "Ligou TV do dashboard",
    "coletou-chaves-internas-chaveiro": "Coletou chaves internas (chaveiro)",
    "abriu-porta-banheiro": "Abriu a porta do banheiro",
    "removeu-cadeado-portao-1": "Removeu cadeado do portão 1",
    "removeu-cadeado-portao-2": "Removeu cadeado do portão 2",
    "posicionou-cone-estacionamento-pcd": "Posicionou cone estacionamento PCD",
    "ligou-tomada-retirou-plastico-bebedouro": "Ligou tomada / Retirou plástico do bebedouro",
    "colocou-tapetes-devidos-lugares": "Colocou os tapetes nos devidos lugares",
    "fez-cafe-dia": "Fez café do dia",
    "situacao-atipica": "Situação atípica",
    "data-abertura-empresa": "Data de Abertura da Empresa",
    "tirou-lixo-organico-cozinha": "Tirou lixo orgânico da cozinha",
    "cozinha-organizada": "Cozinha organizada",
    "trancou-cadeado-portao-2": "Trancou cadeado do portão 2",
    "verificou-torneiras-mictorio": "Verificou torneiras do mictório",
    "trancou-porta-banheiro": "Trancou porta do banheiro",
    "deixou-chaves-internas-chaveiro": "Deixou chaves internas no chaveiro",
    "desligou-tv-dashboard": "Desligou TV do dashboard",
    "desligou-luzes-escritorio-operacional": "Desligou luzes do escritório operacional",
    "retirou-cone-estacionamento-pcd": "Retirou cone do estacionamento PCD",
    "fechou-porta-entrada-armazem": "Fechou porta de entrada do armazém",
    "portoes-apresentam-ruido-travamento": "Portões apresentam ruído/travamento",
    "data-fechamento-empresa": "Data de fechamento da empresa",
    "colocou-lixo-reciclavel-sexta": "Colocou lixo reciclável na sexta",
    "apagou-luzes-fechou-porta-cozinha": "Apagou luzes e fechou porta da cozinha",
    "trancou-cadeado-portao-1": "Trancou cadeado do portão 1",
    "tirou-lixo-banheiro": "Tirou o lixo do banheiro",
    "desligou-tomada-colocou-plastico-bebedouro": "Desligou tomada / colocou plástico no bebedouro",
    "desligou-tv-cameras": "Desligou TV das câmeras",
    "desligou-ar-condicionado": "Desligou ar-condicionado",
    "acendeu-luzes-armazem": "Acendeu luzes do armazém",
    "acionou-alarme": "Acionou o alarme",
    "trancou-cadeado-correntes": "Trancou cadeado das correntes",
  }


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
              { nome: "Checklist Diário", acao: abrirModalDiario, copiar: false },
              { nome: "Formulário de Abertura", acao: abrirModalAbertura, copiar: false },
              { nome: "Formulário de Fechamento", acao: abrirModalFechamento, copiar: false },
              { nome: "Checklist Gestão de Coleta", acao: abrirModalGestao, copiar: false },
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

        <div className="relative w-1/6 mb-7">
          <label htmlFor="filtroTipo" className="block text-sm font-medium text-black mb-1">
            Filtrar por Tipo de Checklist
          </label>
          <select
            id="filtroTipo"
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
          >
            {CHECKLIST_TIPO_OPCOES.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="text-black">Carregando...</p>
        ) : (
          <div className="rounded-[15px] shadow-md bg-white">
            {/* Cabeçalho da tabela */}
            <div className="border-b border-gray-300 px-4 py-2 grid grid-cols-3 gap-4 text-left font-bold text-black bg-[#e7f4ff] rounded-t-[15px]">
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
                <div className="grid grid-cols-3 gap-4 px-4 py-2 text-left text-black">
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
                  <div className={`p-4 px-6 border-t border-gray-200 text-sm ${idx % 2 === 0 ? "bg-[#f8fbff]" : "bg-white"}`}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
                      {c.detalhes &&
                        Object.entries(c.detalhes)
                          .filter(([key]) => key !== 'id')
                          .map(([key, value], index) => (
                            <div key={key} className={`flex justify-between py-1 border-b border-dashed ${index % 2 !== 0 ? 'sm:border-l sm:pl-4' : ''}`}>
                              <span className="font-semibold text-black">
                                {labels[key] || key}:
                              </span>
                              <span className={`text-black`}>
                                {formatValue(key, value)}
                              </span>
                            </div>
                          ))}
                    </div>
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

function formatValue(key: string, value: any) {
  const isDate = String(value).includes("T") && !isNaN(Date.parse(value));
  const stringValue = String(value)

  if (isDate) {
    return format(new Date(value), "dd/MM/yyyy HH:mm");
  }

  if (key === "cpf-usuario") {
    const cpf = String(value).padStart(11, "0");
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  if (key.includes("telefone") || key.includes("celular")) {
    const clean = stringValue.replace(/\D/g, "");

    if (clean.length === 10) {
      return clean.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }

    if (clean.length === 11) {
      return clean.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2$3-$4");
    }
  }

  if (key.includes("placa") || key.includes("veiculo")) {
    return stringValue.toUpperCase().replace(
      /^([A-Z]{3})(\d{4})$/,
      "$1-$2"
    );
  }

  if (key.includes("cep")) {
    const cep = stringValue.padStart(8, "0");
    return cep.replace(/(\d{5})(\d{3})/, "$1-$2");
  }

  if (key.includes("km")) {
    const numero = Number(stringValue);
    if (!isNaN(numero)) {
      return numero.toLocaleString("pt-BR") + " km";
    }
  }

  if (key.includes("valor") || key.includes("preco")) {
    const numero = Number(stringValue);
    if (!isNaN(numero)) {
      return numero.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }
  }

  return String(value);
}
