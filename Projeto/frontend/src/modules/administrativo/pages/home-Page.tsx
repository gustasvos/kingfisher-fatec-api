// HomePage.tsx
import React, { useState, useEffect, useMemo } from "react";
import Navbar from "../../../shared/components/navbar";
import Modal from "../../../shared/components/modal";
import LocalTrabalho from "../components/localTrabalho";
import instance from "./../../../services/api";
import CalendarioHome from "../components/calendarioHome";
import ContadorHome from "../components/contadorHome";
import GraficoHome from "../components/graficoHome";
import Header from "../components/header";

type User = { name: string; role: string; email: string; avatarUrl?: string };
type DashboardData = {
  user: User;
  chart?: { labels: string[]; values: number[] };
};

const FIXED_CHART_DATA = {
  labels: ["Opção A", "Opção B", "Opção C", "Opção D"],
  values: [12, 19, 7, 14],
};

export default function HomePage() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const userString = localStorage.getItem("user");
  const userId = userString ? JSON.parse(userString).id : null;
  const token = localStorage.getItem("token");

  const [eventos, setEventos] = useState<any[]>([]);

  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    if (userId) {
      instance
        .get(`/usuario/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar usuário:", error);
        });
    }
  }, [userId]);

  useEffect(() => {
    if (!token) return;

    instance
      .get("/admin/events", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setEventos(response.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar eventos:", err);
      });
  }, [token]);

  const chartData = useMemo(() => {
    if (!dashboard?.chart) return FIXED_CHART_DATA;
    return dashboard.chart;
  }, [dashboard]);

  return (
    <div className="min-h-screen flex bg-[var(--bg)] font-sans">
      <Navbar />
      <main className="flex-1 px-6 py-8">
        <Header user={user} />

        <section className="grid grid-cols-12 gap-6 mt-6">
          <div className="col-span-4 space-y-6">
            <CalendarioHome
              currentMonth={currentMonth}
              currentYear={currentYear}
              todayDay={new Date().getDate()}
              todayMonth={new Date().getMonth() + 1}
              todayYear={new Date().getFullYear()}
            />
            {/* Contador agora sem lógica de contagem, só recebe os eventos */}
            <ContadorHome eventos={eventos} />
          </div>

          <div className="col-span-8">
            <div className="card bg-white rounded-[12px] shadow-lg h-[350px] p-8">
              <h3 className="font-semibold mb-4 text-black">Gráfico de Localização</h3>
              <div className="h-[250px]">
                <GraficoHome data={chartData} />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modal LocalTrabalho */}
      <Modal
        aberto={mostrarModal}
        onFechar={() => setMostrarModal(false)}
        modalClassName=""
      >
        <LocalTrabalho onFechar={() => setMostrarModal(false)} />
      </Modal>
    </div>
  );
}
