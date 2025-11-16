import React, { useEffect, useState } from 'react';
import InputField from '../components/InputField.tsx';
import InputMaskField from '../components/InputMaskField.tsx';
import './PaginaCadastro.css';
import { useNavigate, useParams } from 'react-router-dom';
import instance from "../../../services/api";

// Verifica se a data está no formato DD/MM/AAAA
const isValidDataPtBr = (data: string): boolean => /^\d{2}\/\d{2}\/\d{4}$/.test(data);

// Converte data do formato PT-BR para ISO (AAAA-MM-DD)
const dataLimpa = (dataPtBr: string): string => {
  const [dia, mes, ano] = dataPtBr.split('/');
  if (!dia || !mes || !ano) return "";
  return `${ano.padStart(4, '0')}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
};

// Converte data ISO para PT-BR (DD/MM/AAAA)
const formatarDataParaPtBr = (dataIso: string): string => {
  if (!dataIso) return "";
  const [ano, mes, dia] = dataIso.split("-");
  return `${dia.padStart(2, "0")}/${mes.padStart(2, "0")}/${ano}`;
};

// Verifica se a pessoa tem pelo menos 16 anos
const isMaiorIdade = (dataIso: string) => {
  const hoje = new Date()
  const nascimento = new Date(dataIso)

  const limite = new Date()
  limite.setFullYear(hoje.getFullYear() - 16)

  return nascimento <= limite
}

// Verifica se a data é no futuro
const isDataNoFuturo = (dataIso: string) => {
  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)

  const data = new Date(dataIso)
  return data > hoje
}

const generoCompleto = (letra: string) => {
  switch (letra.toUpperCase()) {
    case 'M':
      return 'Masculino';
    case 'F':
      return 'Feminino';
    case 'O':
      return 'Outro';
    default:
      return '';
  }
}


interface AtualizarCadastroProps {
  id: number
}

export default function AtualizarCadastro({ id }: AtualizarCadastroProps) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setdataNascimento] = useState("");
  const [genero, setGenero] = useState("");
  const [dataContratacao, setDataContratacao] = useState("");
  const [cargo, setCargo] = useState("");
  const [setor, setSetor] = useState("");
  const [senha, setSenha] = useState("");
  const [role, setRole] = useState("usuario");
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsuario();
  }, [id]);

    const fetchUsuario = async () => {
      try {
        const response = await instance.get(`/usuario/${id}`);
        const usuario = response.data;

        if (!usuario) {
          setErro("Usuário não encontrado.");
          return
        }

        setNome(usuario.nome);
        setCpf(usuario.cpf);
        setdataNascimento(usuario.dataNascimento);
        setGenero(usuario.genero);
        setDataContratacao(usuario.dataContratacao);
        setCargo(usuario.cargo);
        setSetor(usuario.setor);
        setRole(usuario.role || "usuario");
        console.log('usuario:', usuario)

      } catch (error) {
        setErro("Falha ao carregar dados do usuário, tente novamente mais tarde.");
      }
    }



  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    setSucesso(null);

    // validações
    if (!dataNascimento || !dataContratacao) {
      setErro("Preencha as datas corretamente.")
      return
    }

    if (isDataNoFuturo(dataNascimento)) {
      setErro("Data de nascimento inválida.")
      return
    }

    if (!isMaiorIdade(dataNascimento)) {
      setErro("O usuário deve ter mais de 16 anos.")
      return
    }

    if (isDataNoFuturo(dataContratacao)) {
      setErro("A data de contratação inválida.")
      return
    }

    const limparTexto = (texto: string) =>
      texto.replace(/[^\p{L}\sçÇ]/gu, '').replace(/\s+/g, ' ').trim();

    const payload: {
      nome: string
      cpf: string
      dataNascimento: string
      genero: string
      dataContratacao: string
      cargo: string
      setor: string
      role: string
      senha?: string
    } = {
      nome: limparTexto(nome),
      cpf: cpf.replace(/\D/g, ""),
      dataNascimento,
      genero: genero.trim().charAt(0).toLowerCase(),
      dataContratacao,
      cargo: limparTexto(cargo),
      setor: limparTexto(setor),
      role: limparTexto(role.toLowerCase()),
    }


    // não incluir senha na atualização, a não ser que ela tenha sido alterada
    if (senha) {
      payload.senha = senha
    }

    try {
      await instance.put(`/usuario/${id}`, payload);
      setSucesso("Cadastro atualizado com sucesso!");
      setTimeout(() => {
        setSucesso(null)
        navigate(0);
      }, 1200);
    } catch (error: any) {
      const mensagemErro = error?.response?.data?.message || "Erro desconhecido. Tente novamente."
      setErro(mensagemErro);
    }
  };

  const handleDescartar = () => {
    fetchUsuario();
    setSenha("");
    setErro(null);
    setSucesso(null);
  };

  return (
    <div className="form-container container">
      <div className="header">
        <p className="text-[20px] md:text-[38px] font-sans font-bold italic text-white pt-5 md:drop-shadow-[10px_8px_3px_rgba(0,0,0,0.3)]">
          Atualizar Cadastro
        </p>
      </div>

      <form onSubmit={handleSalvar}>
        <div className="inputs">
          <InputField
            label="Nome Completo"
            type="text"
            placeholder="Digite o nome completo"
            required
            maxLength={100}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <InputMaskField
            label="CPF"
            mask="000.000.000-00"
            placeholder="Digite o CPF"
            required
            maxLength={14}
            value={cpf}
            onAccept={(value: string) => setCpf(value)}
          />

          <InputMaskField
            label="Data de Nascimento"
            mask="00/00/0000"
            placeholder="DD/MM/AAAA"
            required
            maxLength={10}
            value={dataNascimento ? formatarDataParaPtBr(dataNascimento) : ""}
            onAccept={(value: string) => {
              if (isValidDataPtBr(value)) {
                setdataNascimento(dataLimpa(value));
              }
            }}
          />

          <InputField
            label="Gênero"
            type="text"
            placeholder="Ex: Masculino, Feminino, Outro"
            required
            maxLength={20}
            value={generoCompleto(genero)}
            onChange={(e) => setGenero(e.target.value)}
          />

          <InputMaskField
            label="Data de Admissão"
            mask="00/00/0000"
            placeholder="DD/MM/AAAA"
            required
            maxLength={10}
            value={dataContratacao ? formatarDataParaPtBr(dataContratacao) : ""}
            onAccept={(value: string) => {
              if (isValidDataPtBr(value)) {
                setDataContratacao(dataLimpa(value));
              }
            }}
          />

          <InputField
            label="Cargo"
            type="text"
            placeholder="Digite o cargo"
            required
            maxLength={50}
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
          />

          <InputField
            label="Setor"
            type="text"
            placeholder="Digite o setor"
            required
            maxLength={50}
            value={setor}
            onChange={(e) => setSetor(e.target.value)}
          />

          <InputField
            label="Senha"
            type="password"
            placeholder="Digite a nova senha"
            maxLength={100}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <div className="input-field">
            <label htmlFor="role" className="block text-white mb-1">Acesso</label>
            <select
              id="role"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 rounded-md text-black"
            >
              <option value="">Selecione</option>
              <option value="admin">Administrador</option>
              <option value="comercial">Comercial</option>
              <option value="operacional">Operacional</option>
            </select>
          </div>

        </div>

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
  );
}
