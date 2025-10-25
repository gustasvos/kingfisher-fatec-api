import React, { useState } from 'react';
import InputField from '../components/InputField.tsx';
import InputMaskField from '../components/InputMaskField.tsx';
import './PaginaCadastro.css';
import { useNavigate } from 'react-router-dom';
import instance from "../../../services/api";


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

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [data_nascimento, setData_nascimento] = useState("");
  const [genero, setGenero] = useState("");
  const [data_contratacao, setDataContratacao] = useState("");
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

    const limparTexto = (texto: string) => {
      return texto
        .replace(/[^\p{L}\sçÇ]/gu, '')
        .replace(/\s+/g, ' ')
        .trim();
    };

  const payload = {
    nome: limparTexto(nome),
    cpf: cpf.replace(/\D/g, ""),
    genero: genero.trim().charAt(0).toLowerCase(), // 'Masculino' → 'm'
    data_nascimento,
    cargo: limparTexto(cargo),
    senha: senha,
    data_contratacao,
    role: limparTexto(role.toLowerCase()),
    setor: limparTexto(setor)
  };


    try {
      const response = await instance.post("/usuario/create", payload);
      setSucesso(`Cadastro realizado com sucesso! ID: ${response.data.id}`);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setErro("Erro ao cadastrar. Verifique os dados e tente novamente.");
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setRole(value);
  };

  return (
    <div className="form-container container">
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
            value={data_nascimento ? formatarDataParaPtBr(data_nascimento) : ""}
            onAccept={(value: string) => {
              if (isValidDataPtBr(value)) {
                setData_nascimento(dataLimpa(value));
              }
            }}
            onPaste={(e) => {
              const pastedData = e.clipboardData.getData('Text');
              if (!isValidDataPtBr(pastedData)) e.preventDefault();
            }}
          />

          <InputField
            label="Gênero"
            type="text"
            placeholder="Ex: Masculino, Feminino, Outro"
            required
            maxLength={20}
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
          />

          <InputMaskField
            label="Data de Contratação"
            mask="00/00/0000"
            placeholder="DD/MM/AAAA"
            required
            maxLength={10}
            value={data_contratacao ? formatarDataParaPtBr(data_contratacao) : ""}
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
            placeholder="Digite uma senha segura"
            required
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
              <option value="usuario">Usuário</option>
              <option value="admin">Administrador</option>
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
