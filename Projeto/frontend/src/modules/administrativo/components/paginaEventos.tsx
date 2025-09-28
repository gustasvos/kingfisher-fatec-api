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

import imgLogin from './../../../assets/imgLoginKey.svg';
import imgHome from './../../../assets/imgHomepage.png';
import imgUser from './../../../assets/imgAddUserMale.png';
import imgCalendar from './../../../assets/imgTearOffCalendar.png';
import imgNotification from './../../../assets/imgDoorbell.png';
import imgColab from './../../../assets/imgTeam.svg';

function PaginaEventos() {
  const calendarRef = useRef<CalendarApi | null>(null) 
  const [eventosCalendar, setEventosCalendar] = useState<any[]>([]);
  const usuarioID = 1;

  const [aberto, setAberto] = useState(false); // sidebar aberta ou fechada

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/admin/events/convidado/${usuarioID}`)
      .then((response) => {
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

  const handleCreateEvent = () => {
    navigate('/novo-evento');
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {  
    const termo = e.target.value.trim().toLowerCase()
    console.log('Pesquisar evento:', termo) 
  }

  const menuItems = [
    { src: imgLogin, alt: "Login", title: "Login", route: "/" },
    { src: imgHome, alt: "Home", title: "Home", route: "/home" },
    { src: imgUser, alt: "Usuários", title: "Usuários", route: "/cadastrar" },
    { src: imgCalendar, alt: "Calendário", title: "Calendário", route: "/eventos" },
    { src: imgNotification, alt: "Notificações", title: "Notificações", route: "/evento-convite" },
    { src: imgColab, alt: "Colaboradores", title: "Colaboradores", route: "/colaboradores" }
  ];

  return (
    <>
      <aside style={{
        width: aberto ? '200px' : '60px',
        backgroundColor: '#135b78',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: aberto ? 'flex-start' : 'center',
        paddingTop: '20px',
        paddingLeft: aberto ? '15px' : '0',
        gap: '25px',
        transition: 'width 0.3s ease',
        color: 'white',
        boxSizing: 'border-box',
      }}>
        {/* Botão hamburguer */}
        <section
          onClick={() => setAberto(!aberto)}
          style={{
            cursor: 'pointer',
            marginBottom: '20px',
            paddingLeft: aberto ? '10px' : '0',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
          aria-label="Toggle sidebar"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setAberto(!aberto); }}
        >
          <span style={{ width: '25px', height: '3px', backgroundColor: 'white', borderRadius: '2px' }} />
          <span style={{ width: '25px', height: '3px', backgroundColor: 'white', borderRadius: '2px' }} />
          <span style={{ width: '25px', height: '3px', backgroundColor: 'white', borderRadius: '2px' }} />
        </section>

        {/* Menu */}
        <section style={{ width: '100%' }}>
          {menuItems.map(({src, alt, title, route}) => (
            <button
              key={title}
              title={title}
              onClick={() => navigate(route)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 10px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: 'inherit',
                fontWeight: '600',
                fontSize: '15px',
                borderRadius: '5px',
                whiteSpace: 'nowrap',
                textAlign: 'left',
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1b7091d8'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <img src={src} alt={alt} style={{ width: '28px', height: '28px', flexShrink: 0 }} />
              {aberto ? title : null}
            </button>
          ))}
        </section>
      </aside>

      <main style={{ marginLeft: aberto ? '200px' : '60px', padding: '20px', transition: 'margin-left 0.3s ease' }}>
        <div className="top-bar" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
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
