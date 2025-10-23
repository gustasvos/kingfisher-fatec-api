import * as React from 'react'; 
import { ChartData, ChartOptions } from 'chart.js';
import Graficos from './graficos';

interface PieChartData {
    labels: string[]; 
    data: number[];   
    title: string;    
    backgroundColors?: string[];
    hoverColors?: string[];
}

const PieChart: React.FC<PieChartData> = ({ 
    labels, 
    data, 
    title, 
    backgroundColors, 
    hoverColors 
}) => {

    const defaultColors = [
        'rgba(255, 99, 132, 0.8)', 
        'rgba(54, 162, 235, 0.8)', 
        'rgba(255, 206, 86, 0.8)', 
        'rgba(75, 192, 192, 0.8)', 
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)', 
    ];

    const chartData: ChartData<'pie'> = {
        labels: labels,
        datasets: [
            {
                label: title,
                data: data,
                backgroundColor: backgroundColors || defaultColors,
                hoverBackgroundColor: hoverColors || backgroundColors || defaultColors,
                borderColor: '#fff',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions: ChartOptions<'pie'> = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: title,
                font: {
                    size: 16,
                }
            },
            legend: {
                position: 'right' as const, 
            },
            tooltip: {
                callbacks: {
                    label: ({ label, raw }) => {
                        const total = data.reduce((sum, value) => sum + value, 0);
                        const percentage = ((raw as number / total) * 100).toFixed(1);
                        return `${label}: ${raw} (${percentage}%)`;
                    },
                },
            },
        },
    };

    return (
        <Graficos 
            type="pie" 
            data={chartData} 
            options={chartOptions} 
        />
    );
};

export default PieChart;