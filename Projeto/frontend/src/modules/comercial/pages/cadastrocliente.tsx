import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import instance from "../../../services/api";
import InputMaskField from '../../administrativo/components/InputMaskField'
import InputField from "../../administrativo/components/InputField";

// Regex simples para validar formato DD/MM/YYYY
const isValidDataPtBr = (data: string): boolean => {
  return /^\d{2}\/\d{2}\/\d{4}$/.test(data);
};

// Converte data DD/MM/YYYY -> YYYY-MM-DD (para salvar no estado)
const dataLimpa = (dataPtBr: string): string => {
  const [dia, mes, ano] = dataPtBr.split('/');
  if (!dia || !mes || !ano) return "";
  return `${ano.padStart(4, '0')}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
}

// Converte data YYYY-MM-DD -> DD/MM/YYYY (para mostrar no input)
const formatarDataParaPtBr = (dataIso: string): string => {
  if (!dataIso) return "";
  const soData = dataIso.split("T")[0].split(" ")[0]
  const [ano, mes, dia] = soData.split("-");
  return `${dia.padStart(2, "0")}/${mes.padStart(2, "0")}/${ano}`;
};

interface CadastroClienteProps {
  clienteId?: number;
}

export default function CadastroCliente({ clienteId }: CadastroClienteProps) {

  // Dados do usuário logado
  const storedUser = localStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const userId = parsedUser?.id || "";

  const [CNPJ, setCnpj] = useState("")
  const [nomeFantasia, setNomeFantasia] = useState("")
  const [prazoFaturamento, setPrazoFaturamento] = useState("")
  const [contatoResponsavel, setContatoResponsavel] = useState("")
  const [emailResponsavel, setEmailResponsavel] = useState("")
  const [CNAE, setCnae] = useState("")
  const [descricaoCNAE, setDescricaoCNAE] = useState("")
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (clienteId) {
      fetchCliente()
    }
  }, [clienteId])

  const fetchCliente = async () => {
    try {
      const response = await instance.get(`/cliente/${clienteId}`);
      const cliente = response.data;

      if (!cliente) {
        setErro("Cliente não encontrado.");
        return
      }

      setCnpj(cliente.CNPJ);
      setNomeFantasia(cliente.NomeFantasia);
      setPrazoFaturamento(cliente.PrazoFaturamento);
      setContatoResponsavel(cliente.ContatoResponsavel);
      setEmailResponsavel(cliente.EmailResponsavel);
      setCnae(cliente.CNAE)
      setDescricaoCNAE(cliente.descricaoCNAE)
      console.log('cliente:', cliente)

    } catch (error) {
      setErro("Falha ao carregar dados do cliente, tente novamente mais tarde.");
      console.error("Erro ao carregar cliente:", error);
    }
  }

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    setSucesso(null);

    const limparTexto = (texto: string) => {
      return texto
        .replace(/[^\p{L}\sçÇ]/gu, '')
        .replace(/\s+/g, ' ')
        .trim();
    };

    // Normaliza o formato antes de enviar
    const prazoISO = new Date(prazoFaturamento).toISOString().split("T")[0]; // "2025-11-30"


    const payload = {
      CNPJ: CNPJ.replace(/\D/g, ""),
      nomeFantasia: limparTexto(nomeFantasia),
      prazoFaturamento: prazoISO,
      contatoResponsavel: limparTexto(contatoResponsavel),
      emailResponsavel: emailResponsavel,
      CNAE: CNAE,
      descricaoCNAE: descricaoCNAE,
      colaboradorId: userId
    };

    try {
      console.log("Payload enviado:", payload);

      if (clienteId) {
        const response = await instance.put(`cliente/${clienteId}`, payload);
        console.log("Resposta do servidor:", response.data);
        setSucesso(`Atualização do cadastro realizado com sucesso!`);
      } else {
        const response = await instance.post("/cliente/create", payload);
        setSucesso(`Cadastro realizado com sucesso!`);
      }
      setTimeout(() => {
        setSucesso(null)
        navigate(0);
      }, 1200);
    } catch (error: any) {
      console.error("Erro ao cadastrar:", error.response?.data || error.message);
      setErro(error.response?.data?.message || "Erro ao cadastrar. Verifique os dados e tente novamente.");
    }
  };

  const handleDescartar = () => {
    fetchCliente();
    setErro(null);
    setSucesso(null);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[90%] md:w-[500px]">
        <h1 className="text-2xl font-bold text-center text-[#015084] mb-6">
          {clienteId ? "Editar Cliente" : "Cadastro de Cliente"}
        </h1>

        <form onSubmit={handleCadastro} className="flex flex-col gap-4">

          <div>
            <InputMaskField
              label="CNPJ"
              classNameLabel="!text-[#015084]"
              mask="00.000.000/0000-00"
              placeholder=""
              required
              maxLength={18}
              value={CNPJ}
              classNameInput='w-[400px]'
              onAccept={(value: string) => setCnpj(value)}
              style={{ outline: 'none', boxShadow: 'none' }}
            />
          </div>
          <div>
            <InputMaskField
              label="CNAE"
              classNameLabel="!text-[#015084]"
              mask="00.000-0/00"
              placeholder=""
              required
              maxLength={11}
              value={CNAE}
              classNameInput='w-[400px]'
              onAccept={(value: string) => setCnae(value)}
              style={{ outline: 'none', boxShadow: 'none' }}
            />
          </div>
          <div className="mb-4">
            <InputField
              label="Descrição do CNAE"              
              classNameLabel="!text-[#015084]"
              type="text"
              placeholder=""
              value={descricaoCNAE}
              classNameInput='w-[400px]'
              onChange={(e) => setDescricaoCNAE(e.target.value)}
            />
          </div>

          <div>
            <InputField
              label="Nome Fantasia"              
              classNameLabel="!text-[#015084]"
              type="text"
              placeholder=""
              value={nomeFantasia}
              classNameInput='w-[400px]'
              onChange={(e) => setNomeFantasia(e.target.value)}                         
            />
          </div>

          <div>
            <InputMaskField
              label="Prazo de Faturamento(DD/MM/AAAA)"
              classNameLabel="!text-[#015084]"
              mask="00/00/0000"
              placeholder=""
              required
              maxLength={10}
              classNameInput='w-[400px]'
              value={prazoFaturamento ? formatarDataParaPtBr(prazoFaturamento) : ""}
              style={{ outline: 'none', boxShadow: 'none' }}
              onAccept={(value: string) => {
                if (isValidDataPtBr(value)) {
                  setPrazoFaturamento(dataLimpa(value));
                }
              }}
              onPaste={(e) => {
                const pastedData = e.clipboardData.getData('Text');
                if (!isValidDataPtBr(pastedData)) e.preventDefault();
              }}
            />
          </div>

          <div>
            <InputField
              label="Contato do Responsável"              
              classNameLabel="!text-[#015084]"
              type="text"
              placeholder=""
              value={contatoResponsavel}
              classNameInput='w-[400px]'
              onChange={(e) => setContatoResponsavel(e.target.value)}                        
            />
          </div>


          <div>
            <InputField
              label="E-mail do Responsável"              
              classNameLabel="!text-[#015084]"
              type="text"
              placeholder=""
              value={emailResponsavel}              
              classNameInput='w-[400px]'
              onChange={(e) => setEmailResponsavel(e.target.value)}
            />
          </div>

          {clienteId ? (
            <div className="submit-container flex flex-col md:flex-row gap-4 items-center justify-center">
              <button
                type="submit"
                style={{ backgroundColor: "#d1edff", color: "#015084" }}
                className="py-2 px-4 rounded font-semibold hover:brightness-90 transition"
              >
                Salvar Alterações
              </button>

              <button
                type="button"
                style={{ backgroundColor: "#d1edff", color: "#015084" }}
                onClick={handleDescartar}
                className="py-2 px-4 rounded font-semibold hover:brightness-90 transition"
              >
                Descartar Alterações
              </button>
            </div>
          ) : (
            <button
              type="submit"
              className="bg-[#015084] text-white p-2 rounded-lg mt-4 hover:bg-[#013f66] transition"
            >
              {clienteId ? "Salvar Alterações" : "Cadastrar"}
            </button>
          )}

          {sucesso && (
            <div className="pt-4 text-green-600 text-center text-[14px] md:text-[18px]">
              {sucesso}
            </div>
          )}
          {erro && (
            <div className="pt-4 text-red-600 text-center text-[14px] md:text-[18px]">
              {erro}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
