import { readCsv } from './csvService';
import { FormField } from '../config/formSchemas';

interface ValidationError {
  field: string;
  message: string;
}

export async function validateFormData(
  data: Record<string, any>,
  schema: FormField[],
  csvPath: string
): Promise<ValidationError | null> {
  // Regra especial: CPF ou CNPJ obrigatório
  const cpf =
    String(data["cpf"] ?? "").trim() ||
    String(data["cpf-motorista"] ?? "").trim() ||
    String(data["cpf-usuario"] ?? "").trim();
    
  const cnpj = String(data["cnpj"] ?? "").trim();

  if (!cpf && !cnpj) {
    return {
      field: "cpf/cnpj",
      message: "É necessário preencher CPF ou CNPJ."
    };
  }

  // Lê dados salvos
  const registros = await readCsv(csvPath);

  for (const field of schema) {
    const valorOriginal = data[field.name];
    const valor = String(valorOriginal ?? '').trim();

    // 1. Validação de campo obrigatório
    if (field.required && !valor) {
      return { field: field.name, message: `Campo obrigatório "${field.name}" não preenchido.` };
    }

    // 2. Validação por regex (formato)
    if (field.regex && valor && !field.regex.test(valor)) {
      return { field: field.name, message: `Formato inválido para o campo "${field.name}".` };
    }

    // 3. Validação de valor único
    if (field.unique && valor) {
      const valorExiste = registros.some(r => {
        const registrado = (r[field.name] ?? '').trim().toLowerCase();
        return registrado === valor.toLowerCase();
      });

      if (valorExiste) {
        return { field: field.name, message: `Valor do campo "${field.name}" já está cadastrado.` };
      }
    }
  }

  return null; // tudo válido
}
