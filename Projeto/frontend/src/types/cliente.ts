export type Cliente = {
    id: number
    CNPJ: string
    NomeFantasia: string
    PrazoFaturamento: string
    ContatoResponsavel: string
    EmailResponsavel: string
    CNAE: string
    descricaoCNAE: string
    colaborador_id: string
    ultimaCategoria?: string | null
}