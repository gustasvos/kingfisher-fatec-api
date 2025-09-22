import React from 'react';
import InputField from '../components/InputField.jsx'; 
import InputMaskField from '../components/InputMaskField.jsx'; 
import './PaginaCadastro.css';

export default function Cadastro() {
  return (
    <div className="bg-[#EAF7FF] min-h-screen flex items-center justify-center">
      <div className="form-container container">
        <div className="header">
          <p className="text-[25px] md:text-[45px] font-sans font-bold italic text-white pt-5 md:drop-shadow-[10px_8px_3px_rgba(0,0,0,0.3)]">
            Cadastro
          </p>
        </div>

        <form className="form">
          <div className="inputs">
            <InputField label="Nome Completo" type="text" placeholder="Digite o nome completo" required />
            <InputField label="Nome Fantasia" type="text" placeholder="Digite o nome fantasia" required />
            <InputMaskField label="CPF" mask="000.000.000-00" placeholder="Digite o CPF" required />
            <InputMaskField label="Data de Nascimento" mask="00/00/0000" placeholder="DD/MM/AAAA" required />
            <InputField label="Documento Exterior" type="text" placeholder="Digite o documento estrangeiro (se houver)" />
            <InputMaskField label="Telefone" mask="(00) 0000-0000" placeholder="Digite o telefone" required />
            <InputMaskField label="Celular" mask="(00) 00000-0000" placeholder="Digite o celular" required />
            <InputField label="Operadora" type="text" placeholder="Digite a operadora" />
            <InputField label="Cidade de Nascimento" type="text" placeholder="Digite a cidade onde nasceu" required />
            <InputField label="Inscrição Estadual" type="text" placeholder="Digite a IE" required />
            <InputMaskField label="RG" mask="00.000.000-0" placeholder="Digite o RG" required />
            <InputField label="Cidade Expedição RG" type="text" placeholder="Digite a cidade de expedição" required />
            <InputField label="PIS/PASEP" type="text" placeholder="Digite o número do PIS/PASEP" />
            <InputField label="E-mail" type="email" placeholder="Digite o email" required />
            <InputField label="Nome da Mãe" type="text" placeholder="Digite o nome da mãe" required />
            <InputField label="Sexo" type="text" placeholder="Masculino / Feminino / Outro" required />
            <InputField label="Estado Civil" type="text" placeholder="Digite o estado civil" />
            <InputField label="Órgão Expeditor" type="text" placeholder="Digite o órgão expedidor" />
            <InputMaskField label="Data de Emissão RG" mask="00/00/0000" placeholder="DD/MM/AAAA" required />
            <InputField label="RNTRC" type="text" placeholder="Digite o número do RNTRC" />
            <InputMaskField label="Validade RNTRC" mask="00/00/0000" placeholder="DD/MM/AAAA" />
            <InputField label="Código" type="text" placeholder="Digite o código" />
            <InputMaskField label="CEP" mask="00000-000" placeholder="Digite o CEP" />
            <InputField label="Logradouro" type="text" placeholder="Digite o logradouro" />
            <InputField label="Número" type="text" placeholder="Digite o número" />
            <InputField label="Complemento" type="text" placeholder="Digite o complemento" />
            <InputField label="Bairro" type="text" placeholder="Digite o bairro" />
            <InputField label="Cidade" type="text" placeholder="Digite a cidade" />
            <InputField label="Tipo de Endereço" type="text" placeholder="Ex: Residencial, Comercial" />
            <InputField label="Latitude" type="text" placeholder="Digite a latitude" />
            <InputField label="Longitude" type="text" placeholder="Digite a longitude" />
          </div>

          <div className="submit-container">
            <input type="submit" value="CADASTRAR" className="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
