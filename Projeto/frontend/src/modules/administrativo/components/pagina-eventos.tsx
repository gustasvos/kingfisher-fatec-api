import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid'      
import timeGridPlugin from '@fullcalendar/timegrid'    
import listPlugin from '@fullcalendar/list'           
import interactionPlugin from '@fullcalendar/interaction' 
import ptBrLocale from '@fullcalendar/core/locales/pt-br' 
import "./pagina-eventos.css"
import { useNavigate } from 'react-router-dom';
import { CalendarApi } from '@fullcalendar/core'
import imgHome from './../../../assets/imgHomepage.png';
import imgUser from './../../../assets/imgAddUserMale.png';
import imgCalendar from './../../../assets/imgTearOffCalendar.png';
import imgNotification from './../../../assets/imgDoorbell.png';



function PaginaEventos() {
  const calendarRef = useRef<CalendarApi | null>(null) 
  const [eventosCalendar, setEventosCalendar] = useState<any[]>([]);
  const usuarioID = 1;

  useEffect(() => {
  axios.get(`http://localhost:8080/admin/events/convidado/${usuarioID}`)
    .then((response) => {
      // Transforma os eventos do backend no formato esperado pelo FullCalendar
      const eventosFormatados = response.data.map((convite: any) => ({
        id: convite.evento.id,
        title: convite.evento.titulo,
        start: convite.evento.dataHora,
        extendedProps: {
          descricao: convite.evento.descricao,
          localizacao: convite.evento.localizacao,
          status: convite.status,
        }
      }));
      setEventosCalendar(eventosFormatados);
    })
    .catch((error) => console.error("Erro ao buscar eventos:", error));
}, []);

    const navigate = useNavigate();
    const handleCreateEvent = () => {
    navigate('/novo-evento');
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {  
    const termo = e.target.value.trim().toLowerCase()
    console.log('Pesquisar evento:', termo) 
  }

  return (
    <>
      <aside>
        <button title="Home">
            <img src={imgHome} alt="Home" />
        </button>
        <button title="Usuários">
            <img src={imgUser} alt="Usuários" />
        </button>
        <button title="Calendário">
            <img src={imgCalendar} alt="Calendário" />
        </button>
        <button title="Notificações">
            <img src={imgNotification} alt="Notificações" />
        </button>
    </aside>


      <main>
        <div className="top-bar">
          {/* <input type="date" id="datePicker" className="input-date" /> */}
          <button onClick={handleCreateEvent} className="btn">
            Criar Evento
          </button>
          <input
            type="search"
            id="searchInput"
            className="input-search"
            placeholder="Pesquisar evento"
            onInput={handleSearch}
          />
        </div>

        <div id="calendar">
          <FullCalendar
            ref={(el) => {
                if (el !== null) {
                calendarRef.current = (el as any).getApi();
                }
            }}
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            locale={ptBrLocale}
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            }}
            height="1200px"
            events={eventosCalendar}
            eventClick={(info) => {
                const evento = info.event;
                alert(
                `Evento: ${evento.title}\n` +
                `Data: ${evento.start?.toLocaleDateString('pt-BR')}\n` +
                `Local: ${evento.extendedProps.localizacao}\n` +
                `Descrição: ${evento.extendedProps.descricao}`
                );
            }}
            />
        </div>
      </main>
    </>
  )
}

export default PaginaEventos