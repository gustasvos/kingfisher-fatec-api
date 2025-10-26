// Contador.tsx
import React, { useEffect, useState } from "react";

interface ContadorHomeProps {
  eventos: any[]; // Passa os eventos diretamente para o componente
}

const ContadorHome: React.FC<ContadorHomeProps> = ({ eventos }) => {
  const [statusCounts, setStatusCounts] = useState({
    confirmado: 0,
    recusado: 0,
    aguardando: 0,
  });

  useEffect(() => {
    const counts = { confirmado: 0, recusado: 0, aguardando: 0 };

    eventos.forEach((evento: any) => {
      evento.participantes.forEach((participante: any) => {
        const status = participante.status?.toLowerCase();

        if (status === "confirmado") counts.confirmado++;
        else if (status === "recusado") counts.recusado++;
        else if (status === "pendente") counts.aguardando++;
        else counts.aguardando++; // Qualquer outro status é considerado aguardando
      });
    });

    setStatusCounts(counts);
  }, [eventos]); // Recalcula quando os eventos mudam

  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="p-3 rounded bg-white text-black text-center">
        <div className="text-sm">Confirmado</div>
        <div className="font-bold text-lg">{statusCounts.confirmado}</div>
      </div>
      <div className="p-3 rounded bg-white text-black text-center">
        <div className="text-sm">Recusado</div>
        <div className="font-bold text-lg">{statusCounts.recusado}</div>
      </div>
      <div className="p-3 rounded bg-white text-black text-center">
        <div className="text-sm">Aguardando</div>
        <div className="font-bold text-lg">{statusCounts.aguardando}</div>
      </div>
    </div>
  );
};

export default ContadorHome;
