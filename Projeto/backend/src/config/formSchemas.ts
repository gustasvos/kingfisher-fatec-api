export interface FormField {
  name: string;
  required: boolean;
  regex?: RegExp;
  unique?: boolean
}

export const cadastroPessoaSchema: FormField[] = [
  { name: 'name', required: true },
  { name: 'email', required: true, regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, unique: true },
  { name: 'cpf', required: true, regex: /^\d{11}$/, unique: true },
  { name: 'imagePaths', required: false } // imagePaths: array dos caminhos das imagens
];
