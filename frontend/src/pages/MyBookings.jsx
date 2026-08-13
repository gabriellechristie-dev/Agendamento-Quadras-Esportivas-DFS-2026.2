import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { CalendarClock, Ticket, Heart, History, MapPin } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useBooking } from "../context/BookingContext.jsx";
import { getCourtById } from "../data/courts.js";
import { formatLongDate, formatPrice } from "../utils/formatters.js";
import CourtCard from "../components/courts/CourtCard.jsx";

const TABS = ["Próximos", "Histórico", "Favoritos", "Perfil"];

export default function MyBookings() {
  const { user, isAuthenticated } = useAuth();
  const { bookings, favorites, cancelBooking } = useBooking();
  const [activeTab, setActiveTab] = useState("Próximos");

  const today = new Date().toISOString().split("T")[0];

  const upcoming = useMemo(
    () => bookings.filter((b) => b.status === "confirmed" && b.date >= today),
    [bookings, today]
  );
  const history = useMemo(
    () => bookings.filter((b) => b.status === "cancelled" || b.date < today),
    [bookings, today]
  );
  const totalSpent = useMemo(
    () => bookings.filter((b) => b.status === "confirmed").reduce((sum, b) => sum + b.price, 0),
    [bookings]
  );
  const favoriteCourts = favorites.map((id) => getCourtById(id)).filter(Boolean);

  if (!isAuthenticated) {
    return (
      <div className="container-app flex flex-col items-center justify-center py-24 text-center">
        <h1 className="font-display text-2xl font-bold">Entre para ver suas reservas</h1>
        <p className="mt-3 max-w-sm text-slate-500">
          Seu painel reúne próximos jogos, histórico, favoritos e perfil.
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
      <h1 className="font-display text-3xl font-bold">Olá, {user.name}</h1>
      <p className="mt-1 text-slate-500">Acompanhe seus jogos e mantenha seus dados em dia.</p>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={CalendarClock} value={upcoming.length} label="Próximos jogos" />
        <StatCard icon={Ticket} value={bookings.length} label="Total de reservas" />
        <StatCard icon={Heart} value={favoriteCourts.length} label="Favoritas" />
        <StatCard icon={History} value={formatPrice(totalSpent)} label="Total investido" />
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
        {activeTab === "Próximos" && (
          <BookingList
            bookings={upcoming}
            emptyTitle="Nenhuma reserva por aqui"
            emptyDescription="Escolha uma quadra e garanta o próximo jogo da turma."
            onCancel={cancelBooking}
          />
        )}

        {activeTab === "Histórico" && (
          <BookingList
            bookings={history}
            emptyTitle="Nenhum histórico ainda"
            emptyDescription="Suas reservas passadas e canceladas vão aparecer aqui."
          />
        )}

        {activeTab === "Favoritos" &&
          (favoriteCourts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {favoriteCourts.map((court) => (
                <CourtCard key={court.id} court={court} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Nenhuma quadra favoritada"
              description="Toque no coração de uma quadra para salvá-la aqui."
            />
          ))}

        {activeTab === "Perfil" && (
          <div className="card max-w-md p-6">
            <h2 className="font-display text-lg font-bold">Meus dados</h2>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-xs font-medium uppercase text-slate-400">Nome</p>
                <p className="text-sm font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase text-slate-400">E-mail</p>
                <p className="text-sm font-medium">{user.email || "—"}</p>
              </div>
            </div>
          </div>
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
        const court = getCourtById(booking.courtId);
        return (
          <div
            key={booking.id}
            className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-4">
              <div>
                <p className="font-semibold">{booking.courtName}</p>
                <p className="flex items-center gap-1 text-sm text-slate-500">
                  <MapPin size={13} />
                  {court ? `${court.neighborhood}, ${court.city}` : ""}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {formatLongDate(booking.date)} · {booking.time}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-bold">{formatPrice(booking.price)}</p>
                <p
                  className={`text-xs font-semibold ${
                    booking.status === "confirmed" ? "text-emerald-600" : "text-rose-500"
                  }`}
                >
                  {booking.status === "confirmed" ? "Confirmada" : "Cancelada"}
                </p>
              </div>
              {onCancel && booking.status === "confirmed" && (
                <button onClick={() => onCancel(booking.id)} className="btn-secondary !px-4 !py-2 text-sm">
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
