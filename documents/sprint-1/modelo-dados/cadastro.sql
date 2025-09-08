-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2025-09-08 00:34:23.897

-- tables
-- Table: Agregado
CREATE TABLE Agregado (
    agregado_id int  NOT NULL,
    agregado_tipo Enum('moto','carro')  NOT NULL,
    Motorista_motorista_id int  NOT NULL,
    CONSTRAINT Agregado_pk PRIMARY KEY (agregado_id)
);

-- Table: AgregadoMoto
CREATE TABLE AgregadoMoto (
    Agregado_agregado_id int  NOT NULL,
    Moto_moto_id int  NOT NULL,
    dataNascimento date  NOT NULL,
    cidadeNatal varchar(255)  NOT NULL,
    telefone varchar(11)  NOT NULL,
    email varchar(255)  NOT NULL,
    rg int  NOT NULL,
    dataEmissaoRg date  NOT NULL,
    orgaoExpedidorRg varchar(30)  NOT NULL,
    nomePai varchar(255)  NOT NULL,
    nomeMae varchar(255)  NOT NULL,
    pisPasep varchar(11)  NOT NULL,
    cep varchar(8)  NOT NULL,
    rua varchar(255)  NOT NULL,
    bairro varchar(255)  NOT NULL,
    numero varchar(4)  NOT NULL,
    cidade varchar(255)  NOT NULL,
    valorSaida Float(5,2)  NOT NULL,
    valorKm Float(5,2)  NOT NULL,
    CONSTRAINT AgregadoMoto_pk PRIMARY KEY (Agregado_agregado_id,Moto_moto_id)
);

-- Table: Carro
CREATE TABLE Carro (
    carro_id int  NOT NULL,
    carro_tipo Enum('fiorino','van','vuc','3/4','toco','truck','carreta')  NOT NULL,
    carro_nivelOleo Enum('sim','nao','na')  NOT NULL,
    carro_vazamentoOleo Enum('sim','nao','na')  NOT NULL,
    carro_nivelAgua Enum('sim','nao','na')  NOT NULL,
    carro_fotoMotor varchar(255)  NOT NULL,
    carro_fotoTrocaOleo varchar(255)  NOT NULL,
    carro_pneuDD Enum('sim','nao','na')  NOT NULL,
    carro_pneuTD Enum('sim','nao','na')  NOT NULL,
    carro_pneuDE Enum('sim','nao','na')  NOT NULL,
    carro_pneuTE Enum('sim','nao','na')  NOT NULL,
    carro_pneuFoto1 varchar(255)  NOT NULL,
    carro_pneuFoto2 varchar(255)  NOT NULL,
    carro_pneuFoto3 varchar(255)  NOT NULL,
    carro_pneuFoto4 varchar(255)  NOT NULL,
    carro_parabrisa Enum('sim','nao','na')  NOT NULL,
    carro_cabine int  NOT NULL,
    carro_limpezaExterno Enum('sim','nao','na')  NOT NULL,
    carro_amassado Enum('sim','nao','na')  NOT NULL,
    carro_assoalho Enum('sim','nao','na')  NOT NULL,
    carro_faixaRefletiva Enum('sim','nao','na')  NOT NULL,
    carro_limpaParabrisa Enum('sim','nao','na')  NOT NULL,
    carro_buzina Enum('sim','nao','na')  NOT NULL,
    carro_farolAlto Enum('sim','nao','na')  NOT NULL,
    carro_farolBaixo Enum('sim','nao','na')  NOT NULL,
    carro_setasDianteiras Enum('sim','nao','na')  NOT NULL,
    carro_setasTraseiras Enum('sim','nao','na')  NOT NULL,
    carro_piscaAlerta Enum('sim','nao','na')  NOT NULL,
    carro_luzFreio Enum('sim','nao','na')  NOT NULL,
    carro_luzRe Enum('sim','nao','na')  NOT NULL,
    carro_sireneRe Enum('sim','nao','na')  NOT NULL,
    carro_extintor Enum('sim','nao','na')  NOT NULL,
    carro_step Enum('sim','nao','na')  NOT NULL,
    carro_triangulo Enum('sim','nao','na')  NOT NULL,
    carro_macaco Enum('sim','nao','na')  NOT NULL,
    carro_chaveRoda Enum('sim','nao','na')  NOT NULL,
    carro_capaceteSeguranca Enum('sim','nao','na')  NOT NULL,
    carro_coleteSeguranca Enum('sim','nao','na')  NOT NULL,
    carro_botaSeguranca Enum('sim','nao','na')  NOT NULL,
    carro_fotoGeral1 varchar(255)  NOT NULL,
    carro_fotoGeral2 varchar(255)  NOT NULL,
    carro_fotoGeral3 varchar(255)  NOT NULL,
    carro_fotoGeral4 varchar(255)  NOT NULL,
    carro_observacao varchar(255)  NOT NULL,
    carro_responsavelVistoria varchar(255)  NOT NULL,
    Veiculo_veiculo_id int  NOT NULL,
    CONSTRAINT Carro_pk PRIMARY KEY (carro_id)
);

-- Table: Colaborador
CREATE TABLE Colaborador (
    colaborador_id int  NOT NULL,
    colaborador_tipo Enum('moto','carro')  NOT NULL,
    Motorista_motorista_id int  NOT NULL,
    CONSTRAINT Colaborador_pk PRIMARY KEY (colaborador_id)
);

-- Table: Moto
CREATE TABLE Moto (
    moto_id int  NOT NULL,
    moto_marca varchar(30)  NOT NULL,
    moto_modelo varchar(30)  NOT NULL,
    moto_cor varchar(30)  NOT NULL,
    moto_anoFabricacao varchar(4)  NOT NULL,
    cilindrada varchar(3)  NOT NULL,
    bau Enum('sim','nao')  NOT NULL,
    seguro Enum()  NOT NULL,
    Veiculo_veiculo_id int  NOT NULL,
    CONSTRAINT Moto_pk PRIMARY KEY (moto_id)
);

-- Table: Motorista
CREATE TABLE Motorista (
    motorista_id int  NOT NULL,
    motorista_nome varchar(255)  NOT NULL,
    motorista_cpf varchar(11)  NOT NULL,
    motorista_cnpj varchar(14)  NULL,
    motorista_genero Enum('M','F','NA')  NOT NULL,
    motorista_tipo Enum('agredado','colaborador')  NOT NULL,
    Usuario_usuario_id int  NOT NULL,
    CONSTRAINT Motorista_pk PRIMARY KEY (motorista_id)
);

-- Table: Usuario
CREATE TABLE Usuario (
    usuario_id int  NOT NULL,
    usuario_nome varchar(255)  NOT NULL,
    usuario_email varchar(255)  NOT NULL,
    usuario_senha_hash varchar(30)  NOT NULL,
    CONSTRAINT Usuario_pk PRIMARY KEY (usuario_id)
);

-- Table: Veiculo
CREATE TABLE Veiculo (
    veiculo_id int  NOT NULL,
    veiculo_placa varchar(7)  NOT NULL,
    veiculo_tipo Enum('moto','carro')  NOT NULL,
    Motorista_motorista_id int  NOT NULL,
    CONSTRAINT Veiculo_pk PRIMARY KEY (veiculo_id)
);

-- foreign keys
-- Reference: Agregado_Motorista (table: Agregado)
ALTER TABLE Agregado ADD CONSTRAINT Agregado_Motorista FOREIGN KEY Agregado_Motorista (Motorista_motorista_id)
    REFERENCES Motorista (motorista_id);

-- Reference: Agregado_association_1 (table: AgregadoMoto)
ALTER TABLE AgregadoMoto ADD CONSTRAINT Agregado_association_1 FOREIGN KEY Agregado_association_1 (Agregado_agregado_id)
    REFERENCES Agregado (agregado_id);

-- Reference: Carro_Veiculo (table: Carro)
ALTER TABLE Carro ADD CONSTRAINT Carro_Veiculo FOREIGN KEY Carro_Veiculo (Veiculo_veiculo_id)
    REFERENCES Veiculo (veiculo_id);

-- Reference: Colaborador_Motorista (table: Colaborador)
ALTER TABLE Colaborador ADD CONSTRAINT Colaborador_Motorista FOREIGN KEY Colaborador_Motorista (Motorista_motorista_id)
    REFERENCES Motorista (motorista_id);

-- Reference: Moto_Veiculo (table: Moto)
ALTER TABLE Moto ADD CONSTRAINT Moto_Veiculo FOREIGN KEY Moto_Veiculo (Veiculo_veiculo_id)
    REFERENCES Veiculo (veiculo_id);

-- Reference: Moto_association_1 (table: AgregadoMoto)
ALTER TABLE AgregadoMoto ADD CONSTRAINT Moto_association_1 FOREIGN KEY Moto_association_1 (Moto_moto_id)
    REFERENCES Moto (moto_id);

-- Reference: Motorista_Usuario (table: Motorista)
ALTER TABLE Motorista ADD CONSTRAINT Motorista_Usuario FOREIGN KEY Motorista_Usuario (Usuario_usuario_id)
    REFERENCES Usuario (usuario_id);

-- Reference: Veiculo_Motorista (table: Veiculo)
ALTER TABLE Veiculo ADD CONSTRAINT Veiculo_Motorista FOREIGN KEY Veiculo_Motorista (Motorista_motorista_id)
    REFERENCES Motorista (motorista_id);

-- End of file.

