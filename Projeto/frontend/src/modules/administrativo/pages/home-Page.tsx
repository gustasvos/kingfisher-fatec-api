import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../../../shared/components/navbar";
import usuarioIcon from "../../../assets/usuario.svg";


type User = { name: string; role: string; email: string; avatarUrl?: string };
type CalendarData = { year: number; month: number; highlightedDates: number[] };
type ChartData = { labels: string[]; values: number[] };
type Person = { status: "confirmado" | "recusado" | "aguardando" | string };
type DashboardData = {
  user: User;
  calendar: CalendarData;
  people: Person[];
  chart: ChartData;
};


export default function HomePage() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Estado local para controle do mês e ano exibidos no calendário
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth() + 1); // 1-12
  const navigate = useNavigate();

  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  // Navegação (placeholder)
  function goToPage(page: string) {
    console.log("Navegar para:", page);
  }

  // Monta o calendário com base no ano e mês atuais do estado
  function buildCalendar(year: number, month: number) {
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstWeekday = new Date(year, month - 1, 1).getDay();
    const days = [];

    for (let i = 0; i < firstWeekday; i++) {
      days.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(d);
    }
    return days;
  }

  // Atualiza o gráfico
  function renderChart(chartData: ChartData) {
    if (!chartRef.current) return;
    if (chartInstanceRef.current) chartInstanceRef.current.destroy();

    chartInstanceRef.current = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: chartData.labels,
        datasets: [
          {
            data: chartData.values,
            borderWidth: 0,
            borderRadius: 4,
            barThickness: 26,
            backgroundColor: "#135b78",
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          x: { grid: { display: false }, ticks: { display: false } },
          y: { grid: { display: false }, ticks: { display: false } },
        },
        plugins: { legend: { display: false }, tooltip: { enabled: true } },
      },
    });
  }

  // Buscar dados do backend
  async function fetchData() {
    try {
      const resp = await fetch("/api/dashboard");
      if (!resp.ok) throw new Error("Erro ao buscar dados");
      const data: DashboardData = await resp.json();
      setDashboard(data);

      // Ajusta o mês e ano para os dados recebidos (sincroniza o calendário)
      if (data.calendar) {
        setCurrentYear(data.calendar.year);
        setCurrentMonth(data.calendar.month);
      }
      setSelectedDay(null);

      if (data.chart) renderChart(data.chart);
    } catch (e) {
      console.error(e);
    }
  }

  // Inicialização e refresh a cada 10s
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => {
      clearInterval(interval);
      if (chartInstanceRef.current) chartInstanceRef.current.destroy();
    };
  }, []);

  // Funções para mudar mês
  function prevMonth() {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDay(null);
  }

  function nextMonth() {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDay(null);
  }

  // Dias para renderizar
  const calendarDays = buildCalendar(currentYear, currentMonth);

  // Pega os dias destacados do dashboard (se mês/ano bater com o atual)
  const highlightedDates =
    dashboard && dashboard.calendar.year === currentYear && dashboard.calendar.month === currentMonth
      ? dashboard.calendar.highlightedDates
      : [];

    // Dia atual
  const today = new Date();
  const todayDay = today.getDate();
  const todayMonth = today.getMonth() + 1; // 1-12
  const todayYear = today.getFullYear();


  // Contadores de status
  const counts = dashboard
    ? dashboard.people.reduce(
        (acc, p) => {
          if (p.status === "confirmado") acc.confirmado++;
          else if (p.status === "recusado") acc.recusado++;
          else if (p.status === "aguardando") acc.aguardando++;
          return acc;
        },
        { confirmado: 0, recusado: 0, aguardando: 0 }
      )
    : { confirmado: 0, recusado: 0, aguardando: 0 };

  return (
    <div className="min-h-screen flex bg-[var(--bg)] font-sans">
      <Navbar/>



      <main className="flex-1 p-8">
        {/* Header */}
        <header className="card p-8 flex gap-6 items-center" style={{ background: "var(--hero)", color: "#000" }}>
          <div id="avatar" className="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center">
            {dashboard?.user.avatarUrl ? (
              <img
                src={dashboard.user.avatarUrl}
                alt="avatar"
                className="w-28 h-28 rounded-full object-cover"
              />
            ) : (
              <img src={usuarioIcon} alt="usuário" className="w-28 h-28" />
            )}
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-wide text-black">
              SEJA BEM-VINDO {dashboard?.user.name.toUpperCase()}
            </h1>
            <p id="cargo" className="mt-4 font-medium text-black">
              {dashboard?.user.role}
            </p>
            <p id="email" className="text-sm opacity-90 text-black">
              {dashboard?.user.email}
            </p>
          </div>
        </header>

        {/* Conteúdo */}
        <section className="grid grid-cols-12 gap-6 mt-6">
          {/* Coluna esquerda */}
          <div className="col-span-4 space-y-6">
            {/* Calendário */}
            <div className="card p-6 bg-white rounded-lg">

              <div className="flex items-start justify-between text-black">
                <button
                  className="font-bold text-xl px-3 py-1 hover:bg-gray-200 rounded"
                  onClick={prevMonth}
                  aria-label="Mês anterior"
                >
                  ◂
                </button>
                <h3 className="font-semibold text-lg" id="calendarTitle">
                  {new Date(currentYear, currentMonth - 1).toLocaleString("pt-BR", {
                    month: "long",
                    year: "numeric",
                  })}
                </h3>
                <button
                  className="font-bold text-xl px-3 py-1 hover:bg-gray-200 rounded"
                  onClick={nextMonth}
                  aria-label="Próximo mês"
                >
                  ▸
                </button>
              </div>
              <div className="mt-4">
                <div className="grid grid-cols-7 gap-1 text-xs text-black">
                  {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d) => (
                    <div key={d} className="text-center font-medium">
                      {d}
                    </div>
                  ))}
                </div>
                <div id="calendarGrid" className="grid grid-cols-7 gap-1 mt-3 text-sm text-black">
                  {calendarDays.map((day, i) =>
                    day ? (
                      <div
                        key={i}
                        className={`calendar-day text-center text-sm cursor-pointer rounded-md 
                          ${highlightedDates.includes(day) ? "selected-day" : ""} 
                          ${selectedDay === day ? "selected-day" : ""} 
                          ${day === todayDay && currentMonth === todayMonth && currentYear === todayYear ? "bg-blue-200 border border-blue-250 font-bold" : ""}`
                        }
                        onClick={() => setSelectedDay(day)}
                      >
                        {day}
                      </div>
                    ) : (
                      <div key={i} />
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Contadores */}
            <div className="grid grid-cols-3 gap-2">
              <div className="card p-3 text-center">
                <div className="text-sm text-black">Confirmado</div>
                <div id="count_confirmado" className="font-bold text-lg text-black">
                  {counts.confirmado}
                </div>
              </div>
              <div className="card p-3 text-center">
                <div className="text-sm text-black">Recusado</div>
                <div id="count_recusado" className="font-bold text-lg text-black">
                  {counts.recusado}
                </div>
              </div>
              <div className="card p-3 text-center">
                <div className="text-sm text-black">Aguardando</div>
                <div id="count_aguardando" className="font-bold text-lg text-black">
                  {counts.aguardando}
                </div>
              </div>
            </div>
          </div>

          {/* Coluna direita */}
          <div className="col-span-8">
            <div className="card p-6 h-full">
              <h3 className="font-semibold mb-4 text-black">Gráfico de Preferência</h3>
              <canvas ref={chartRef} id="preferenceChart" height={220} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
