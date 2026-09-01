import { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams, useLocation, NavLink } from "react-router-dom";
import { CheckCircle2, Clock, Heart, LogIn, MapPin, Star, Loader2 } from "lucide-react";
import {
  getUpcomingDays,
  formatLongDate,
  formatPrice,
} from "../utils/formatters.js";
import {
  DaySelector,
  TimeSelector,
} from "../components/booking/TimeSlotPicker.jsx";
import CourtImage from "../components/ui/CourtImage.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useBooking } from "../context/BookingContext.jsx";
import api from "../services/api.js";
import { reservaService } from "../services/reservaService.js";
import NotFound from "./NotFound.jsx";

const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
  "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
  "20:00", "21:00", "22:00"
];

export default function CourtDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { isFavorite, toggleFavorite } = useBooking();

  const [court, setCourt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const days = useMemo(() => getUpcomingDays(7), []);
  const [selectedDay, setSelectedDay] = useState(days[0].iso);
  const [selectedTime, setSelectedTime] = useState(null);

  // Buscar dados da quadra na API
  useEffect(() => {
    async function fetchCourt() {
      try {
        setLoading(true);
        const response = await api.get(`/quadras/${id}`);
        setCourt(response.data);
      } catch (err) {
        console.error("Erro ao buscar quadra:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCourt();
  }, [id]);

  const slots = useMemo(() => {
    return TIME_SLOTS.map((time) => ({
      time,
      unavailable: false, // Pode ser expandido buscando reservas existentes da quadra no dia
    }));
  }, [selectedDay]);

  if (loading) {
    return (
      <div className="container-app flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
      </div>
    );
  }

  if (!court) return <NotFound />;

  async function handleBook() {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    if (!selectedTime) {
      setError("Selecione um horário para continuar.");
      return;
    }
    setError("");

    try {
      setSubmitting(true);
      // Monta data e hora no formato ISO
      const dataHoraIso = `${selectedDay}T${selectedTime}:00`;

      const novaReserva = await reservaService.criar({
        quadraId: court.id,
        dataHora: dataHoraIso,
        duracao: 60, // 1 hora
      });

      // Redireciona para confirmação ou para a página de reservas
      const bookingId = novaReserva.reserva?.id || novaReserva.id;
      navigate(`/booking-confirmed/${bookingId}`, {
        state: { reserva: novaReserva.reserva || novaReserva }
      });
    } catch (err) {
      console.error("Erro ao realizar reserva:", err);
      setError(
        err.response?.data?.mensagem ||
        "Não foi possível concluir a reserva. Tente outro horário."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container-app py-10">
      <p className="text-sm text-slate-400">
        <NavLink to="/courts" className="hover:text-brand-600">
          Quadras
        </NavLink>{" "}
        / {court.nome}
      </p>

      <div className="mt-2 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">{court.nome}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <MapPin size={14} /> {court.localizacao || "Endereço não informado"}
            </span>
            <span className="chip">{court.modalidade}</span>
          </div>
        </div>

        <button
          onClick={() => toggleFavorite(court.id)}
          className="btn-secondary"
        >
          <Heart
            size={16}
            className={
              isFavorite(court.id) ? "fill-rose-500 text-rose-500" : ""
            }
          />
          Favoritar
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:h-[420px] sm:flex-row">
        <div className="h-64 overflow-hidden rounded-2xl sm:h-auto sm:flex-[2]">
          <CourtImage
            sport={court.modalidade}
            src={court.imagem}
            alt={court.nome}
            className="h-full w-full"
          />
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <section>
            <h2 className="font-display text-xl font-bold">Sobre a quadra</h2>
            <p className="mt-3 text-slate-600">
              {court.descricao || "Quadra esportiva de alta qualidade pronta para o seu jogo."}
            </p>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-xl font-bold">
              Horários disponíveis
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {formatLongDate(selectedDay)}
            </p>

            <div className="mt-4 space-y-4">
              <DaySelector
                days={days}
                selectedDay={selectedDay}
                onSelect={(iso) => {
                  setSelectedDay(iso);
                  setSelectedTime(null);
                }}
              />
              <TimeSelector
                slots={slots}
                selectedTime={selectedTime}
                onSelect={setSelectedTime}
              />
            </div>
          </section>
        </div>

        <aside className="card h-fit p-6 lg:sticky lg:top-24">
          <p className="text-3xl font-bold">
            {formatPrice(court.precoPorHora || 100)}
            <span className="text-base font-normal text-slate-400"> /hora</span>
          </p>

          <div className="mt-4 rounded-xl bg-slate-100 p-4">
            <p className="font-medium">{formatLongDate(selectedDay)}</p>
            <p className="text-sm text-slate-500">
              {selectedTime
                ? `Horário selecionado: ${selectedTime}`
                : "Selecione um horário livre"}
            </p>
          </div>

          {!isAuthenticated && (
            <p className="mt-3 flex items-center gap-2 text-sm font-medium text-brand-700">
              <LogIn size={15} /> Faça login para reservar esta quadra.
            </p>
          )}

          {error && (
            <p className="mt-3 text-sm font-medium text-rose-600">{error}</p>
          )}

          <button
            onClick={handleBook}
            disabled={submitting}
            className="btn-primary mt-5 w-full flex items-center justify-center gap-2"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {isAuthenticated ? "Confirmar Reserva" : "Entrar para reservar"}
          </button>
        </aside>
      </div>
    </div>
  );
}