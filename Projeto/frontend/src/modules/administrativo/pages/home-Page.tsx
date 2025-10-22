import React, { useMemo, useState, useEffect } from "react";
import Navbar from "../../../shared/components/navbar";
import usuarioIcon from "../../../assets/usuario.svg";
import Chart from "chart.js/auto";
import axios from "axios";
import Modal from "../../../shared/components/modal";
import LocalTrabalho from "../components/localTrabalho";


type User = { name: string; role: string; email: string; avatarUrl?: string };
type CalendarData = { year: number; month: number; highlightedDates: number[] };
type Person = { status: "confirmado" | "recusado" | "aguardando" | string };
type DashboardData = {
  user: User;
  calendar: CalendarData;
  people: Person[];
  chart?: { labels: string[]; values: number[] };
};

const FIXED_CHART_DATA = {
  labels: ["Opção A", "Opção B", "Opção C", "Opção D"],
  values: [12, 19, 7, 14],
};

function PreferenceChart({ data }: { data: { labels: string[]; values: number[] } }) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const chartRef = React.useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    chartRef.current = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels: data.labels,
        datasets: [
          {
            data: data.values,
            backgroundColor: "#135b78",
            borderRadius: 6,
            barThickness: 26,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        scales: { x: { grid: { display: false } }, y: { grid: { display: false } } },
        plugins: { legend: { display: false } },
      },
    });

    return () => chartRef.current?.destroy();
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;
    chartRef.current.data.datasets[0].data = data.values;
    chartRef.current.update();
  }, [data.values]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
}

export default function HomePage() {
  const [mostrarModal, setMostrarModal] = useState(false)

  // Abre automaticamente se a flag estiver setada no localStorage
  useEffect(() => {
    const deveMostrar = localStorage.getItem("mostrarModalLocalTrabalho")
    if (deveMostrar === "true") {
      // Dá um pequeno delay pra deixar a transição mais suave
      setTimeout(() => setMostrarModal(true), 600)
      localStorage.removeItem("mostrarModalLocalTrabalho") // limpa flag
    }
  }, [])

  // user
  const [user, setUser] = useState(null)
  const userId = localStorage.getItem("userId")
  const token = localStorage.getItem("token")

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8080/usuario/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar usuário:", error);
        });
    }
  }, [userId]);

  // CALENDARIO
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

  async function fetchDashboard() {
    try {
      const resp = await fetch("/api/dashboard");
      if (!resp.ok) throw new Error("Erro ao buscar dados");
      const data: DashboardData = await resp.json();
      setDashboard(data);
      setCurrentMonth(data.calendar?.month || new Date().getMonth() + 1);
      setCurrentYear(data.calendar?.year || new Date().getFullYear());
    } catch (e) {
      console.error("Erro ao carregar dashboard:", e);
    }
  }

  useEffect(() => {
    fetchDashboard();
    const interval = setInterval(fetchDashboard, 10000);
    return () => clearInterval(interval);
  }, []);

  const calendarDays = Array.from({ length: new Date(currentYear, currentMonth, 0).getDate() }, (_, i) => i + 1);

  const today = new Date();
  const todayDay = today.getDate();
  const todayMonth = today.getMonth() + 1;
  const todayYear = today.getFullYear();

  const counts = useMemo(() => {
    if (!dashboard) return { confirmado: 0, recusado: 0, aguardando: 0 };
    return dashboard.people.reduce(
      (acc, p) => {
        if (p.status === "confirmado") acc.confirmado++;
        else if (p.status === "recusado") acc.recusado++;
        else if (p.status === "aguardando") acc.aguardando++;
        return acc;
      },
      { confirmado: 0, recusado: 0, aguardando: 0 }
    );
  }, [dashboard]);

  const chartData = useMemo(() => {
    if (!dashboard?.chart) return FIXED_CHART_DATA;
    return dashboard.chart;
  }, [dashboard]);

  const prevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="min-h-screen flex bg-[var(--bg)] font-sans">
      <Navbar />
      <main className="flex-1 px-6 py-8">
        <header
          className="card p-8 flex gap-6 items-center bg-[#135b78] rounded-lg overflow-hidden"
          style={{
            backgroundColor: "#135b78",
            color: "#fff",
            borderRadius: "0.5rem",
            overflow: "hidden",
          }}
        >
          <div
            className="absolute inset-0 -z-10"
            style={{ backgroundColor: "#135b78", opacity: 0.85 }}
          ></div>

          {/* <div className="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center">
            <img
              src={usuarioIcon}
              alt="usuário"
              className="w-28 h-28 rounded-full object-cover"
            />
          </div> */}

          <div>
            <h1 className="text-2xl font-bold tracking-wide text-white">
              {user?.genero === "F"
                ? `SEJA BEM-VINDA ${user?.nome.toUpperCase()}`
                : `SEJA BEM-VINDO ${user?.nome.toUpperCase() || "Usuário"}`
              }
            </h1>
            <p className="mt-4 font-medium text-white">
              {user?.cargo.toUpperCase() || "—"}
            </p>
            {/* <p className="text-sm opacity-90 text-white">
              CPF: {user?.cpf || "—"}
            </p> */}
          </div>
        </header>

        <section className="grid grid-cols-12 gap-6 mt-6">
          <div className="col-span-4 space-y-6">
            <div className="card p-6 bg-white rounded-lg">
              <div className="flex items-center justify-between text-black">
                <button onClick={prevMonth}>◂</button>
                <h3 className="font-semibold text-lg">
                  {new Date(currentYear, currentMonth - 1).toLocaleString("pt-BR", {
                    month: "long",
                    year: "numeric",
                  })}
                </h3>
                <button onClick={nextMonth}>▸</button>
              </div>
              <div className="mt-4">
                <div className="grid grid-cols-7 gap-1 text-xs text-black">
                  {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(d => <div key={d} className="text-center font-medium">{d}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-1 mt-3 text-sm text-black">
                  {calendarDays.map(day => (
                    <div
                      key={day}
                      className={`calendar-day text-center text-sm cursor-pointer rounded-md ${day === todayDay && currentMonth === todayMonth && currentYear === todayYear
                        ? "bg-blue-200 font-bold"
                        : ""
                        }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 rounded bg-white text-black text-center">
                <div className="text-sm">Confirmado</div>
                <div className="font-bold text-lg">{counts.confirmado}</div>
              </div>
              <div className="p-3 rounded bg-white text-black text-center">
                <div className="text-sm">Recusado</div>
                <div className="font-bold text-lg">{counts.recusado}</div>
              </div>
              <div className="p-3 rounded bg-white text-black text-center">
                <div className="text-sm">Aguardando</div>
                <div className="font-bold text-lg">{counts.aguardando}</div>
              </div>
            </div>
          </div>

          <div className="col-span-8">
            <div
              className="card bg-white"
              style={{
                borderRadius: 12,
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                height: 350,
                padding: "32px",
              }}
            >
              <h3 className="font-semibold mb-4 text-black">Gráfico de Localização</h3>
              <div style={{ height: 250 }}>
                <PreferenceChart data={chartData} />
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* 🔹 Modal LocalTrabalho abre automaticamente após login */}
      <Modal
        aberto={mostrarModal}
        onFechar={() => setMostrarModal(false)}
        modalClassName=""
      >
        <div className="max-w-[900px] w-[70vw]">
          <LocalTrabalho onFechar={() => setMostrarModal(false)} />
        </div>
      </Modal>

    </div>
  );
}
