import React, { useState, useEffect } from 'react';
import HighlightCard from '../../../shared/components/highlight-card';
import { FaRegEdit, FaEye, FaCalendar } from 'react-icons/fa'
import Navbar from '../../../shared/components/navbar';
import Header from '../../../shared/components/header';
import { Link, useNavigate } from 'react-router-dom';
import { Subtitles } from 'lucide-react';
import axios from 'axios';
import { User } from '../../../shared/components/header';
import instance from "../../../services/api";
import Loading from '../../../shared/components/loading';


const HomeOpColabPage: React.FC = () => {
  // Variáveis de definição de formulários
  const checklistsForms = [
    "Checklist Diário - Frota Newe",
    "Checklist, Forms de gestão de coleta",
    "Formulário de abertura",
    "Formulário de fechamento",
    "Formulário de manutenção predial",
  ]

  // ESTADOS
  const [user, setUser] = useState<User | null>(null)
  const [checklistsPreenchidos, setChecklistsPreenchidos] = useState<number | null>(null);
  const [loadingCheck, setLoadingCheck] = useState(true);
  const [eventos, setEventos] = useState<any[]>([])
  const [statusCounts, setStatusCounts] = useState({ total: 0, aguardando: 0 })
  const [eventoResp, setEventoResp] = useState<any[]>([])
  const [eventoRespCount, setEventoRespCount] = useState({ respondido: 0 })
  const [checklistsRestantes, setChecklistsRestantes] = useState(0)
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingEventos, setLoadingEventos] = useState(true);

  // Estado calculado quando os dados mudam
  const [totalForms, setTotalForms] = useState(checklistsForms.length)

  const navigate = useNavigate()
  const storedUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const userId = parsedUser?.id || null;

  // FUNÇÕES DE NAVEGAÇÃO
  const irEventosColaborador = () => { navigate("/eventos-colaborador") }
  const irRespostaEventos = () => { navigate("/resposta-eventos") }
  const irEventos = () => { navigate("/eventos") }
  const irCheckColaborador = () => { navigate("/lista-check-colaborador") }

  // EFEITOS (useEffect)
  // Buscar dados do Usuário
  useEffect(() => {
    if (!userId || !token) {
      setLoadingUser(false);
      console.error("Usuário não autenticado.");
      return;
    }
    const headers = { Authorization: `Bearer ${token}` };
    setLoadingUser(true);

    axios.get(`http://localhost:8080/usuario/${userId}`, { headers })
      .then(res => {
        const userData = res.data;
        setUser({
          nome: userData.nome || "Usuário",
          role: userData.role || "Colaborador",
          email: userData.email || "",
        });
      })
      .catch(err => {
        console.error("Erro ao buscar usuário:", err);
        setUser(null);
      })
      .finally(() => {
        setLoadingUser(false);
      });
  }, [userId, token]);

  // Buscar dados de Eventos e Respostas
  useEffect(() => {
    if (!userId || !token) {
      setLoadingEventos(false);
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };
    setLoadingEventos(true);

    Promise.allSettled([
      axios.get(`http://localhost:8080/admin/events/convidado/${userId}`, { headers }),
      axios.get(`http://localhost:8080/admin/events/respostas/`, { headers })
    ])
      .then(([resEventos, resFormEvento]) => {
        // Processa Eventos
        if (resEventos.status === "fulfilled") {
          const eventosData = resEventos.value.data || [];
          setEventos(eventosData);
          const counts = { total: eventosData.length, aguardando: 0 };
          eventosData.forEach((evento: any) => {
            const status = evento.status?.toLowerCase();
            if (status !== "confirmado" && status !== "recusado") counts.aguardando++;
          });
          setStatusCounts(counts);
        } else {
          console.error("Erro ao buscar convites de eventos:", resEventos.reason);
        }

        // Processa Respostas de Eventos
        if (resFormEvento.status === "fulfilled") {
          const respForm = resFormEvento.value.data || [];
          const respostasUsuario = respForm.filter((r: any) => r.usuario?.id === Number(userId));
          setEventoRespCount({ respondido: respostasUsuario.length });
        } else {
          console.error("Erro ao buscar respostas de eventos:", resFormEvento.reason);
          setEventoRespCount({ respondido: 0 });
        }
      })
      .catch((err) => console.error("Erro geral ao buscar dados de eventos:", err))
      .finally(() => {
        setLoadingEventos(false);
      });

  }, [userId, token]);


  // Buscar contagem de Checklists
  useEffect(() => {

    if (!user?.nome) {
      if (!loadingUser) setLoadingCheck(false);
      return;
    }

    const nomeColaborador = user.nome;

    const checklistCount = async () => {
      setLoadingCheck(true);
      let totalCount = 0;

      try {
        const fetchPromises = checklistsForms.map(async (formTitle) => {
          const response = await instance.get(`/ver-csv-form?formTitle=${encodeURIComponent(formTitle)}`);
          const jsonArray: any[] = response.data || [];

          const count = jsonArray.filter(item => {
            const nomeNoChecklist = String(
              item["nome-completo-motorista"] ||
              item["name"] ||
              item["nome-motorista"] ||
              item["quem-esta-preenchendo"] ||
              item["nome"] ||
              ""
            ).trim();
            return nomeNoChecklist.toLowerCase() === nomeColaborador.toLowerCase();
          }).length;
          return count;
        });

        const resultadoContForm = await Promise.all(fetchPromises);
        totalCount = resultadoContForm.reduce((sum, count) => sum + count, 0);
        setChecklistsPreenchidos(totalCount);
      } catch (error) {
        console.error("Erro ao buscar dados dos checklists:", error);
        setChecklistsPreenchidos(0);
      } finally {
        setLoadingCheck(false);
      }
    };

    checklistCount();
  }, [user?.nome]);

  useEffect(() => {
    if (checklistsPreenchidos !== null) {
      const restantes = totalForms - (checklistsPreenchidos > totalForms ? totalForms : checklistsPreenchidos);
      setChecklistsRestantes(restantes < 0 ? 0 : restantes);
    }
  }, [checklistsPreenchidos, totalForms]);

  // Renderização condicional
  if (loadingUser) {
        return <Loading />; 
    }
    
    if (!user) {
        return <div className="p-8 text-red-600">Erro ao carregar dados do usuário. Faça login novamente.</div>;
    }
  // Renderização Principal
  return (
    <>
      <Header user={{ name: user.nome, role: user.cargo }} />
      <Navbar />

      <div>
        <h1 className='text-azul-principal ml-[5%] mt-10 text-[30px] font-bold drop-shadow-[5px_5px_3px_rgba(0,0,0,0.3)]'>Verifique as informações dos seus eventos</h1>
      </div>
      <div className="p-8  pb-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 ml-10">

        <HighlightCard
          title="Visualizar Eventos"
          value={statusCounts.total}
          subtitle={`Não se esqueça, você tem ${statusCounts.total} de eventos marcados`}
          variant="primary"
          icon={FaCalendar}
          onClick={irEventos}
        />

        <HighlightCard
          title="Confirmar presença"
          value={statusCounts.aguardando}
          subtitle={`Não se esqueça de informar se irá no evento, restam ${statusCounts.aguardando}/${statusCounts.total}`}
          variant="primary"
          icon={FaRegEdit}
          onClick={irEventosColaborador}
        />

        <HighlightCard
          title="Preencher / visualizar formulários de aproveitamento"
          value={eventoRespCount.respondido}
          subtitle={`Verifique sua(s) ${eventoRespCount.respondido} respostas dos formulários de aproveitamento`}
          variant="primary"
          icon={FaEye}
          onClick={irRespostaEventos}
        />
      </div>
      <div>
        <h1 className='text-azul-principal ml-[5%] mt-10 text-[30px] font-bold drop-shadow-[5px_5px_3px_rgba(0,0,0,0.3)]'>Verifique as informações dos seus formulários e checklists</h1>
      </div>
      <div className="p-8 pt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 ml-10 mt-0 w-max">
        <HighlightCard
          title="Preencher Checklists"
          variant="warning"
          icon={FaRegEdit}
          onClick={irCheckColaborador}
        />

        <HighlightCard
          title="Visualizar checklists preenchidos"
          variant="success"
          icon={FaEye}
          onClick={irCheckColaborador}
        />
      </div >

    </>
  );
};

export default HomeOpColabPage;