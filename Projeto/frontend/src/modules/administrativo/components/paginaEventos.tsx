import React, { useRef, useState, useEffect, useCallback } from 'react'
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

// Imagens
import imgLogin from './../../../assets/imgLoginKey.svg'
import imgHome from './../../../assets/imgHomepage.png'
import imgUser from './../../../assets/imgAddUserMale.png'
import imgCalendar from './../../../assets/imgTearOffCalendar.png'
import imgNotification from './../../../assets/imgDoorbell.png'
import imgColab from './../../../assets/imgTeam.svg'

// Componentes
import Modal from '../../../shared/components/modal'
import NovoEvento from './novoEvento'
import Navbar from '../../../shared/components/navbar'
import AgendamentoCliente from '../../comercial/pages/agendamento-cliente';

function PaginaEventos() {
  const [eventosCalendar, setEventosCalendar] = useState<any[]>([])
  const [eventosOriginais, setEventosOriginais] = useState<any[]>([])
  const [aberto, setAberto] = useState(false)
  const [eventoSelecionado, setEventoSelecionado] = useState<any | null>(null)
  const [abertoModal, setAbertoModal] = useState(false)
  const [conteudoModal, setConteudoModal] = useState<React.ReactNode>(null)
  const [eventosFiltrados, setEventosFiltrados] = useState<any[]>([]);
  const [indiceAtual, setIndiceAtual] = useState(0);
  
  // Estado para forçar recarregamento após criar agendamento
  const [reloadKey, setReloadKey] = useState(0); 

  const calendarRef = useRef<CalendarApi | null>(null)
  const { user } = useAuth();
  const usuarioID = user?.id;

  // --- FUNÇÃO PRINCIPAL DE BUSCA ---
  const carregarTodosEventos = useCallback(async () => {
    if (!usuarioID) return;

    try {
        // 1. Buscar Eventos/Convites do Admin (Existente)
        const reqConvites = instance.get(`/admin/events/convidado/${usuarioID}`);
        
        // 2. Buscar Tarefas Comerciais (Novo)
        const reqTarefas = instance.get(`/tarefas/pendentes?vendedor_id=${usuarioID}`);

        // Executa os dois ao mesmo tempo
        const [resConvites, resTarefas] = await Promise.allSettled([reqConvites, reqTarefas]);

        let listaFinal: any[] = [];

        // Processa Convites (Lógica antiga)
        if (resConvites.status === 'fulfilled') {
            const convitesFmt = resConvites.value.data.map((convite: any) => ({
                id: `convite-${convite.evento.id}`, // Prefixo para não duplicar ID
                title: convite.evento.titulo,
                start: convite.evento.dataHora,
                backgroundColor: '#3788d8', // Azul padrão
                borderColor: '#3788d8',
                extendedProps: {
                    descricao: convite.evento.descricao,
                    localizacao: convite.evento.localizacao,
                    status: convite.status,
                    tipo: 'evento_interno'
                }
            }));
            listaFinal = [...listaFinal, ...convitesFmt];
        }

        // Processa Tarefas Comerciais (Lógica nova)
        if (resTarefas.status === 'fulfilled') {
            const tarefasFmt = resTarefas.value.data.map((tarefa: any) => {
                // Tenta extrair local da descrição (que salvamos como "Local: xxxx")
                const localMatch = tarefa.descricao ? tarefa.descricao.match(/Local: (.*?)(?:\n|$)/) : null;
                const localExtraido = localMatch ? localMatch[1] : "Local do Cliente";

                // Define cor baseada no tipo
                let cor = '#10B981'; // Verde (Reunião)
                if (tarefa.tipo === 'visita') cor = '#F59E0B'; // Laranja
                if (tarefa.tipo === 'ligacao') cor = '#6366f1'; // Roxo

                return {
                    id: `tarefa-${tarefa.id}`,
                    title: `${tarefa.titulo} - ${tarefa.cliente?.nomeFantasia || 'Cliente'}`,
                    start: tarefa.data,
                    backgroundColor: cor,
                    borderColor: cor,
                    extendedProps: {
                        descricao: tarefa.descricao, // Texto completo
                        localizacao: localExtraido,
                        status: tarefa.status,
                        tipo: 'tarefa_comercial',
                        cliente: tarefa.cliente?.nomeFantasia
                    }
                };
            });
            listaFinal = [...listaFinal, ...tarefasFmt];
        }

        setEventosCalendar(listaFinal);
        setEventosOriginais(listaFinal);

    } catch (error) {
        console.error("Erro ao carregar calendário unificado:", error);
    }
  }, [usuarioID]);

  // Carrega ao iniciar e quando reloadKey mudar
  useEffect(() => {
    carregarTodosEventos();
  }, [carregarTodosEventos, reloadKey]);


  // --- MANIPULADORES ---

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const termo = (e.target as HTMLInputElement).value.trim().toLowerCase();
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
    if (!termo) {
      setEventosCalendar(eventosOriginais);
      setEventosFiltrados(eventosOriginais);
      setIndiceAtual(0);
      return;
    }
    const filtrados = eventosOriginais.filter((evento) =>
      evento.title.toLowerCase().includes(termo) ||
      (evento.extendedProps.descricao && evento.extendedProps.descricao.toLowerCase().includes(termo)) ||
      (evento.extendedProps.localizacao && evento.extendedProps.localizacao.toLowerCase().includes(termo))
    );
    setEventosCalendar(filtrados);
    setEventosFiltrados(filtrados);
    setIndiceAtual(0);
    if (filtrados.length > 0 && calendarRef.current) {
      const primeiraData = new Date(filtrados[0].start);
      calendarRef.current.gotoDate(primeiraData);
    }
  };

  const handleEventClick = (info: any) => {
    const props = info.event.extendedProps;
    setEventoSelecionado({
      titulo: info.event.title,
      data: info.event.start?.toLocaleString('pt-BR'), // Formata data e hora
      local: props.localizacao || 'Não informado',
      descricao: props.descricao,
      tipo: props.tipo
    })
  }

  const fecharModal = () => setEventoSelecionado(null)

  const abrirModalCriarEvento = (e: React.MouseEvent) => {
    e.preventDefault()
    setConteudoModal(<NovoEvento onFechar={() => {
        setAbertoModal(false);
        setReloadKey(prev => prev + 1); // Recarrega ao fechar
    }} />)
    setAbertoModal(true)
  }

  const abrirModalAgendamentoCliente = (e: React.MouseEvent) => {
    e.preventDefault()
    setConteudoModal(
      <div className="pb-4">
        {/* Wrapper para recarregar a página quando salvar */}
        <AgendamentoCliente />
        <p className="text-center text-xs text-gray-500 mt-2">
           Ao agendar, feche esta janela para atualizar o calendário.
        </p>
      </div>
    )
    setAbertoModal(true)
  }

  // Ao fechar o modal principal, recarrega os dados para garantir que o novo agendamento apareça
  const handleFecharModalPrincipal = () => {
      setAbertoModal(false);
      setReloadKey(prev => prev + 1);
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
          marginLeft: aberto ? '200px' : '80px', // Ajustado margem
          padding: '20px',
          transition: 'margin-left 0.3s ease'
        }}
      >
        <div className="top-bar mb-5 flex items-center gap-4 justify-between">
          <div className="flex gap-2">
            {user?.role === "admin" && (
                <button onClick={abrirModalCriarEvento} className="btn bg-blue-600 text-white px-4 py-2 rounded">
                Criar Evento
                </button>
            )}
            
            {/* Botão Agendar para Comercial ou Admin */}
            {(user?.role === "comercial") && (
                <button onClick={abrirModalAgendamentoCliente} className="btn bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                Agendar com Cliente
                </button>
            )}
          </div>

          <input
            type="search"
            id="searchInput"
            className="input-search border p-2 rounded"
            placeholder="Pesquisar evento..."
            onKeyDown={handleSearch}
            style={{ color: '#000' }}
          />
        </div>

        <div id="calendar" className="bg-white p-4 rounded-lg shadow">
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
            height="80vh" // Altura ajustada
            events={eventosCalendar}
            eventClick={handleEventClick}
            eventDidMount={(info) => {
              info.el.style.cursor = 'pointer';
              // Tooltip simples nativo
              info.el.title = info.event.title + "\n" + (info.event.extendedProps.localizacao || "");
            }}
          />
        </div>

        <Modal
          aberto={abertoModal}
          onFechar={handleFecharModalPrincipal}
          modalClassName=""
        >
          <div className='max-w-[900px] w-[70vw] rounded-lg p-4'>
            {conteudoModal}
          </div>
        </Modal>
      </main>

      {/* Modal de Visualização de Detalhes */}
      {eventoSelecionado && (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={fecharModal}>
          <div className="modal-content bg-white p-6 rounded-lg w-[400px] shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4 text-[#135b78]">{eventoSelecionado.titulo}</h2>
            
            <div className="space-y-3 text-gray-700">
                <p><strong>Data:</strong> {eventoSelecionado.data}</p>
                <p><strong>Local:</strong> {eventoSelecionado.local}</p>
                <div className="bg-gray-50 p-3 rounded border text-sm whitespace-pre-wrap">
                    <strong>Descrição:</strong><br/>
                    {eventoSelecionado.descricao || "Sem descrição"}
                </div>
            </div>

            <div className="mt-6 flex justify-end">
                <button onClick={fecharModal} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PaginaEventos