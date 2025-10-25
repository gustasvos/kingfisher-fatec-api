import * as fs from 'fs';
import csv from 'csv-parser';
import * as path from 'path';
import { DashboardData } from '../types/dashboardOp';
import { promises as fsPromises } from 'fs';

// diretório de dados
const CSV_FILE_PATH = path.join(__dirname, '..', '..', 'data');

// estrutura de dados para dashboard operacional (adm)
interface DashboardRow {
  isAgregado: boolean;
  isNewe: boolean;
  tipoVeiculo: string;
  dataCadastro: Date;
  isAptoNewe: boolean | null;
}

// função para ler arquivo csv
const readCsvFile = (filePath: string): Promise<any[]> => {
  const fileResults: any[] = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data: any) => fileResults.push(data))
      .on('end', () => resolve(fileResults))
      .on('error', (err) => {
        console.error(`Erro ao processar o arquivo ${path.basename(filePath)}:`, err.message);
        resolve([]);
      });
  });
};

// normaliza uma linha de Checklist de Veículos Agregados
const mapAgregadoCarroToDashboardRow = (row: any): DashboardRow | null => {
  const tipo = String(row['tipo-veiculo']).toUpperCase();
  const nomeMotorista = row['name'];
  if (!nomeMotorista || !tipo) return null;
  return {
    isAgregado: true,
    isNewe: false,
    tipoVeiculo: tipo,
    dataCadastro: new Date(),
    isAptoNewe: null,
  };
};

// normaliza uma linha de Checklist de Agregados (Moto).
const mapAgregadoMotoToDashboardRow = (row: any): DashboardRow | null => {
  const marca = row['marca'];
  const dataNascimentoStr = row['data-nascimento'];

  if (!dataNascimentoStr || !row['data-nascimento'])
    return null;

  return {
    isAgregado: true,
    isNewe: false,
    tipoVeiculo: 'MOTO',
    dataCadastro: new Date(dataNascimentoStr),
    isAptoNewe: null,
  };
};


// normaliza uma linha de Checklist Diário - Frota Newe, incluindo o cálculo de Aptidão.
const mapFrotaNeweToDashboardRow = (row: any): DashboardRow | null => {
  const placa = row['placa-veiculo']; 
  if (!placa) return null;

  // Colunas de verificação da aptidão
  const aptidaoFields = [
    'oleo-motor-ok',
    'reservatorio-agua-ok',
    'sistema-eletrico-ok',
    'estado-pneus-ok',
    'limpeza-bau-sider-cabine-ok', 
    'lubrificacao-suspensoes-ok',
    'macaco-ok',
    'chave-roda-ok',
    'documento-vigente-ok',
  ];

  let isAptoNewe = true;

  for (const field of aptidaoFields) {
    const value = String(row[field]).toUpperCase().trim();
    if (value === 'NÃO') {
      isAptoNewe = false;
      break;
    }
  }

  const dataEncerramentoStr = row['data-horario-encerramento'];

  return {
    isAgregado: false,
    isNewe: true,
    tipoVeiculo: String(placa),
    dataCadastro: dataEncerramentoStr ? new Date(dataEncerramentoStr) : new Date(),
    isAptoNewe: isAptoNewe,
  };
};


// Função principal para processar todos os CSVs e agregar os dados
export const processCsvData = async (): Promise<DashboardData> => {
  let allNormalizedRows: DashboardRow[] = [];

  try {
    const files = await fsPromises.readdir(CSV_FILE_PATH);
    const csvFiles = files.filter(file => file.endsWith('.csv'));

    const readPromises = csvFiles.map(async file => {
      const filePath = path.join(CSV_FILE_PATH, file);
      const rawRows = await readCsvFile(filePath);

      // Identificação e Mapeamento do Tipo de CSV 
      if (file.toLowerCase().includes('veculos_agregados')) {
        return rawRows.map(mapAgregadoCarroToDashboardRow).filter((r): r is DashboardRow => r !== null);
      } else if (file.toLowerCase().includes('agregadosmoto')) {
        return rawRows.map(mapAgregadoMotoToDashboardRow).filter((r): r is DashboardRow => r !== null);
      } else if (file.toLowerCase().includes('frota_newe')) {
        return rawRows.map(mapFrotaNeweToDashboardRow).filter((r): r is DashboardRow => r !== null);
      }

      return [];
    });

    const resultsArrays = await Promise.all(readPromises);
    allNormalizedRows = resultsArrays.flat();

  } catch (err) {
    console.error("Erro fatal ao ler o diretório de dados.", err);
  }


  // LÓGICA DE AGREGAÇÃO UNIFICADA
  let agregadosVeiculosAtivos = 0;
  let agregadosMotoAtivos = 0;
  let frotaNewe = 0;
  let aptosNeweCount = 0;
  let novosAgregados = 0;

  const tipoVeiculoCounts: { [key: string]: number } = {};

  const trintaDiasAtras = new Date();
  trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30);

  const tiposVeiculoAgregadoPadrao = ['FIORINO', 'VAN', 'VUC', '3/4', 'TOCO', 'TRUCK', 'CARRETA'];
  const backgroundColorsPadrao = ['#135B78', '#CCCCCC', '#A3D5D5', '#3C7070', '#856A5A', '#D4B996', '#9B5B24'];


  allNormalizedRows.forEach(row => {
    if (row.isAgregado) {
      if (row.tipoVeiculo === 'MOTO') {
        agregadosMotoAtivos++;
      } else {
        agregadosVeiculosAtivos++;

        if (tiposVeiculoAgregadoPadrao.includes(row.tipoVeiculo)) {
          tipoVeiculoCounts[row.tipoVeiculo] = (tipoVeiculoCounts[row.tipoVeiculo] ?? 0) + 1;
        }
      }

      if (row.dataCadastro >= trintaDiasAtras) {
        novosAgregados++;
      }
    }

    if (row.isNewe) {
      frotaNewe++;
      if (row.isAptoNewe === true) {
        aptosNeweCount++; // Contagem de aptos
      }
    }
  });

  // Geração do Objeto DashboardData
  const veiculosNaoAptosNewe = frotaNewe - aptosNeweCount;

  const graficoTipoVeiculosLabels = tiposVeiculoAgregadoPadrao.filter(label => (tipoVeiculoCounts[label] ?? 0) > 0);
  const graficoTipoVeiculosData = graficoTipoVeiculosLabels.map(label => tipoVeiculoCounts[label] ?? 0);

  const dashboardData: DashboardData = {
    agregadosVeiculosAtivos,
    agregadosMotoAtivos,
    frotaNewe,
    novosAgregados,

    graficoTipoVeiculos: {
      labels: graficoTipoVeiculosLabels.length > 0 ? graficoTipoVeiculosLabels : ['Outros'],
      data: graficoTipoVeiculosData.length > 0 ? graficoTipoVeiculosData : [0],
      backgroundColors: graficoTipoVeiculosLabels.map((_, index) => backgroundColorsPadrao[index % backgroundColorsPadrao.length]!),
      title: 'Quantidade de Veículos Agregados Por Categoria'
    },

    graficoVeiculosAptos: {
      labels: ['Aptos', 'Não Aptos'],
      data: [aptosNeweCount, veiculosNaoAptosNewe],
      backgroundColors: ['#135B78', '#CCCCCC'],
      title: 'Veículos Aptos - Frota Newe'
    }
  };

  return dashboardData;
};