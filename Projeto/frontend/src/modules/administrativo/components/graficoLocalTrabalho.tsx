import React, { useEffect, useState } from "react";
import instance from "../../../services/api";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface EstatisticaLocal {
  local: string;
  quantidade: number | string;
}

interface GraficoLocalTrabalhoProps {
  periodo?: "hoje" | "30dias";
  titulo: string;
}

const GraficoLocalTrabalho: React.FC<GraficoLocalTrabalhoProps> = ({
  periodo = "hoje",
  titulo,
}) => {
  const [dados, setDados] = useState<EstatisticaLocal[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    setCarregando(true);
    instance
      .get(`/usuario-local/estatisticas?periodo=${periodo}`)
      .then((res) => {
        setDados(res.data);
      })
      .catch((err) => console.error("Erro ao buscar estatísticas:", err))
      .finally(() => setCarregando(false));
  }, [periodo]);

  if (carregando) {
    return (
      <div className="flex items-center justify-center h-[250px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
      </div>
    );
  }

  if (dados.length === 0) {
    return (
      <div className="flex items-center justify-center h-[250px] text-gray-500">
        Sem registros para {periodo === "hoje" ? "hoje" : "os últimos 30 dias"}.
      </div>
    );
  }

  const valores = dados.map((d) => Number(d.quantidade));

  const chartData = {
    labels: dados.map((d) => d.local.toUpperCase()),
    datasets: [
      {
        data: valores,
        backgroundColor: ["#135b78", "#1ec384ff"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "#000",
          boxWidth: 20,
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-sm font-semibold mb-2">{titulo}</h3>
      <div className="relative w-[250px] h-[250px]">
        <Pie key={JSON.stringify(valores)} data={chartData} options={options} />
      </div>
    </div>
  );
};

export default GraficoLocalTrabalho;