import React, { useState, useEffect, useCallback } from 'react';
import HighlightCard from '../../../shared/components/highlight-card';
import { FiDollarSign, FiUsers, FiAlertTriangle, FiPackage, FiInfo } from 'react-icons/fi';
import { FaCarSide, FaMotorcycle, FaCheck } from 'react-icons/fa'
import Navbar from '../../../shared/components/navbar';
import PieChart from '../../../shared/components/grafico-setor';
import Header from '../../../shared/components/header';

// Definição da estrutura do usuário
interface UserData {
  name: string;
  role: string;
}

// Estado inicial
const initialUser: UserData = {
  name: "Carregando...",
  role: "",
};
// Definição da estrutura de dados esperada do backend
interface DashboardData {
  agregadosVeiculosAtivos: number;  //número total de agregados (veículos) ativos
  agregadosMotoAtivos: number;      //número total de agregados (moto) ativos
  frotaNewe: number;                //número total de veículos da newe
  novosAgregados: number;           //número total de novos agregados cadastrados nos últimos 30 dias

  graficoTipoVeiculos: {            //gráfico que mostra a quantidade de cada tipo de veículo de agregado
    labels: string[];
    data: number[];
    backgroundColors: string[];
    title: string;
  }

  graficoVeiculosAptos: {       //gráfico que mostra a quantidade de veículos aptos da frota newe
    labels: string[];
    data: number[];
    backgroundColors: string[];
    title: string;
  }
}

// estado inicial
const initialState: DashboardData = {
  agregadosVeiculosAtivos: 0,
  agregadosMotoAtivos: 0,
  frotaNewe: 0,
  novosAgregados: 0,

  graficoTipoVeiculos: {
    labels: ['FIORINO', 'VAN', 'VUC', '3/4', 'TOCO', 'TRUCK', 'CARRETA'],
    data: [0, 0, 0, 0, 0, 0, 0],
    backgroundColors: ['#135B78', '#CCCCCC'],
    title: 'Quantidade de Veículos Agregados Por Categoria'
  },

  graficoVeiculosAptos: {
    labels: ['Aptos', 'Não Aptos'],
    data: [0, 0],
    backgroundColors: ['#135B78', '#CCCCCC'],
    title: 'Veículos Aptos - Frota Newe'
  }
};

const API_URL = 'http://localhost:8080/dashboard-op'; 
const USER_API_URL = 'http://localhost:8080/user/me';

const HomeOpAdminPage: React.FC = () => {
  const [data, setData] = useState<DashboardData>(initialState); // Inicializa o estado com a estrutura de dados vazia
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserData>(initialUser);
  const [userLoading, setUserLoading] = useState(true);

  // fetch dados do dashboard
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error('Falha ao carregar dados do dashboard.');
      }

      const result: DashboardData = await response.json();
      setData(result);

    } catch (err) {
      console.error("Erro ao buscar dados:", err);
      setError('Não foi possível carregar os dados. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch Dados do Usuário
    const fetchUser = useCallback(async () => {
        setUserLoading(true);
        try {
            const response = await fetch(USER_API_URL, {
                headers: {
                    'Authorization': 'Bearer SEU_TOKEN_AQUI' // Exemplo
                }
            });
            if (!response.ok) {
                throw new Error('Falha ao carregar dados do usuário.');
            }
            const userData: UserData = await response.json();
            setUser(userData);
        } catch (err) {
            console.error("Erro ao buscar dados do usuário:", err);
        } finally {
            setUserLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData(); // Busca dados do dashboard
        fetchUser(); // Busca dados do usuário
    }, [fetchData, fetchUser]);

  // Cálculos
  // Total de veículos e motos de agregados
  const frotaTotalAgregados = data.agregadosVeiculosAtivos + data.agregadosMotoAtivos;

  // Cálculo para o Card "Agregados Veículos Ativos"
  const percentualVeiculosAgregados = frotaTotalAgregados > 0
    ? ((data.agregadosVeiculosAtivos / frotaTotalAgregados) * 100).toFixed(1)
    : '0.0';
  const subtitleAgregadosVeiculos = `${percentualVeiculosAgregados}% do total de Agregados (${frotaTotalAgregados} ativos).`;


  // Cálculo para o Card "Agregados Motos Ativos"
  const percentualMotosAgregados = frotaTotalAgregados > 0
    ? ((data.agregadosMotoAtivos / frotaTotalAgregados) * 100).toFixed(1)
    : '0.0';
  const subtitleAgregadosMotos = `${percentualMotosAgregados}% do total de Agregados (${frotaTotalAgregados} ativos).`;


  // Cálculo para o Card "Frota Newe Aptos"
  const veiculosAptosNewe = data.graficoVeiculosAptos.data[0];
  const percentualAptosNewe = data.frotaNewe > 0
    ? ((veiculosAptosNewe / data.frotaNewe) * 100).toFixed(1)
    : '0.0';
  const subtitleFrotaApta = `${percentualAptosNewe}% da frota total Newe (${data.frotaNewe} veículos).`;


  // Cálculo para o Card "novosAgregados"
  const novosAgregados = data.novosAgregados;
  const subtitleNovosAgregados = `Total de novos agregados nos últimos 30 dias.`;

  if (loading) {
    return <div className="p-8 text-black">Carregando dados...</div>;
  }
  if (error) {
    return <div className="p-8 text-red-600">Erro: {error}</div>;
  }

  // Renderização Principal
  return (
    <>
      <Navbar />
      <header>
        <Header user={user} />
      </header>

      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ml-10">
        {/* Card 1: Agregados Veículos Ativos */}
        <HighlightCard
          title="Agregados (Carros/Vans)"
          value={data.agregadosVeiculosAtivos}
          subtitle={subtitleAgregadosVeiculos}
          variant="primary"
          icon={FaCarSide}
        />

        {/* Card 2: Agregados Motos Ativos */}
        <HighlightCard
          title="Agregados (Motos)"
          value={data.agregadosMotoAtivos}
          subtitle={subtitleAgregadosMotos}
          variant="primary"
          icon={FaMotorcycle}
        />

        {/* Card 3: Frota Newe Aptos */}
        <HighlightCard
          title="Frota Newe Aptos"
          value={veiculosAptosNewe}
          subtitle={subtitleFrotaApta}
          variant="primary"
          icon={FaCheck}
        />

        {/* Card 4: Motoristas Newe */}
        <HighlightCard
          title="Novos agregados (30 dias)"
          value={data.novosAgregados}
          subtitle={subtitleNovosAgregados}
          variant="info"
          icon={FiInfo}
        />
      </div >
      <div className='flex flex-col lg:flex-row justify-center gap-10 mt-0 mb-6 ml-20 w-[97.5%]'>
        <div className="p-8 w-[90%] rounded-lg bg-white drop-shadow-lg">
          <PieChart
            title={data.graficoTipoVeiculos.title}
            labels={data.graficoTipoVeiculos.labels}
            data={data.graficoTipoVeiculos.data}
            backgroundColors={data.graficoTipoVeiculos.backgroundColors}
          />
        </div>
        <div className="p-8 w-[90%] rounded-lg bg-white drop-shadow-lg mr-20">
          <PieChart
            title={data.graficoVeiculosAptos.title}
            labels={data.graficoVeiculosAptos.labels}
            data={data.graficoVeiculosAptos.data}
            backgroundColors={data.graficoVeiculosAptos.backgroundColors}
          />
        </div>
      </div>
    </>
  );
};

export default HomeOpAdminPage;