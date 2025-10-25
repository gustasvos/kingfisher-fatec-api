import React, { useRef, useState, useEffect } from 'react'
import instance from "../../../services/api";
import { useAuth } from "../../../contexts/AuthContext";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import ptBrLocale from '@fullcalendar/core/locales/pt-br'
import "./pagina-eventos.css"
import { CalendarApi } from '@fullcalendar/core'

import imgLogin from './../../../assets/imgLoginKey.svg'
import imgHome from './../../../assets/imgHomepage.png'
import imgUser from './../../../assets/imgAddUserMale.png'
import imgCalendar from './../../../assets/imgTearOffCalendar.png'
import imgNotification from './../../../assets/imgDoorbell.png'
import imgColab from './../../../assets/imgTeam.svg'
import Modal from '../../../shared/components/modal'
import NovoEvento from './novoEvento'
import Navbar from '../../../shared/components/navbar'

function PaginaEventos() {
  const [eventosCalendar, setEventosCalendar] = useState<any[]>([])
  const [eventosOriginais, setEventosOriginais] = useState<any[]>([])
  const [aberto, setAberto] = useState(false)
  const [eventoSelecionado, setEventoSelecionado] = useState<any | null>(null)
  const [abertoModal, setAbertoModal] = useState(false)
  const [conteudoModal, setConteudoModal] = useState<React.ReactNode>(null)
  const [eventosFiltrados, setEventosFiltrados] = useState<any[]>([]);
  const [indiceAtual, setIndiceAtual] = useState(0);

  const calendarRef = useRef<CalendarApi | null>(null)
  const { user } = useAuth(); // Usar o hook de autenticação
  const usuarioID = user?.id; // Obter o ID do usuário da sessão

  useEffect(() => {
    instance.get(`/admin/events/convidado/${usuarioID}`)
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
        }))
        setEventosCalendar(eventosFormatados)
        setEventosOriginais(eventosFormatados)
      })
      .catch((error) => console.error("Erro ao buscar eventos:", error))
  }, [])

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const termo = (e.target as HTMLInputElement).value.trim().toLowerCase();

    // Navegar pelos resultados ao apertar Enter
    if (e.key === "Enter") {
      if (eventosFiltrados.length > 0) {
        const proximoIndice = (indiceAtual + 1) % eventosFiltrados.length;
        setIndiceAtual(proximoIndice);
        const evento = eventosFiltrados[proximoIndice];
        if (calendarRef.current) {
          calendarRef.current.gotoDate(new Date(evento.start));
        }
      }
      return;
    }

    // Filtrar eventos normalmente
    if (!termo) {
      setEventosCalendar(eventosOriginais);
      setEventosFiltrados(eventosOriginais);
      setIndiceAtual(0);
      return;
    }

    const filtrados = eventosOriginais.filter((evento) =>
      evento.title.toLowerCase().includes(termo) ||
      evento.extendedProps.descricao.toLowerCase().includes(termo) ||
      evento.extendedProps.localizacao.toLowerCase().includes(termo)
    );

    setEventosCalendar(filtrados);
    setEventosFiltrados(filtrados);
    setIndiceAtual(0);

    // Ir para o primeiro evento filtrado
    if (filtrados.length > 0 && calendarRef.current) {
      const primeiraData = new Date(filtrados[0].start);
      calendarRef.current.gotoDate(primeiraData);
    }
  };


  const handleEventClick = (info: any) => {
    setEventoSelecionado({
      titulo: info.event.title,
      data: info.event.start?.toLocaleDateString('pt-BR'),
      local: info.event.extendedProps.localizacao,
      descricao: info.event.extendedProps.descricao,
    })
  }

  const fecharModal = () => setEventoSelecionado(null)

  const abrirModalCriarEvento = (e: React.MouseEvent) => {
    e.preventDefault()
    setConteudoModal(<NovoEvento onFechar={() => setAbertoModal(false)} />)
    setAbertoModal(true)
  }

  const menuItems = [
    { src: imgLogin, alt: "Login", title: "Login", route: "/" },
    { src: imgHome, alt: "Home", title: "Home", route: "/home" },
    { src: imgUser, alt: "Usuários", title: "Usuários", route: "/cadastrar" },
    { src: imgCalendar, alt: "Calendário", title: "Calendário", route: "/eventos" },
    { src: imgNotification, alt: "Notificações", title: "Notificações", route: "/evento-convite" },
    { src: imgColab, alt: "Colaboradores", title: "Colaboradores", route: "/colaboradores" }
  ]

  return (
    <div className={abertoModal ? "overflow-hidden h-screen" : ""}>
      <Navbar />

      <main
        style={{
          marginLeft: aberto ? '200px' : '60px',
          padding: '20px',
          transition: 'margin-left 0.3s ease'
        }}
      >
        <div className="top-bar mb-5 flex items-center gap-4">
          <button onClick={abrirModalCriarEvento} className="btn">
            Criar Evento
          </button>
          <input
            type="search"
            id="searchInput"
            className="input-search"
            placeholder="Pesquisar evento"
            onKeyDown={handleSearch}
            style={{ color: '#000' }}
          />
        </div>

        <div id="calendar">
          <FullCalendar
            ref={(el) => {
              if (el !== null) {
                calendarRef.current = (el as any).getApi()
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
            eventClick={handleEventClick}
            eventDidMount={(info) => {
              info.el.style.cursor = 'pointer'
            }}
          />
        </div>

        <Modal
          aberto={abertoModal}
          onFechar={() => setAbertoModal(false)}
          // modalClassName="w-[90%] sm:w-[95%] md:w-[80%] lg:w-[750px] xl:w-[900px] max-h-[90vh] bg-[rgba(28,175,23,0.94)] rounded-[15px]"
          modalClassName=""
        >
          <div className='max-w-[900px] w-[70vw]'>
            {conteudoModal}
          </div>
        </Modal>
      </main>

      {eventoSelecionado && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{eventoSelecionado.titulo}</h2>
            <p><strong>Data:</strong> {eventoSelecionado.data}</p>
            <p><strong>Local:</strong> {eventoSelecionado.local}</p>
            <p><strong>Descrição:</strong> {eventoSelecionado.descricao}</p>
            <button onClick={fecharModal}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PaginaEventos