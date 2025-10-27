// GraficoHome.tsx
import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

interface GraficoHomeProps {
  data: { labels: string[]; values: number[] };
}

const GraficoHome: React.FC<GraficoHomeProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    chartRef.current = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels: data.labels,
        datasets: [
          {
            data: data.values,
            backgroundColor: "#135b78",
            borderRadius: 6,
            barThickness: 26,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        scales: { x: { grid: { display: false } }, y: { grid: { display: false } } },
        plugins: { legend: { display: false } },
      },
    });

    return () => chartRef.current?.destroy();
  }, [data]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
};

export default GraficoHome;
