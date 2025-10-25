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


/**
 * mock para o atalho de preencher checlist
*/
const checkNaoPreechido = 1
const totalCheck = 2

const mockCheckPreencher = {
  value: checkNaoPreechido,
  subtitle: `Responda os checklists restantes ${checkNaoPreechido}/${totalCheck}`,
  icon: FaRegEdit
}

/**
 * mock para o atalho de ver checklist preenchido
*/
const checkPreechido = 1

const mockCheckPreenchidos = {
  value: checkPreechido,
  subtitle: `Veja os checklists respondidos ${checkPreechido}/${totalCheck}`,
  icon: FaRegEdit
}

/**
 * mock para o atalho de ver checklist preenchido
*/
const totalEventosMes = 2

const mockEventos = {
  value: totalEventosMes,
  subtitle: `verifique seus eventos desse mês`,
  icon: FaCalendar
}

/**
 * mock para o header
 */
const mockHeader = {
  user: {
    avatarUrl: '../../assets/usuario.svg',
    name: "NOME_COLABORADOR_OPERACIONAL",
    role: "Colaborador",
    email: "operacionalColab@email.com",
  },
};


const mockData = {
  checkResponder: 1,
};

const mockData2 = {
  checkRespondido: 1,
};

const mockData3 = {
  eventos: 2,
};


const HomeOpColabPage: React.FC = () => {

  
  const [user, setUser] = useState<User | null>(null)
  const userId = localStorage.getItem("userId")
  const token = localStorage.getItem("token")
  const [checklistsPreenchidos, setChecklistsPreenchidos] = useState<number | null>(null);
  const [loadingCheck, setLoadingCheck] = useState(true);

  const [eventos, setEventos] = useState<any[]>([])
  const [statusCounts, setStatusCounts] = useState({ total: 0, aguardando: 0 })
  const [eventoResp, setEventoResp] = useState<any[]>([])
  const [eventoRespCount, setEventoRespCount] = useState({ respondido: 0 })

  //   const [data, setData] = useState<DashboardData | null>(mockData);

  const navigate = useNavigate()

  const irEventosColaborador = () => {
    navigate("/eventos-colaborador")
  }

  const irRespostaEventos = () => {
    navigate("/resposta-eventos")
  }

  const irEventos = () => {
    navigate("/eventos")
  }

  const irCheckColaborador = () => {
    navigate("/lista-check-colaborador")
  }

  const checklistsForms = [
    "Checklist Diário - Frota Newe",
    "Checklist, Forms de gestão de coleta",
    "Formulário de abertura",
    "Formulário de fechamento,",
    "Checklist de Cadastro de Agregados(Moto)",
    "Formulário de manutenção predial"
  ]

  // para carregar a contagem dos Checklists
  useEffect(() => {
    if (!user?.nome) {
      if (!userId || !token) return;
      return;
    }

    const nomeColaborador = user.nome;

    const checklistCount = async () => {
      setLoadingCheck(true);
      let totalCount = 0;

      try {
        // Cria um array de promessas para buscar todos os CSVs de checklist
        const fetchPromises = checklistsForms.map(async (formTitle) => {
          // Substituindo o axios direto por 'instance' para usar a rota /ver-csv
          const response = await instance.get(`/ver-csv-form?formTitle=${encodeURIComponent(formTitle)}`);
          const jsonArray: any[] = response.data || [];

          const count = jsonArray.filter(item => {
            // Usa a chave 'nome-motorista' ou 'nome' (ajuste conforme a chave REAL no seu JSON)
            const nomeNoChecklist = String(
              item["nome-motorista"] ||
              item["quem-esta-preenchendo"] ||
              item["nome-completo-motorista"] ||
              item["name"] ||
              item["nome"]
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
  }, [user]);


  useEffect(() => {
    if (!userId || !token) return;

    const headers = { Authorization: `Bearer ${token}` };

    Promise.allSettled([
      axios.get(`http://localhost:8080/admin/events/convidado/${userId}`, { headers }),
      axios.get(`http://localhost:8080/admin/events/respostas/`, { headers }),
      axios.get(`http://localhost:8080/usuario/${userId}`,{headers})
    ])
      .then(([resEventos, resFormEvento, resUser]) => {
        if (resEventos.status === "fulfilled") {
          const eventos = resEventos.value.data || [];
          setEventos(eventos);

          const counts = {
            total: eventos.length,
            aguardando: 0
          };

          eventos.forEach((evento: any) => {
            const status = evento.status?.toLowerCase()

            if (status !== "confirmado" && status !== "recusado") counts.aguardando++
          });

          setStatusCounts(counts)
        }
        if (resFormEvento.status === "fulfilled") {
          const respForm = resFormEvento.value.data || [];
          const respostasUsuario = respForm.filter(
            (r:any) => r.usuario?.id === Number(userId)
          );
          setEventoResp(respostasUsuario)

          const countsFormEvento = {
            respondido: respostasUsuario.length
          };

          setEventoRespCount(countsFormEvento)
        }
        if (resUser.status === "fulfilled"){
           setUser(resUser.value.data);
        } else {
          // Caso 404 ou outro erro
          setEventoResp([]);
          setEventoRespCount({ respondido: 0 });
        }
      })
      .catch((err) => console.error("Erro ao buscar eventos do usuário:", err));

  }, [userId, token]);


  // Renderização Principal
  return (
    <>
      <Header user={user} />
      <Navbar />

      <div>
        <h1 className='text-azul-principal ml-[5%] mt-10 text-[30px] font-bold drop-shadow-[5px_5px_3px_rgba(0,0,0,0.3)]'>Verifique as informações dos seus eventos</h1>
      </div> 
      <div className="p-8  pb-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 ml-10">

        <HighlightCard
          title="Ver Eventos"
          value={statusCounts.total}
          subtitle={`Não se esqueça, você tem ${statusCounts.total} de eventos marcados`}
          variant="primary"
          icon={FaCalendar}
          onClick={irEventos}
        />

        <HighlightCard
          title="Confirmar presença/preencher"
          value={statusCounts.aguardando}
          subtitle={`Não se esqueça de informar se irá no evento, restam ${statusCounts.aguardando}/${statusCounts.total}`}
          variant="primary"
          icon={FaRegEdit}
          onClick={irEventosColaborador}
        />

        <HighlightCard
          title=" Ver formulário de aproveitamento"
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
      <div className="p-8 pt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 ml-10 mt-0">
        <HighlightCard
          title="Preencher Checklists"
          value={mockData.checkResponder}
          subtitle={mockCheckPreencher.subtitle}
          variant="primary"
          icon={FaRegEdit}
          onClick={irCheckColaborador}
        />

         <HighlightCard
          title="Ver checklists preenchidos"
          value={loadingCheck ? '...' : checklistsPreenchidos ?? 0}
          subtitle={loadingCheck ? 'Carregando...' : `Veja seus ${checklistsPreenchidos ?? 0} checklists respondidos`}
          variant="primary"
          icon={FaEye}
          onClick={irCheckColaborador}
        />
      </div >

    </>
  );
};

export default HomeOpColabPage;