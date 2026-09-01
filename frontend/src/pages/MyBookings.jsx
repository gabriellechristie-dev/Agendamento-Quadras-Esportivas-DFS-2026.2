import { useMemo, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { CalendarClock, Ticket, Heart, History, MapPin, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { formatLongDate, formatPrice } from "../utils/formatters.js";
import { reservaService } from "../services/reservaService.js";

const TABS = ["Próximos", "Histórico", "Perfil"];

export default function MyBookings() {
  const { user, isAuthenticated } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Próximos");

  const fetchReservas = async () => {
    try {
      setLoading(true);
      const data = await reservaService.listarMinhas();
      setBookings(data || []);
    } catch (err) {
      console.error("Erro ao carregar reservas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchReservas();
    }
  }, [isAuthenticated]);

  const handleCancelBooking = async (reservaId) => {
    if (window.confirm("Deseja realmente cancelar este agendamento?")) {
      try {
        await reservaService.cancelar(reservaId);
        await fetchReservas(); // Recarrega a lista atualizada do backend
      } catch (err) {
        alert("Erro ao cancelar reserva. Tente novamente.");
      }
    }
  };

  const today = new Date().toISOString();

  const upcoming = useMemo(
    () => bookings.filter((b) => b.status === "ATIVA" && b.horarioInicio >= today),
    [bookings, today]
  );

  const history = useMemo(
    () => bookings.filter((b) => b.status === "CANCELADA" || b.horarioInicio < today),
    [bookings, today]
  );

  if (!isAuthenticated) {
    return (
      <div className="container-app flex flex-col items-center justify-center py-24 text-center">
        <h1 className="font-display text-2xl font-bold">Entre para ver suas reservas</h1>
        <p className="mt-3 max-w-sm text-slate-500">
          Seu painel reúne próximos jogos, histórico e perfil.
        </p>
        <div className="mt-6 flex gap-3">
          <NavLink to="/login" className="btn-primary">
            Entrar
          </NavLink>
          <NavLink to="/sign-up" className="btn-secondary">
            Criar conta
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="container-app py-10">
      <h1 className="font-display text-3xl font-bold">
        Olá, {user?.nomeCompleto || user?.nome || "Jogador"}
      </h1>
      <p className="mt-1 text-slate-500">Acompanhe seus jogos e mantenha seus dados em dia.</p>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
        <StatCard icon={CalendarClock} value={upcoming.length} label="Próximos jogos" />
        <StatCard icon={Ticket} value={bookings.length} label="Total de reservas" />
        <StatCard icon={History} value={history.length} label="Histórico" />
      </div>

      <div className="mt-8 inline-flex flex-wrap gap-1 rounded-full bg-slate-100 p-1">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activeTab === tab
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="flex h-32 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-brand-600" />
          </div>
        ) : (
          <>
            {activeTab === "Próximos" && (
              <BookingList
                bookings={upcoming}
                emptyTitle="Nenhuma reserva ativa"
                emptyDescription="Escolha uma quadra e garanta o próximo jogo da turma."
                onCancel={handleCancelBooking}
              />
            )}

            {activeTab === "Histórico" && (
              <BookingList
                bookings={history}
                emptyTitle="Nenhum histórico ainda"
                emptyDescription="Suas reservas passadas e canceladas vão aparecer aqui."
              />
            )}

            {activeTab === "Perfil" && (
              <div className="card max-w-md p-6">
                <h2 className="font-display text-lg font-bold">Meus dados</h2>
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-xs font-medium uppercase text-slate-400">Nome</p>
                    <p className="text-sm font-medium">{user?.nomeCompleto || user?.nome || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase text-slate-400">E-mail</p>
                    <p className="text-sm font-medium">{user?.email || "—"}</p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, value, label }) {
  return (
    <div className="card p-5">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gradient text-white">
        <Icon size={18} />
      </span>
      <p className="mt-3 font-display text-2xl font-bold">{value}</p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  );
}

function EmptyState({ title, description, children }) {
  return (
    <div className="card flex flex-col items-center gap-3 py-16 text-center">
      <p className="font-display text-lg font-semibold">{title}</p>
      <p className="max-w-xs text-sm text-slate-500">{description}</p>
      {children}
    </div>
  );
}

function BookingList({ bookings, emptyTitle, emptyDescription, onCancel }) {
  if (bookings.length === 0) {
    return (
      <EmptyState title={emptyTitle} description={emptyDescription}>
        <NavLink to="/courts" className="btn-primary mt-2">
          Ver quadras
        </NavLink>
      </EmptyState>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => {
        const horaInicio = new Date(booking.horarioInicio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        return (
          <div
            key={booking.id}
            className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-4">
              <div>
                <p className="font-semibold">{booking.quadra?.nome || "Quadra Esportiva"}</p>
                <p className="flex items-center gap-1 text-sm text-slate-500">
                  <MapPin size={13} />
                  {booking.quadra?.localizacao || "Endereço não cadastrado"}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {formatLongDate(booking.horarioInicio?.split("T")[0])} · {horaInicio}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p
                  className={`text-xs font-semibold ${
                    booking.status === "ATIVA" ? "text-emerald-600" : "text-rose-500"
                  }`}
                >
                  {booking.status === "ATIVA" ? "Ativa" : "Cancelada"}
                </p>
              </div>
              {onCancel && booking.status === "ATIVA" && (
                <button
                  onClick={() => onCancel(booking.id)}
                  className="btn-secondary !px-4 !py-2 text-sm text-rose-600 hover:bg-rose-50"
                >
                  Cancelar
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}