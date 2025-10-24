import React, { useState } from 'react';
import HighlightCard from '../../../shared/components/highlight-card';
import { FaRegEdit, FaEye, FaCalendar } from 'react-icons/fa'
import Navbar from '../../../shared/components/navbar';
import Header from '../../../shared/components/header';
import { Link, useNavigate } from 'react-router-dom';
import { Subtitles } from 'lucide-react';


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
//   const [data, setData] = useState<DashboardData | null>(mockData);

const navigate = useNavigate()

const irEventosCOlaborador = () =>{
    navigate("/eventos-colaborador")
}

const irRespostaEventos = () =>{
    navigate("/resposta-eventos")
}

const irEventos = () =>{
    navigate("/eventos")
}

const irEventosColaborador = () =>{
    navigate("/eventos-colaborador")
}

  // Renderização Principal
  return (
    <>
      <Header user={mockHeader.user} placeholderAvatar={mockHeader.user.avatarUrl} />
      <Navbar />

      <div className="p-8 grid grid-cols-4 gap-x-4 ml-10">
        <HighlightCard
          title="Preencher Checklists"
          value={mockData.checkResponder}
          subtitle={mockCheckPreencher.subtitle}
          variant="primary"
          icon={FaRegEdit}
          onClick={irEventosCOlaborador}
        />

        <HighlightCard
          title="Checklists Preenchido"
          value={mockData2.checkRespondido}
          subtitle={mockCheckPreenchidos.subtitle}
          variant="primary"
          icon={FaEye}
          onClick={irRespostaEventos}
        />

        <HighlightCard
          title="Ver Eventos"
          value={mockData3.eventos}
          subtitle={mockEventos.subtitle}
          variant="primary"
          icon={FaCalendar}
          onClick={irEventos}
        />

        <HighlightCard
          title="Confirmar presença/preencher"
          value={mockData3.eventos}
          subtitle={mockEventos.subtitle}
          variant="primary"
          icon={FaCalendar}
          onClick={irEventosColaborador}
        />
      </div >
    </>
  );
};

export default HomeOpColabPage;