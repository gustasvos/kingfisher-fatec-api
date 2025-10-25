import { createObjectCsvWriter } from 'csv-writer';
import fs from 'fs/promises';
import { parse } from 'csv-parse/sync';
import { FormField } from '../config/formSchemas';

export type GenericDataRow = Record<string, any>;

//Escreve uma linha de dados no CSV, com base no esquema.
export async function writeDataRow(
  row: GenericDataRow,
  schema: FormField[],
  filePath: string
): Promise<void> {
  const fileExists = await fs
    .access(filePath)
    .then(() => true)
    .catch(() => false);

  const csvWriter = createObjectCsvWriter({
    path: filePath,
    header: schema.map((field) => ({
      id: field.name,
      title:(field.name),
    })),
    append: fileExists,
  });

  await csvWriter.writeRecords([row]);
}

//Lê o CSV inteiro e retorna como array de objetos.
export async function readCsv(filePath: string): Promise<GenericDataRow[]> {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const records = parse(content, {
      columns: header => header.map(h => h.trim().toLowerCase()), // Normaliza
      skip_empty_lines: true,
    }) as GenericDataRow[];
    return records;
  } catch (err) {
    return [];
  }
}


