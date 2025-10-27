import { useState, useEffect } from "react";
import Navbar from "../../../shared/components/navbar";
import Modal from "../../../shared/components/modal";
import LocalTrabalho from "../components/localTrabalho";
import instance from "./../../../services/api";
import CalendarioHome from "../components/calendarioHome";
import ContadorHome from "../components/contadorHome";
import Header from "../components/header";
import GraficoLocalTrabalho from "../components/graficoLocalTrabalho";

type User = { name: string; role: string; email: string; avatarUrl?: string };

export default function HomePage() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [eventos, setEventos] = useState<any[]>([]);
  const userString = localStorage.getItem("user");
  const userId = userString ? JSON.parse(userString).id : null;
  const token = localStorage.getItem("token");

  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

  // Buscar usuário
  useEffect(() => {
    if (userId) {
      instance
        .get(`/usuario/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch((error) => console.error("Erro ao buscar usuário:", error));
    }
  }, [userId]);

  // Buscar eventos
  useEffect(() => {
    if (!token) return;
    instance
      .get("/admin/events", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setEventos(res.data))
      .catch((err) => console.error("Erro ao buscar eventos:", err));
  }, [token]);

  // Verificar se mostra modal
  useEffect(() => {
    const checkModal = async () => {
      if (!userId || !token) return;
      try {
        const resp = await instance.get(`/usuario/${userId}/local/check`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMostrarModal(resp.data?.mostrarModal ?? false);
      } catch (error) {
        console.error("Erro ao checar modal:", error);
      }
    };
    if (user) checkModal();
  }, [user, userId, token]);

  return (
    <div className="min-h-screen flex bg-[var(--bg)] font-sans">
      <Navbar />
      <main className="flex-1 px-6 py-8">
        <Header user={user} />

        {/* ======= Grid Principal ======= */}
        <section className="grid grid-cols-12 gap-6 mt-6">
          {/* Lado esquerdo */}
          <div className="col-span-4 space-y-6">
            <CalendarioHome
              currentMonth={currentMonth}
              currentYear={currentYear}
              todayDay={new Date().getDate()}
              todayMonth={new Date().getMonth() + 1}
              todayYear={new Date().getFullYear()}
            />
            <ContadorHome eventos={eventos} />
          </div>

          <div className="col-span-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-[12px] shadow-lg p-6 flex flex-col items-center justify-center">
                <h3 className="font-semibold mb-4 text-black">
                  Locais de Trabalho (Hoje)
                </h3>
                <div className="h-[250px] w-full flex items-center justify-center">
                  <GraficoLocalTrabalho periodo="hoje" titulo={""} />
                </div>
              </div>

              <div className="bg-white rounded-[12px] shadow-lg p-6 flex flex-col items-center justify-center">
                <h3 className="font-semibold mb-4 text-black">
                  Locais de Trabalho (Últimos 30 dias)
                </h3>
                <div className="h-[250px] w-full flex items-center justify-center">
                  <GraficoLocalTrabalho periodo="30dias" titulo={""} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modal LocalTrabalho */}
        <Modal
          aberto={mostrarModal}
          onFechar={() => setMostrarModal(false)}
          modalClassName=""
        >
          <LocalTrabalho onFechar={() => setMostrarModal(false)} />
        </Modal>
      </main>
    </div>
  );
}

function getWeekNumber(d: Date) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}
