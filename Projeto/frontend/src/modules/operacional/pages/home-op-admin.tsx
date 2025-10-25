import React, { useState, useEffect, useCallback } from 'react';
import HighlightCard from '../../../shared/components/highlight-card';
import { FiDollarSign, FiUsers, FiAlertTriangle, FiPackage, FiInfo } from 'react-icons/fi';

// 1. Definição do Tipo para os Dados do Dashboard
interface DashboardData {
  totalVendas: number;
  novosUsuarios: number;
  ticketsPendentes: number;
  estoqueBaixo: number;
  ultimasInfos: string;
}

// 2. Mock de Dados (Simulando a API)
const mockFetchData = (): Promise<DashboardData> => {
  return new Promise((resolve) => {
    // Simula um atraso de rede
    setTimeout(() => {
      resolve({
        totalVendas: 15450.90,
        novosUsuarios: 128,
        ticketsPendentes: 5,
        estoqueBaixo: 45,
        ultimasInfos: "Lançamento v2.1 em 10 dias.",
      });
    }, 1500); // 1.5 segundos de carregamento
  });
};

const HomeOpAdminPage: React.FC = () => {
  // === 3. Use States Faltantes para Gerenciamento de Dados e Estado ===
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar os dados
  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await mockFetchData();
      setData(result);
    } catch (e) {
      setError("Falha ao carregar os dados do dashboard. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }, []); 

  // === 4. useEffect para Executar a Busca de Dados (Montagem do Componente) ===
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);


  // === 5. Renderização Condicional ===
  if (error) {
    return (
      <div className="p-8 text-red-700 bg-red-100 border border-red-400 rounded-md m-4">
        <h2 className="text-lg font-semibold">Erro ao Carregar Dashboard</h2>
        <p>{error}</p>
        <button 
          onClick={fetchDashboardData} 
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  // Define um placeholder para o estado de carregamento
  const LoadingCard = (
    <div className="animate-pulse p-6 rounded-xl min-w-64 m-2 shadow-lg bg-gray-100 h-32">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-8 bg-gray-300 rounded w-1/2"></div>
    </div>
  );

  // Se estiver carregando, mostra o placeholder para todos os 4 cards
  if (isLoading) {
    return (
      <div className="p-8">
        <h1>Dashboard de Métricas</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {LoadingCard}
          {LoadingCard}
          {LoadingCard}
          {LoadingCard}
        </div>
      </div>
    );
  }
  
  // Garante que 'data' não é nulo antes de usá-lo
  if (!data) return null; 

  // Formatador para moeda (A boa prática seria usar um hook ou utilitário)
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  // === 6. Renderização Principal (Após Carregamento) ===
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard de Métricas</h1>
      
      {/* Grid de Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        
        <HighlightCard
          title="Total de Vendas"
          // Formata o valor antes de passar para o Card
          value={formatCurrency(data.totalVendas)} 
          subtitle="Aumento de 5% em relação ao mês anterior"
          variant="primary"
          icon={<FiDollarSign className="text-3xl" />} 
          onClick={() => console.log('Navegar para Relatório de Vendas')}
        />

        <HighlightCard
          title="Novos Usuários"
          value={data.novosUsuarios}
          subtitle="Total na última semana"
          variant="success"
          icon={<FiUsers className="text-3xl" />} 
        />
        
        <HighlightCard
          title="Tickets Pendentes"
          value={data.ticketsPendentes}
          subtitle="Urgência alta"
          variant="danger"
          icon={<FiAlertTriangle className="text-3xl" />}
        />

        <HighlightCard
          title="Itens c/ Estoque Baixo"
          value={data.estoqueBaixo}
          subtitle="Verificar reposição urgente"
          variant="warning"
          icon={<FiPackage className="text-3xl" />}
        />
        
      </div>
      
      {/* Exemplo de uso da Info Card */}
      <div className="mt-8">
        <HighlightCard
          title="Informações do Sistema"
          value="Status: OK"
          subtitle={data.ultimasInfos}
          variant="info"
          icon={<FiInfo className="text-3xl" />}
        />
      </div>
      
      {/* Aqui iriam os gráficos, também gerenciados por seus próprios useStates */}

    </div>
  );
};

export default HomeOpAdminPage;