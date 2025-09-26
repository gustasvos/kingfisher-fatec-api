import React from 'react';
import InputField from '../components/InputField.tsx'; 
import InputMaskField from '../components/InputMaskField.tsx'; 
import './PaginaCadastro.css';
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import instance from "../../../services/api";

const isValidDataPtBr = (data: string): boolean => {
  // Regex simples para validar formato DD/MM/YYYY
  return /^\d{2}\/\d{2}\/\d{4}$/.test(data);
};

  // Converte data DD/MM/YYYY -> YYYY-MM-DD (para salvar no estado)
const dataLimpa = (dataPtBr: string): string => {
  const [dia, mes, ano] = dataPtBr.split('/');
  if (!dia || !mes || !ano) return "";
  return `${ano.padStart(4,'0')}-${mes.padStart(2,'0')}-${dia.padStart(2,'0')}`;
}

// Converte data YYYY-MM-DD -> DD/MM/YYYY (para mostrar no input)
const formatarDataParaPtBr = (dataIso: string): string => {
  if (!dataIso) return "";
  const [ano, mes, dia] = dataIso.split("-");
  return `${dia.padStart(2, "0")}/${mes.padStart(2, "0")}/${ano}`;
};

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [nome_fantasia, setNome_fantasia] = useState("");
  const [cpf, setCpf] = useState("");
  const [data_nascimento, setData_nascimento] = useState("");
  const [documento_exterior, setDocumento_exterior] = useState("");
  const [telefone, setTelefone] = useState("");
  const [celular, setCelular] = useState("");
  const [operadora, setOperadora] = useState("");
  const [cidade_nascimento, setCidade_nascimento] = useState("");
  const [inscricao_estadual, setInscricao_estadual] = useState("");
  const [rg, setRg] = useState("");
  const [cidade_expedicao_rg, setCidade_expedicao_rg] = useState("");
  const [orgao_expedidor, setOrgao_expedidor] = useState("");
  const [data_emissao_rg, setData_emissao_rg] = useState("");
  const [pis_pasep, setPis_pasep] = useState("");
  const [email, setEmail] = useState("");
  const [nome_mae, setNome_mae] = useState("");
  const [nome_pai, setNome_pai] = useState("");
  const [cargo, setCargo] = useState("");
  const [senha, setSenha] = useState("");
  const [data_contratacao, setData_contratacao] = useState("");
  const [sexo, setSexo] = useState("");
  const [estado_civil, setEstado_civil] = useState("");
  const [rntrc, setRntrc] = useState("");
  const [validade_rntrc, setValidade_rntrc] = useState("");
  const [codigo, setCodigo] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [tipo_endereco, setTipo_endereco] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [ativo, setAtivo] = useState(false);
  const [role, setRole] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCadastro = async (e: React.FormEvent) =>{
    e.preventDefault()
    setErro(null);       // limpa erro anterior
    setSucesso(null);    // limpa sucesso anterior
    const limparTexto = (texto: string) => {
      return texto
        // .normalize('NFD')                       // separa acentos
        .replace(/[^\p{L}\sçÇ]/gu, '')          // remove tudo exceto letras, espaços e ç/Ç
        .replace(/\s+/g, ' ')                   // troca múltiplos espaços por 1 só
        .trim();                                // remove espaços no início/fim
    };
    const limparNumeroDecimal = (texto: string) => {
      return texto.replace(/[^0-9.-]/g, '').trim();
    };

  const payload = {
    nome: limparTexto(nome),
    nome_fantasia: limparTexto(nome_fantasia),
    cpf: cpf.replace(/\D/g, ""),
    data_nascimento,
    documento_exterior: limparTexto(documento_exterior),
    telefone: telefone.replace(/\D/g, ""),
    celular: celular.replace(/\D/g, ""),
    operadora: limparTexto(operadora),
    cidade_nascimento: limparTexto(cidade_nascimento),
    inscricao_estadual: limparTexto(inscricao_estadual),
    rg: rg.replace(/\D/g, ""),
    cidade_expedicao_rg: limparTexto(cidade_expedicao_rg),
    orgao_expedidor: limparTexto(orgao_expedidor),
    data_emissao_rg,
    pis_pasep: pis_pasep.replace(/\D/g, ""),
    email: email.toLowerCase().trim(),
    nome_mae: limparTexto(nome_mae),
    nome_pai: limparTexto(nome_pai),
    cargo: limparTexto(cargo),
    senha,
    data_contratacao,
    sexo: sexo.trim().charAt(0).toLowerCase(),
    estado_civil: limparTexto(estado_civil),
    rntrc: limparTexto(rntrc),
    validade_rntrc,
    codigo: limparTexto(codigo),
    cep: cep.replace(/\D/g, ""),
    logradouro: limparTexto(logradouro),
    numero: limparTexto(numero),
    complemento: limparTexto(complemento),
    bairro: limparTexto(bairro),
    cidade: limparTexto(cidade),
    tipo_endereco: limparTexto(tipo_endereco),
    latitude: parseFloat(limparNumeroDecimal(latitude)),
    longitude: parseFloat(limparNumeroDecimal(longitude)),
    ativo,
    role: limparTexto(role)
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
  }


  return (
    <div className="bg-[#EAF7FF] min-h-screen flex items-center justify-center">
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
            <InputField
              label="Nome Fantasia"
              type="text"
              placeholder="Digite o nome fantasia"
              required
              maxLength={100}
              value={nome_fantasia}
              onChange={(e) => setNome_fantasia(e.target.value)}
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
                if (!isValidDataPtBr(pastedData)) {
                  e.preventDefault(); // cancela o paste se não for válido
                }
              }}
            />
            <InputField
              label="Documento Exterior"
              type="text"
              placeholder="Digite o documento estrangeiro (se houver)"
              maxLength={50}
              value={documento_exterior}
              onChange={(e) => setDocumento_exterior(e.target.value)}
            />
            <InputMaskField
              label="Telefone"
              mask="(00) 00000-0000"
              placeholder="Digite o telefone"
              required
              maxLength={15}
              value={telefone}
              onAccept={(value: string) => setTelefone(value)}
            />
            <InputMaskField
              label="Celular"
              mask="(00) 00000-0000"
              placeholder="Digite o celular"
              required
              maxLength={15}
              value={celular}
              onAccept={(value: string) => setCelular(value)}
            />
            <InputField
              label="Operadora"
              type="text"
              placeholder="Digite a operadora"
              value={operadora}
              onChange={(e) => setOperadora(e.target.value)}
            />
            <InputField
              label="Cidade de Nascimento"
              type="text"
              placeholder="Digite a cidade onde nasceu"
              required
              maxLength={100}
              value={cidade_nascimento}
              onChange={(e) => setCidade_nascimento(e.target.value)}
            />
            <InputField 
              label="Inscrição Estadual" 
              type="text" 
              placeholder="Digite a IE" 
              required 
              value={inscricao_estadual}
              onChange={(e) => setInscricao_estadual(e.target.value)}
              maxLength={30}
            />
            <InputMaskField 
              label="RG" 
              mask="00.000.000-0" 
              placeholder="Digite o RG" 
              required 
              value={rg}
              onAccept={(value: string) => setRg(value)}
              maxLength={12}
            />
            <InputField 
              label="Cidade Expedição RG" 
              type="text" 
              placeholder="Digite a cidade de expedição" 
              required 
              value={cidade_expedicao_rg}
              onChange={(e) => setCidade_expedicao_rg(e.target.value)}
              maxLength={60}
            />
            <InputField 
              label="PIS/PASEP" 
              type="text" 
              placeholder="Digite o número do PIS/PASEP" 
              value={pis_pasep}
              onChange={(e) => setPis_pasep(e.target.value)}
              maxLength={14}
            />
            <InputField 
              label="E-mail" 
              type="email" 
              placeholder="Digite o email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={100}
            />
            <InputField 
              label="Nome da Mãe" 
              type="text" 
              placeholder="Digite o nome da mãe" 
              required 
              value={nome_mae}
              onChange={(e) => setNome_mae(e.target.value)}
              maxLength={100}
            />
            <InputField 
              label="Nome do Pai" 
              type="text" 
              placeholder="Digite o nome do pai" 
              value={nome_pai}
              onChange={(e) => setNome_pai(e.target.value)}
              maxLength={100}
            />
            <InputField 
              label="Sexo" 
              type="text" 
              placeholder="Masculino / Feminino / Outro" 
              required 
              value={sexo}
              onChange={(e) => setSexo(e.target.value)}
              maxLength={20}
            />
            <InputField 
              label="Estado Civil" 
              type="text" 
              placeholder="Digite o estado civil" 
              value={estado_civil}
              onChange={(e) => setEstado_civil(e.target.value)}
              maxLength={30}
            />
            <InputField 
              label="Órgão Expeditor" 
              type="text" 
              placeholder="Digite o órgão expedidor" 
              value={orgao_expedidor}
              onChange={(e) => setOrgao_expedidor(e.target.value)}
              maxLength={50}
            />
            <InputMaskField
              label="Data de Emissão RG"
              mask="00/00/0000"
              placeholder="DD/MM/AAAA"
              required
              maxLength={10}
              value={data_emissao_rg ? formatarDataParaPtBr(data_emissao_rg) : ""}
              onAccept={(value: string) => {
                if (isValidDataPtBr(value)) {
                  setData_emissao_rg(dataLimpa(value));
                }
              }}
              onPaste={(e) => {
                const pastedData = e.clipboardData.getData('Text');
                if (!isValidDataPtBr(pastedData)) {
                  e.preventDefault();
                }
              }}
            />
            <InputField 
              label="RNTRC" 
              type="text" 
              placeholder="Digite o número do RNTRC" 
              value={rntrc}
              onChange={(e) => setRntrc(e.target.value)}
              maxLength={20}
            />
            <InputMaskField
              label="Validade RNTRC"
              mask="00/00/0000"
              placeholder="DD/MM/AAAA"
              maxLength={10}
              value={validade_rntrc ? formatarDataParaPtBr(validade_rntrc) : ""}
              onAccept={(value: string) => {
                if (isValidDataPtBr(value)) {
                  setValidade_rntrc(dataLimpa(value));
                }
              }}
              onPaste={(e) => {
                const pastedData = e.clipboardData.getData('Text');
                if (!isValidDataPtBr(pastedData)) {
                  e.preventDefault();
                }
              }}
            />
            <InputField 
              label="Código" 
              type="text" 
              placeholder="Digite o código" 
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              maxLength={10}
            />
            <InputMaskField 
              label="CEP" 
              mask="00000-000" 
              placeholder="Digite o CEP" 
              value={cep}
              onAccept={(value: string) => setCep(value)}
              maxLength={9}
            />
            <InputField 
              label="Logradouro" 
              type="text" 
              placeholder="Digite o logradouro" 
              value={logradouro}
              onChange={(e) => setLogradouro(e.target.value)}
              maxLength={100}
            />
            <InputField 
              label="Número" 
              type="text" 
              placeholder="Digite o número" 
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              maxLength={10}
            />
            <InputField 
              label="Complemento" 
              type="text" 
              placeholder="Digite o complemento" 
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
              maxLength={50}
            />
            <InputField 
              label="Bairro" 
              type="text" 
              placeholder="Digite o bairro" 
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              maxLength={50}
            />
            <InputField 
              label="Cidade" 
              type="text" 
              placeholder="Digite a cidade" 
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              maxLength={50}
            />
            <InputField 
              label="Tipo de Endereço" 
              type="text" 
              placeholder="Ex: Residencial, Comercial" 
              value={tipo_endereco}
              onChange={(e) => setTipo_endereco(e.target.value)}
              maxLength={30}
            />
            <InputField 
              label="Latitude" 
              type="text" 
              placeholder="Digite a latitude" 
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              maxLength={20}
            />
            <InputField 
              label="Longitude" 
              type="text" 
              placeholder="Digite a longitude" 
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              maxLength={20}
            />
            <InputField 
              label="Cargo" 
              type="text" 
              placeholder="Digite o cargo" 
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              maxLength={50}
            />

            <InputMaskField
              label="Data de Contratação"
              mask="00/00/0000"
              placeholder="DD/MM/AAAA"
              maxLength={10}
              value={data_contratacao ? formatarDataParaPtBr(data_contratacao) : ""}
              onAccept={(value: string) => {
                if (isValidDataPtBr(value)) {
                  setData_contratacao(dataLimpa(value));
                }
              }}
              onPaste={(e) => {
                const pastedData = e.clipboardData.getData('Text');
                if (!isValidDataPtBr(pastedData)) {
                  e.preventDefault();
                }
              }}
            />
            <InputField 
              label="Senha" 
              type="password" 
              placeholder="Digite a senha" 
              required 
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              maxLength={50}
            />

            <InputField 
              label="Nível de acesso" 
              type="text" 
              placeholder="Ex: admin, usuario" 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              maxLength={30}
            />

            <label className="flex items-center gap-2 mt-4">
              <input 
                type="checkbox" 
                checked={ativo} 
                onChange={(e) => setAtivo(e.target.checked)} 
              />
              <span>Ativo</span>
            </label>
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
    </div>
  );
}