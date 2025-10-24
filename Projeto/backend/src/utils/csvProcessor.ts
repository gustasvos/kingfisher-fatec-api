// meu-projeto/backend/src/utils/csvProcessor.ts
import * as fs from 'fs';
import * as csv from 'csv-parser';
import * as path from 'path';
import { DashboardData } from '../types/dashboardOp';

const CSV_FILE_PATH = path.join(__dirname, '..', '..', 'data', 'dashboard_data.csv');

interface CsvRow {
  id: string;
  tipo: string;
  isAgregado: 'true' | 'false';
  isNewe: 'true' | 'false';
  isApto: 'true' | 'false';
  dataCadastro: string; // YYYY-MM-DD
}

export const processCsvData = async (): Promise<DashboardData> => {
  const results: CsvRow[] = [];
  
  // Lê o CSV
  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(CSV_FILE_PATH)
      .pipe(csv())
      .on('data', (data: CsvRow) => results.push(data))
      .on('end', () => resolve())
      .on('error', (err) => reject(new Error(`Erro ao ler o CSV: ${err.message}`)));
  });

  // Processa/agrega os dados
  let agregadosVeiculosAtivos = 0;
  let agregadosMotoAtivos = 0;
  let frotaNewe = 0;
  let aptosNewe = 0;
  const tipoVeiculoCounts: { [key: string]: number } = {};
  
  const trintaDiasAtras = new Date();
  trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30);
  let novosAgregados = 0; 
  
  const tiposVeiculoAgregadoPadrao = ['FIORINO', 'VAN', 'VUC', '3/4', 'TOCO', 'TRUCK', 'CARRETA'];
  const backgroundColorsPadrao = ['#135B78', '#CCCCCC', '#A3D5D5', '#3C7070', '#856A5A', '#D4B996', '#9B5B24'];


  results.forEach(row => {
    const isAgregado = row.isAgregado === 'true';
    const isNewe = row.isNewe === 'true';
    const tipo = row.tipo.toUpperCase();

    if (isAgregado) {
      const dataCadastro = new Date(row.dataCadastro);
      
      // Contagem de novos agregados (últimos 30 dias)
      if (dataCadastro >= trintaDiasAtras) {
        novosAgregados++;
      }
      
      // Contagem geral de agregados
      if (tipo === 'MOTO') {
        agregadosMotoAtivos++;
      } else {
        agregadosVeiculosAtivos++;
        // Contagem para o gráfico de tipo de veículo
        tipoVeiculoCounts[tipo] = (tipoVeiculoCounts[tipo] || 0) + 1;
      }
    }

    if (isNewe) {
      frotaNewe++;
      if (row.isApto === 'true') {
        aptosNewe++;
      }
    }
  });

  // Formata a saída para DashboardData
  const graficoTipoVeiculosLabels = tiposVeiculoAgregadoPadrao.filter(label => tipoVeiculoCounts[label] > 0);
  const graficoTipoVeiculosData = graficoTipoVeiculosLabels.map(label => tipoVeiculoCounts[label] || 0);

  const dashboardData: DashboardData = {
    agregadosVeiculosAtivos,
    agregadosMotoAtivos,
    frotaNewe,
    novosAgregados,
    
    graficoTipoVeiculos: {
      labels: graficoTipoVeiculosLabels.length > 0 ? graficoTipoVeiculosLabels : ['Outros'],
      data: graficoTipoVeiculosData.length > 0 ? graficoTipoVeiculosData : [0],
      backgroundColors: graficoTipoVeiculosLabels.map((_, index) => backgroundColorsPadrao[index % backgroundColorsPadrao.length]),
      title: 'Quantidade de Veículos Agregados Por Categoria'
    },
    
    graficoVeiculosAptos: {
      labels: ['Aptos', 'Não Aptos'],
      data: [aptosNewe, frotaNewe - aptosNewe],
      backgroundColors: ['#135B78', '#CCCCCC'],
      title: 'Veículos Aptos - Frota Newe'
    }
  };

  return dashboardData;
};