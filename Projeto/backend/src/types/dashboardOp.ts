export interface ChartData {
    labels: string[];
    data: number[];
    backgroundColors: string[];
    title: string;
  }
  
  export interface DashboardData {
    agregadosVeiculosAtivos: number; 
    agregadosMotoAtivos: number;     
    frotaNewe: number;               
    novosAgregados: number;         
  
    graficoTipoVeiculos: ChartData;
    graficoVeiculosAptos: ChartData;
  }