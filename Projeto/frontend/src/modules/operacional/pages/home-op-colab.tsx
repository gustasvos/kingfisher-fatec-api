import React, { useState, useEffect } from 'react';
import HighlightCard from '../../../shared/components/highlight-card';
import { FaRegEdit, FaEye, FaCalendar } from 'react-icons/fa'
import Navbar from '../../../shared/components/navbar';
import Header from '../../../shared/components/header';
import { Link, useNavigate } from 'react-router-dom';
import { Subtitles } from 'lucide-react';
import axios from 'axios';


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

  const userId = localStorage.getItem("userId")
  const token = localStorage.getItem("token")

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

  useEffect(() => {
    if (!userId || !token) return;
  
    const headers = { Authorization: `Bearer ${token}` };
  
    axios
      .all([
        axios.get(`http://localhost:8080/admin/events/convidado/${userId}`, { headers }),
        axios.get(`http://localhost:8080/admin/events/respostas/${userId}`, { headers })
        .then(res => res)
        .catch((err) => {
          // Se a rota de respostas não encontrar nada, retorna array vazio
          if (err.response?.status === 404) {
            console.warn("Nenhuma resposta encontrada — retornando lista vazia.");
            return { data: [] };
          }
          // Se for outro tipo de erro, relança para o catch principal
          throw err;
        }),
      ])
      .then(([resEventos, resFormEvento]) => {
        const eventos = resEventos.data;
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
  
        const respForm = resFormEvento.data
          setEventoResp(respForm)

          const countsFormEvento = {
            respondido: respForm.length
          };

          setEventoRespCount(countsFormEvento)
      })
      .catch((err) => console.error("Erro ao buscar eventos do usuário:", err));
      
  }, [userId, token]);
  

  // Renderização Principal
  return (
    <>
      <Header user={mockHeader.user} placeholderAvatar={mockHeader.user.avatarUrl} />
      <Navbar />

      <div>
        <h1 className='text-azul-principal ml-[5%] mt-10 text-[30px] font-bold drop-shadow-[5px_5px_3px_rgba(0,0,0,0.3)]'>Verifique as informações dos seus eventos</h1>
      </div>
      <div className="p-8  pb-2 grid grid-cols-3 gap-x-5 ml-10">

        <HighlightCard
          title="Ver Eventos"
          value={statusCounts.total}
          subtitle={mockEventos.subtitle}
          variant="primary"
          icon={FaCalendar}
          onClick={irEventos}
        />

        <HighlightCard
          title="Confirmar presença/preencher"
          value={statusCounts.aguardando}
          subtitle={mockEventos.subtitle}
          variant="primary"
          icon={FaRegEdit}
          onClick={irEventosColaborador}
        />

        <HighlightCard
          title=" Ver formulário de aproveitamento"
          value={eventoRespCount.respondido}
          subtitle={mockCheckPreenchidos.subtitle}
          variant="primary"
          icon={FaEye}
          onClick={irRespostaEventos}
        />
      </div>
      <div>
        <h1 className='text-azul-principal ml-[5%] mt-10 text-[30px] font-bold drop-shadow-[5px_5px_3px_rgba(0,0,0,0.3)]'>Verifique as informações dos seus formulários e checklists</h1>
      </div>
      <div className="p-8 pt-2 grid grid-cols-3 gap-x-5 ml-10 mt-0">
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
          value={mockData3.eventos}
          subtitle={mockEventos.subtitle}
          variant="primary"
          icon={FaEye}
          onClick={irCheckColaborador}
        />
      </div >

    </>
  );
};

export default HomeOpColabPage;