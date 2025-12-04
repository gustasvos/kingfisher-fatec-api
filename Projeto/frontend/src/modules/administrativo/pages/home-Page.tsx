import { useState, useEffect, useCallback } from "react";
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
  const [localTrabalhoUpdateKey, setLocalTrabalhoUpdateKey] = useState(0);
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

  const checkModal = useCallback(async () => {
    if (!userId || !token) return;
    try {
      const resp = await instance.get(`/usuario/${userId}/local/check`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMostrarModal(resp.data?.mostrarModal ?? false);
    } catch (error) {
      console.error("Erro ao checar modal:", error);
    }
  }, [userId, token]);

  const fetchEventos = useCallback(() => {
    if (!token) return;
    instance
      .get("/admin/events", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setEventos(res.data))
      .catch((err) => console.error("Erro ao buscar eventos:", err));
  }, [token]);

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
    fetchEventos();
  }, [token, fetchEventos]);

  useEffect(() => {
    if (user) {
      checkModal();
    }
  }, [user, checkModal, localTrabalhoUpdateKey]);

  const handleLocalTrabalhoClose = () => {
    setMostrarModal(false);
    setLocalTrabalhoUpdateKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 py-6 sm:py-8 max-w-full">
        <Header user={user} />

        {/* ======= Grid Principal ======= */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
          {/* Lado esquerdo */}
          <div className="col-span-8 lg:col-span-4 space-y-6">
            <div className="shadow-md bg-white rounded-md p-3">
            <CalendarioHome
              currentMonth={currentMonth}
              currentYear={currentYear}
              todayDay={new Date().getDate()}
              todayMonth={new Date().getMonth() + 1}
              todayYear={new Date().getFullYear()}
            />
            </div>
            <div className="shadow-md bg-white rounded-md p-3">
            <ContadorHome eventos={eventos} />
            </div>
          </div>

          <div className="col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-[12px] shadow-md p-6 flex flex-col items-center justify-center">
                <h3 className="font-semibold mb-4 text-black">Locais de Trabalho (Hoje)</h3>
                <div className="h-[250px] w-full flex items-center justify-center">
                  <GraficoLocalTrabalho key={`hoje-${localTrabalhoUpdateKey}`} periodo="hoje" titulo={""} />
                </div>
              </div>

              <div className="bg-white rounded-[12px] shadow-md p-6 flex flex-col items-center justify-center">
                <h3 className="font-semibold mb-4 text-black">Locais de Trabalho (Últimos 30 dias)</h3>
                <div className="h-[250px] w-full flex items-center justify-center">
                  <GraficoLocalTrabalho key={`30dias-${localTrabalhoUpdateKey}`} periodo="30dias" titulo={""} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modal LocalTrabalho */}
        <Modal aberto={mostrarModal} onFechar={() => setMostrarModal(false)} modalClassName="">
          <LocalTrabalho onFechar={handleLocalTrabalhoClose} />
        </Modal>
      </main>
    </div>
  );
}
