import React, { useState, useEffect, useCallback } from 'react';
import HighlightCard from '../../../shared/components/highlight-card';
import { FiDollarSign, FiUsers, FiAlertTriangle, FiPackage, FiInfo } from 'react-icons/fi';
import { FaCarSide } from 'react-icons/fa'
import Navbar from '../../../shared/components/navbar';
import PieChart from '../../../shared/components/grafico-setor';
import Header from '../../../shared/components/header';


/**
 * mock para o indicador (card) "Veículos Aptos para Operação"
*/
const frotaTotal = 120;
const veiculosAptos = 95;
const percentualAptos = ((veiculosAptos / frotaTotal) * 100).toFixed(1);

const mockVeiculosAptosCard = {
  value: veiculosAptos,
  subtitle: `${percentualAptos}% da frota total (${frotaTotal} veículos).`,
  icon: FaCarSide,
};

/**
 * mock para o header
 */
const mockHeader = {
  user: {
    avatarUrl: '../../assets/usuario.svg',
    name: "NOME_ADMINISTRADOR_OPERACIONAL",
    role: "Administrador",
    email: "operacional@email.com",
  },
};

/**
 * mock gráficos setor e barra
 */
const mockVeiculosAptos = {
  title: 'Veículos Aptos para Operação',
  labels: [
    'Aptos (Óleo, água e elétrica OK)',    // Veículos com Óleo, Água e Elétrica OK
    'Em Manutenção (Não Aptos)', // Veículos com alguma pendência
  ],
  data: [
    75, // 75 Veículos Aptos (ou 75% da frota)
    25, // 25 Veículos Em Manutenção (ou 25% da frota)
  ],
  backgroundColors: [
    '#28A745',
    '#DC3545',
  ],
};

const mockData = {
  agregadosAtivos: 50,
};


const HomeOpAdminPage: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(mockData);


  // Renderização Principal
  return (
    <>
      <Header user={mockHeader.user} placeholderAvatar={mockHeader.user.avatarUrl} />
      <Navbar />

      <div className="p-8 grid grid-cols-4 gap-x-4 ml-10">
        <HighlightCard
          title="Agregados ativos"
          value={mockData.agregadosAtivos}
          subtitle={mockVeiculosAptosCard.subtitle}
          variant="primary"
          icon={FaCarSide}
          onClick={() => console.log('Navegar para Checklist de Agregados')}
        />

        <HighlightCard
          title="Veículos Aptos para Operação"
          value={mockVeiculosAptosCard.value}
          subtitle={mockVeiculosAptosCard.subtitle}
          variant="primary"
          icon={FaCarSide}
          onClick={() => console.log('Navegar para Checklist de Agregados')}
        />

        <HighlightCard
          title="Veículos Aptos para Operação"
          value={mockVeiculosAptosCard.value}
          subtitle={mockVeiculosAptosCard.subtitle}
          variant="primary"
          icon={FaCarSide}
          onClick={() => console.log('Navegar para Checklist de Agregados')}
        />

        <HighlightCard
          title="Veículos Aptos para Operação"
          value={mockVeiculosAptosCard.value}
          subtitle={mockVeiculosAptosCard.subtitle}
          variant="primary"
          icon={FaCarSide}
          onClick={() => console.log('Navegar para Checklist de Agregados')}
        />
      </div >

      <div className="grid grid-cols-2 gap-x-4 mt-6 ml-10 p-10 rounded-lg">
        <PieChart
          title={mockVeiculosAptos.title}
          labels={mockVeiculosAptos.labels}
          data={mockVeiculosAptos.data}
          backgroundColors={mockVeiculosAptos.backgroundColors}
        />
        <PieChart
          title={mockVeiculosAptos.title}
          labels={mockVeiculosAptos.labels}
          data={mockVeiculosAptos.data}
          backgroundColors={mockVeiculosAptos.backgroundColors}
        />
      </div>
    </>
  );
};

export default HomeOpAdminPage;