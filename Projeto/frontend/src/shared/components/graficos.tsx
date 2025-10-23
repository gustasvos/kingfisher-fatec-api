import * as React from 'react'; 
import { Chart as ReactChart } from 'react-chartjs-2';

import { Chart as ChartJS, ArcElement, LineElement, BarElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ChartData, ChartOptions, ChartType } from 'chart.js';

// Registro dos elementos
ChartJS.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
);

interface GraficosProps {
    type: ChartType;
    data: ChartData;
    options?: ChartOptions;
}

const Graficos: React.FC<GraficosProps> = ({ type, data, options = {} }) => {

    const defaultOptions: ChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        ...options,
    };

    // Estrutura básica do componente
    return (
        <div style={{ position: 'relative', height: '40vh', width: '90%' }}>
            <ReactChart
                type={type}
                data={data as ChartData<ChartType>}
                options={defaultOptions as ChartOptions<ChartType>}
            />
        </div>
    );
};

export default Graficos;