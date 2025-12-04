import React, { useState } from 'react';
import InputField from '../components/InputField.tsx';
import InputMaskField from '../components/InputMaskField.tsx';
import './PaginaCadastro.css';
import { useNavigate } from 'react-router-dom';
import instance from "../../../services/api";
import InputLine from '../../../shared/components/inputLine.tsx';


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


export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [genero, setGenero] = useState("");
  const [dataContratacao, setDataContratacao] = useState("");
  const [cargo, setCargo] = useState("");
  const [setor, setSetor] = useState("");
  const [senha, setSenha] = useState("");
  const [role, setRole] = useState("usuario");
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCadastro = async (e: React.FormEvent) => {
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

    const limparTexto = (texto: string) => {
      return texto
        .replace(/[^\p{L}\sçÇ]/gu, '')
        .replace(/\s+/g, ' ')
        .trim();
    };

    const payload = {
      nome: limparTexto(nome),
      cpf: cpf.replace(/\D/g, ""),
      genero: genero.trim().charAt(0).toUpperCase(),
      dataNascimento,
      cargo: limparTexto(cargo),
      senha,
      dataContratacao,
      role,
      setor: limparTexto(setor)
    };


    try {
      const response = await instance.post("/usuario/create", payload);
      setSucesso(`Cadastro realizado com sucesso! ID: ${response.data.id}`);
      setTimeout(() => {
        navigate(0);
      }, 1000);
    } catch (error) {
      setErro("Erro ao cadastrar. Verifique os dados e tente novamente.");
    }
  };

  return (
    <div className="form-container container  max-w-[95%] md:max-w-[500px] mx-auto">
      <div className="header">
        <p className="text-[25px] md:text-[45px] font-sans font-bold italic text-white pt-5 md:drop-shadow-[10px_8px_3px_rgba(0,0,0,0.3)]">
          Cadastro
        </p>
      </div>

      <form onSubmit={handleCadastro}>
        <div className="inputs">

          <InputField
            label="Nome Completo"
            type="text"
            placeholder=""
            required
            maxLength={100}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            classNameInput='w-[340px] md:w-[400px]'
          />

          <InputMaskField
            label="CPF"
            mask="000.000.000-00"
            placeholder=""
            required
            maxLength={14}
            value={cpf}
            onAccept={(value: string) => setCpf(value)}
            classNameInput='w-[340px] md:w-[400px]'
          />

          <InputMaskField
            label="Data de Nascimento(DD/MM/AAAA)"
            mask="00/00/0000"
            placeholder=""
            required
            maxLength={10}
            classNameInput='w-[340px] md:w-[400px]'
            value={dataNascimento ? formatarDataParaPtBr(dataNascimento) : ""}
            onAccept={(value: string) => {
              if (isValidDataPtBr(value)) {
                setDataNascimento(dataLimpa(value));
              }
            }}
            onPaste={(e) => {
              const pastedData = e.clipboardData.getData('Text');
              if (!isValidDataPtBr(pastedData)) e.preventDefault();
            }}
          />

          <InputField
            label="Gênero(Ex: Masculino, Feminino, Outro)"
            type="text"
            placeholder=""
            required
            maxLength={20}
            value={genero}
            classNameInput='w-[340px] md:w-[400px]'
            onChange={(e) => setGenero(e.target.value)}
          />

          <InputMaskField
            label="Data de Contratação(DD/MM/AAAA)"
            mask="00/00/0000"
            placeholder=""
            required
            maxLength={10}
            classNameInput='w-[340px] md:w-[400px]'
            value={dataContratacao ? formatarDataParaPtBr(dataContratacao) : ""}
            onAccept={(value: string) => {
              if (isValidDataPtBr(value)) {
                setDataContratacao(dataLimpa(value));
              }
            }}
            onPaste={(e) => {
              const pastedData = e.clipboardData.getData('Text');
              if (!isValidDataPtBr(pastedData)) e.preventDefault();
            }}
          />

          <InputField
            label="Cargo"
            type="text"
            placeholder=""
            required
            maxLength={50}
            value={cargo}
            classNameInput='w-[340px] md:w-[400px]'
            onChange={(e) => setCargo(e.target.value)}
          />

          <InputField
            label="Setor"
            type="text"
            placeholder=""
            required
            maxLength={50}
            value={setor}
            classNameInput='w-[340px] md:w-[400px]'
            onChange={(e) => setSetor(e.target.value)}
          />

          <InputField
            label="Digite uma senha segura"
            type="password"
            placeholder=""
            required
            maxLength={100}
            value={senha}
            classNameInput='w-[340px] md:w-[400px]'
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

        <div className="submit-container">
          <input type="submit" value="CADASTRAR" className="submit" />
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
