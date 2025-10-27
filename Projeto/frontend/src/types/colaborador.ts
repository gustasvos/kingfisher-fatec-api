export type Colaborador = {
  id: number;
  nome: string;
  email?: string;
  cargo: string;
  cpf: string;
  genero?: string;
  data_nascimento?: string;
  senha?: string;
  data_contratacao?: string;
  role?: string;
}