export interface FormField {
  name: string;
  required: boolean;
  regex?: RegExp;
  unique?: boolean;
  type?: "string" | "number" | "boolean" | "date";
}

export const checklistFormSchema: FormField[] = [
  { name: "nome", required: true, type: "string" },
  { name: "placaVeiculo", required: false, regex: /^[A-Z]{3}\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/i, type: "string" }, // aceita formato antigo e Mercosul
  { name: "kmInicial", required: false, type: "number" },
  { name: "cidadeDestino", required: false, type: "string" },
  { name: "kmFinal", required: false, type: "number" },
  { name: "abastecimento", required: false, type: "boolean" },
  { name: "comprovanteEnviado", required: false, type: "boolean" },
  { name: "oleoMotor", required: false, type: "boolean" },
  { name: "reservatorioAgua", required: false, type: "boolean" },
  { name: "sistemaEletrico", required: false, type: "boolean" },
  { name: "estadoPneus", required: false, type: "boolean" },
  { name: "limpeza", required: false, type: "boolean" },
  { name: "macaco", required: false, type: "boolean" },
  { name: "chaveRoda", required: false, type: "boolean" },
  { name: "documentoVigente", required: false, type: "boolean" },
  { name: "dataHoraEncerramento", required: true, type: "date" },
  { name: "observacoes", required: false, type: "string" }
];
