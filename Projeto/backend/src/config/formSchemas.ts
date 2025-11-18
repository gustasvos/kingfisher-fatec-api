// ------------------------------------------
// Nova definição de Interface para maior clareza
// ------------------------------------------
export interface FormField {
  name: string;
  required: boolean;
  regex?: RegExp;
  unique?: boolean;
  type?: "string" | "number" | "boolean" | "date" | "radio" | "upload"; 
  options?: string[]; 
}

// ------------------------------------------
// Helpers e Listas de Opções Comuns
// ------------------------------------------
function escapeForRegex(str: string): string {
  // Escapa caracteres especiais para usar no construtor RegExp
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
}

const TipoVeiculo = [
  'FIORINO', 'VAN', 'VUC', '3/4', 'TOCO', 'TRUCK', 'CARRETA',
  'PICKUP', 'BASCULANTE', 'MUNCK', 'PLATAFORMA', 'BAU',
  'REFRIGERADO', 'SIDER', 'VUC ELETRICO'
];
const ResponsavelVistoria = [
  'Diego Sávio', 'Gabriel Andrade', 'Igor Carvalho', 'Junior Pereira',
  'Luis Oliveira', 'Ruan Hofacher', 'Samuel Lucas', 'Tatiane Dias', 'Outro'
];

const regexTipoVeiculo = new RegExp(`^(${TipoVeiculo.map(escapeForRegex).join('|')})$`, 'i');
const regexResponsavelVistoria = new RegExp(`^(${ResponsavelVistoria.map(escapeForRegex).join('|')})$`, 'i');
const regexSimNaoNa = /^(SIM|NÃO)$/i;
const regexSimNao = /^(SIM|NÃO)$/i;
const regexPlaca = /^([A-Z]{3}[0-9]{4}|[A-Z]{3}[0-9][A-Z][0-9]{2})$/i; 
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexCpf = /^\d{11}$/;
const regexCnpj = /^\d{14}$/;
const regexTelefone = /^\d{10,11}$/; 
const regexCep = /^\d{8}$/;

// ------------------------------------------
// Schemas de Formulário
// ------------------------------------------

// Esquema de cadastro de pessoa (exemplo)
export const cadastroPessoaSchema: FormField[] = [
  { name: 'name', required: true, type: "string" },
  { name: 'email', required: true, regex: regexEmail, unique: true, type: "string" },
  { name: 'cpf', required: true, regex: regexCpf, unique: true, type: "string" },
  { name: 'imagePaths', required: false, type: "upload" }
];


export const checkVeiculosAgregadosSchema: FormField[] = [
  { name: 'formTitle', required: true, type: "string" }, // Identificador (não deve ir para o CSV)
  // Sessão 1: Dados cadastrais
  { name: 'name', required: true, type: "string" }, 
  { name: 'cpf-motorista', required: true, regex: regexCpf, unique: true, type: "string" },
  { name: 'email-motorista', required: true, regex: regexEmail, unique: true, type: "string" },
  { name: 'placa-veiculo', required: false, regex: regexPlaca, unique: true, type: "string" },
  { name: 'tipo-veiculo', required: true, regex: regexTipoVeiculo, type: "radio", options: TipoVeiculo },
  
  // Sessão 2: Motor
  { name: 'nivel-oleo', required: true, regex: regexSimNaoNa, type: "radio" },
  { name: 'vazamento-oleo', required: true, regex: regexSimNaoNa, type: "radio" },
  { name: 'nivel-agua', required: true, regex: regexSimNaoNa, type: "radio" },
  { name: 'foto-motor', required: true, type: "upload" }, 
  { name: 'etiqueta-oleo', required: false, type: "upload" },

  // Sessão 3: Pneus
  { name: 'estado-PDE', required: true, regex: regexSimNao, type: "radio" },
  { name: 'estado-PTE', required: true, regex: regexSimNao, type: "radio" },
  { name: 'estado-PTD', required: true, regex: regexSimNao, type: "radio" },
  { name: 'estado-PDD', required: true, regex: regexSimNao, type: "radio" },
  // O campo "fotos-comprobatorias" é o agrupamento, mas as fotos individuais seguem abaixo.
  // Vou mapear fotos-comprobatorias para o primeiro upload de pneu para manter a obrigatoriedade original se necessário.
  { name: 'foto-PDE', required: true, type: "upload" }, 
  { name: 'foto-PTE', required: true, type: "upload" },
  { name: 'foto-PTD', required: true, type: "upload" },
  { name: 'foto-PDD', required: true, type: "upload" },
  
  // Sessão 4: Conservação | Aparência | Segurança
  { name: 'para-brisa', required: true, regex: regexSimNaoNa, type: "radio" },
  { name: 'cabine-externa', required: true, regex: regexSimNaoNa, type: "radio" },
  { name: 'veiculo-externo', required: true, regex: regexSimNaoNa, type: "radio" },
  { name: 'amassados-ferrugens', required: true, regex: regexSimNaoNa, type: "radio" },
  { name: 'estado-assoalho', required: true, regex: regexSimNaoNa, type: "radio" },
  { name: 'faixas-reflexivas', required: true, regex: regexSimNaoNa, type: "radio" },
  { name: 'limpador-parabrisa', required: true, regex: regexSimNaoNa, type: "radio" },
  { name: 'estado-buzina', required: true, regex: regexSimNaoNa, type: "radio" },
  { name: 'farol-alto', required: true, regex: regexSimNaoNa, type: "radio" },
  { name: 'farol-baixo', required: true, regex: regexSimNaoNa, type: "radio" },
  { name: 'setas-dianteiras', required: true, regex: regexSimNaoNa, type: "radio" },
  { name: 'setas-traseiras', required: true, regex: regexSimNaoNa, type: "radio" },
  { name: 'pisca-alerta', required: true, regex: regexSimNaoNa, type: "radio" },
  { name: 'luz-freio', required: true, regex: regexSimNaoNa, type: "radio" },
  { name: 'liz-re', required: true, regex: regexSimNaoNa, type: "radio" },
  { name: 'sirene-re', required: true, regex: regexSimNaoNa, type: "radio" },
  { name: 'extintor', required: true, regex: regexSimNaoNa, type: "radio" },
  { name: 'step', required: true, regex: regexSimNaoNa, type: "radio" },
  { name: 'triangulo', required: true, regex: regexSimNaoNa, type: "radio" },
  { name: 'macaco', required: true, regex: regexSimNaoNa, type: "radio" },
  { name: 'chave-roda', required: true, regex: regexSimNaoNa, type: "radio" },
  { name: 'capacete-seguranca', required: true, regex: regexSimNaoNa, type: "radio" },
  { name: 'colete-seguranca', required: true, regex: regexSimNaoNa, type: "radio" },
  { name: 'bota-seguranca', required: true, regex: regexSimNaoNa, type: "radio" },
  { name: 'fotos-frente-veiculo', required: true, type: "upload" },
  { name: 'fotos-lateral-dianteira', required: true, type: "upload" }, 
  { name: 'fotos-lateral-esquerda', required: true, type: "upload" },
  { name: 'fotos-traseira-veiculo', required: true, type: "upload" },   
  { name: 'observacoes', required: false, type: "string" },
  { name: 'nome-vistor', required: true, regex: regexResponsavelVistoria, type: "radio", options: ResponsavelVistoria }, 
  { name: 'nome-vistor-outro', required: false, regex: /^[A-Za-zÀ-ú\s]{2,}$/, type: "string" } 
];

// Checklist Diário - Frota Newe
export const checklistDiarioFrotaNeweSchema: FormField[] = [
  { name: 'formTitle', required: true, type: "string" }, // Identificador (não deve ir para o CSV)
  { name: "id-usuario", required: true, type: "string" },
  { name: "cpf-usuario", required: true, regex: regexCpf, type: "string" },
  { name: "timestamp", required: false, type: "date" },
  { name: "nome-motorista", required: true, type: "string" }, 
  { name: "placa-veiculo", required: true, regex: regexPlaca, type: "string" }, 
  { name: "km-inicial", required: true, type: "number" },
  { name: "destino", required: true, type: "string" }, 
  { name: "km-final", required: true, type: "number" },
  { name: "teve-abastecimento", required: false, regex: regexSimNao, type: "radio" }, 
  { name: "comprovante-enviado", required: false, regex: regexSimNao, type: "radio" }, 
  { name: "oleo-motor-ok", required: false, regex: regexSimNao, type: "radio" }, 
  { name: "reservatorio-agua-ok", required: false, regex: regexSimNao, type: "radio" }, 
  { name: "sistema-eletrico-ok", required: false, regex: regexSimNao, type: "radio" }, 
  { name: "estado-pneus-ok", required: false, regex: regexSimNao, type: "radio" }, 
  { name: "limpeza-bau-sider-cabine-ok", required: false, regex: regexSimNao, type: "radio" }, 
  { name: "lubrificacao-suspensoes-ok", required: false, regex: regexSimNao, type: "radio" },
  { name: "macaco-ok", required: false, regex: regexSimNao, type: "radio" }, 
  { name: "chave-roda-ok", required: false, regex: regexSimNao, type: "radio" }, 
  { name: "documento-vigente-ok", required: false, regex: regexSimNao, type: "radio" }, 
  { name: "data-horario-encerramento", required: true, type: "date" }, 
  { name: "observacoes", required: true, type: "string" } 
];

// Forms de gestão de coleta
export const formsGestaoColetaSchema: FormField[] = [
  { name: 'formTitle', required: true, type: "string" }, // Identificador (não deve ir para o CSV)
  { name: "timestamp", required: false, type: "date" },
  { name: 'email', required: true, regex: regexEmail, type: "string" },
  { name: 'qual-cliente', required: true, type: "string" },
  { name: 'quem-solicita', required: true, type: "string" },
  { name: 'oc-pedido-nf', required: true, type: "string" },
  { name: 'data-horario-coleta', required: true, type: "date" },
  { name: 'local-coleta', required: true, type: "string" },
  { name: 'data-hora-entrega', required: true, type: "date" },
  { name: 'local-entrega', required: true, type: "string" },
  { name: 'peso-estimado', required: true, type: "number" },
  { name: 'tipo-veiculo-coleta', required: true, type: "string" },
  { name: 'valor-frete-cobrado', required: true, type: "number" },
  { name: 'observacoes-equipe-adicional', required: false, type: "string" },
];

// Formulário de abertura
export const formularioAberturaSchema: FormField[] = [
  { name: "formTitle", required: true, type: "string" }, // Identificador (não vai para o CSV)
  { name: "id-usuario", required: true, type: "string" },
  { name: "cpf-usuario", required: true, regex: regexCpf, type: "string" },
  { name: "timestamp", required: false, type: "date" },
  { name: "data-abertura-empresa", required: true, type: "date" },
  { name: "abriu-cadeado-correntes-frente", required: true, regex: regexSimNao, type: "radio" },
  { name: "abriu-portao-social", required: true, regex: regexSimNao, type: "radio" },
  { name: "abriu-porta-rolante-armazem", required: true, regex: regexSimNao, type: "radio" },
  { name: "desbloqueou-alarme", required: true, regex: regexSimNao, type: "radio" },
  { name: "apagou-luzes-armazem", required: true, regex: regexSimNao, type: "radio" },
  { name: "acendeu-luzes-operacional", required: false, regex: regexSimNao, type: "radio" },
  { name: "ligou-ar-condicionado", required: false, regex: regexSimNao, type: "radio" },
  { name: "ligou-tv-cameras", required: true, regex: regexSimNao, type: "radio" },
  { name: "ligou-tv-dashboard", required: true, regex: regexSimNao, type: "radio" },
  { name: "coletou-chaves-internas-chaveiro", required: true, regex: regexSimNao, type: "radio" },
  { name: "abriu-porta-banheiro", required: false, regex: regexSimNao, type: "radio" },
  { name: "removeu-cadeado-portao-1", required: false, regex: regexSimNao, type: "radio" },
  { name: "removeu-cadeado-portao-2", required: false, regex: regexSimNao, type: "radio" },
  { name: "posicionou-cone-estacionamento-pcd", required: false, regex: regexSimNao, type: "radio" },
  { name: "ligou-tomada-retirou-plastico-bebedouro", required: true, regex: regexSimNao, type: "radio" },
  { name: "colocou-tapetes-devidos-lugares", required: false, regex: regexSimNao, type: "radio" },
  { name: "fez-cafe-dia", required: true, regex: regexSimNao, type: "radio" },
  { name: "situacao-atipica", required: false, type: "string" }
];

// Formulário de fechamento
export const formularioFechamentoSchema: FormField[] = [
  { name: "formTitle", required: true, type: "string" }, // Identificador (não vai para o CSV)
  { name: "id-usuario", required: true, type: "string" },
  { name: "cpf-usuario", required: true, regex: regexCpf, type: "string" },
  { name: "timestamp", required: false, type: "date" },
  // { name: "quem-esta-preenchendo", required: true, type: "string" },
  { name: "data-fechamento-empresa", required: true, type: "date" },
  { name: "tirou-lixo-organico-cozinha", required: true, regex: regexSimNao, type: "radio" },
  { name: "colocou-lixo-reciclavel-sexta", required: false, regex: regexSimNao, type: "radio" },
  { name: "cozinha-organizada", required: true, regex: regexSimNao, type: "radio" },
  { name: "apagou-luzes-fechou-porta-cozinha", required: true, regex: regexSimNao, type: "radio" },
  { name: "trancou-cadeado-portao-2", required: true, regex: regexSimNao, type: "radio" },
  { name: "trancou-cadeado-portao-1", required: true, regex: regexSimNao, type: "radio" },
  { name: "verificou-torneiras-mictorio", required: true, regex: regexSimNao, type: "radio" },
  { name: "tirou-lixo-banheiro", required: true, regex: regexSimNao, type: "radio" },
  { name: "trancou-porta-banheiro", required: true, regex: regexSimNao, type: "radio" },
  { name: "desligou-tomada-colocou-plastico-bebedouro", required: true, regex: regexSimNao, type: "radio" },
  { name: "deixou-chaves-internas-chaveiro", required: true, regex: regexSimNao, type: "radio" },
  { name: "desligou-tv-cameras", required: true, regex: regexSimNao, type: "radio" },
  { name: "desligou-tv-dashboard", required: true, regex: regexSimNao, type: "radio" },
  { name: "desligou-ar-condicionado", required: true, regex: regexSimNao, type: "radio" },
  { name: "desligou-luzes-escritorio-operacional", required: true, regex: regexSimNao, type: "radio" },
  { name: "acendeu-luzes-armazem", required: true, regex: regexSimNao, type: "radio" },
  { name: "retirou-cone-estacionamento-pcd", required: true, regex: regexSimNao, type: "radio" },
  { name: "acionou-alarme", required: true, regex: regexSimNao, type: "radio" },
  { name: "fechou-porta-entrada-armazem", required: true, regex: regexSimNao, type: "radio" },
  { name: "trancou-cadeado-correntes", required: true, regex: regexSimNao, type: "radio" },
  { name: "portoes-apresentam-ruido-travamento", required: true, regex: regexSimNao, type: "radio" },
  { name: "situacao-atipica", required: true, type: "string" }
];

// checklistCadastroAgregadosMotoSchema.ts
export const cadastroAgregadoMotoSchema: FormField[] = [
  { name: "formTitle", required: true, type: "string" }, // Identificador (não vai para o CSV)
  // Sessão 1: Dados Pessoais
  { name: "genero", required: true, type: "radio" }, // opções: Masculino, Feminino, Prefiro não informar
  { name: "nome-completo-motorista", required: true, type: "string" },
  { name: "cnpj", required: false, type: "string" },
  { name: "cpf", required: true, type: "string" },
  { name: "data-nascimento", required: true, type: "date" },
  { name: "cidade-nascimento", required: true, type: "string" },
  { name: "telefone", required: true, type: "string" },
  { name: "email", required: true, type: "string" }, // se tiver regexEmail, pode adicionar regex: regexEmail
  { name: "rg", required: true, type: "string" },
  { name: "data-emissao-rg", required: true, type: "date" },
  { name: "orgao-expedidor", required: true, type: "string" },
  { name: "nome-do-pai", required: true, type: "string" },
  { name: "nome-da-mae", required: true, type: "string" },
  { name: "pis-pasep", required: true, type: "string" },
  { name: "cep", required: true, type: "string" },
  { name: "endereco", required: true, type: "string" }, // Rua, N°, Bairro e Cidade

  // Sessão 2: Dados da Moto
  { name: "nome-proprietario-veiculo", required: true, type: "string" },
  { name: "placa", required: true, type: "string" },
  { name: "marca", required: true, type: "string" },
  { name: "modelo", required: true, type: "string" },
  { name: "cor", required: true, type: "string" },
  { name: "ano-fabricacao", required: true, type: "string" },
  { name: "cilindrada", required: true, type: "string" },
  { name: "possui-bau-suporte-carga", required: true, regex: regexSimNao, type: "radio" },
  { name: "possui-seguro", required: true, regex: regexSimNao, type: "radio" },

  // Sessão 3: Dados de Frete
  { name: "valor-minimo-por-saida", required: true, type: "string" },
  { name: "valor-minimo-por-km", required: true, type: "string" },
  { name: "possui-curso-moto-frete", required: true, regex: regexSimNao, type: "radio" }
];

export const formularioManutencaoPredialSchema: FormField[] = [
  { name: "formTitle", required: true, type: "string" },
  { name: "timestamp", required: false, type: "date" },

  { name: "data_verificacao", required: false, type: "date" },
  { name: "condicoes_piso_escritorio", required: false, type: "string" },
  { name: "condicoes_piso_operacional", required: false, type: "string" },
  { name: "condicoes_piso_galpao", required: false, type: "string" },
  { name: "condicoes_piso_refeitorio", required: false, type: "string" },

  { name: "condicoes_forro_escritorio", required: false, type: "string" },
  { name: "condicoes_forro_operacional", required: false, type: "string" },
  { name: "condicoes_forro_galpao", required: false, type: "string" },
  { name: "condicoes_forro_refeitorio", required: false, type: "string" },

  { name: "estado_geral_instalacoes_eletricas", required: false, type: "string" },
  { name: "estado_geral_protecao_raios", required: false, type: "string" },

  { name: "carga_ar_condicionado_sala_adm", required: false, type: "radio" },
  { name: "carga_ar_condicionado_sala_diretoria", required: false, type: "radio" },
  { name: "carga_ar_condicionado_sala_reuniao", required: false, type: "radio" },
  { name: "carga_ar_condicionado_sala_operacional", required: false, type: "radio" },

  { name: "lampadas_sala_adm", required: true, type: "radio" },
  { name: "lampadas_sala_diretoria", required: false, type: "radio" },
  { name: "lampadas_sala_reuniao", required: false, type: "radio" },
  { name: "lampadas_sala_operacional", required: false, type: "radio" },
  { name: "lampadas_galpao", required: false, type: "radio" },
  { name: "lampadas_refeitorio", required: false, type: "radio" },
  { name: "lampadas_banheiro_feminino", required: false, type: "radio" },
  { name: "lampadas_banheiro_masculino", required: false, type: "radio" },

  { name: "macanetas_portas", required: false, type: "radio" },
  { name: "mesas_operacional", required: false, type: "radio" },
  { name: "condicoes_paleteiras_carrinho", required: true, type: "string" },
  { name: "organizacao_locais_trabalho", required: true, type: "string" },

  { name: "cameras_seguranca", required: false, type: "radio" },
  { name: "condicoes_balanca_piso", required: true, type: "string" },
  { name: "data_ultima_afericao_balanca", required: true, type: "date" },

  { name: "condicoes_mictorios_lavatorios", required: true, type: "string" },
  { name: "data_ultima_limpeza_bebedouro", required: true, type: "date" },
  { name: "data_proxima_dedetizacao", required: true, type: "date" },

  { name: "data_ultima_recarga_extintores", required: true, type: "date" },
  { name: "data_proxima_recarga_extintores", required: true, type: "date" },
  { name: "data_ultima_limpeza_caixa_dagua", required: true, type: "date" },
  { name: "data_proxima_limpeza_caixa_dagua", required: true, type: "date" },

  { name: "cadeira_ma_condicao", required: false, type: "radio" },
  { name: "descricao_cadeira_ma_condicao", required: false, type: "string" },
  { name: "detalhe_adicional", required: false, type: "string" }
];




// ... (Adicione os demais schemas aqui)

// ------------------------------------------
// Mapa Centralizado de Schemas
// ------------------------------------------

export const allFormSchemas: Record<string, FormField[]> = {
  "Checklist de Veículos Agregados": checkVeiculosAgregadosSchema,
  "Checklist Diário - Frota Newe": checklistDiarioFrotaNeweSchema,
  "Checklist, Forms de gestão de coleta": formsGestaoColetaSchema,
  // Adicione aqui todos os seus novos formulários:
   "Formulário de abertura": formularioAberturaSchema,
  "Formulário de fechamento": formularioFechamentoSchema,
   "Checklist de Cadastro de Agregados(Moto)": cadastroAgregadoMotoSchema,
  "Formulário de manutenção predial": formularioManutencaoPredialSchema
};
