import { useMemo, useState } from "react";
import { useNavigate, useParams, useLocation, NavLink } from "react-router-dom";
import { CheckCircle2, Clock, Heart, LogIn, MapPin, Star } from "lucide-react";
import { getCourtById, getClosedSlots, TIME_SLOTS } from "../data/courts.js";
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
import NotFound from "./NotFound.jsx";

export default function CourtDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const court = getCourtById(id);
  const { isAuthenticated } = useAuth();
  const { isFavorite, toggleFavorite, isSlotBooked, createBooking } =
    useBooking();

  const days = useMemo(() => getUpcomingDays(7), []);
  const [selectedDay, setSelectedDay] = useState(days[0].iso);
  const [selectedTime, setSelectedTime] = useState(null);
  const [error, setError] = useState("");

  const slots = useMemo(() => {
    if (!court) return [];
    const closed = new Set(getClosedSlots(court.id, selectedDay));
    return TIME_SLOTS.map((time) => ({
      time,
      unavailable:
        closed.has(time) || isSlotBooked(court.id, selectedDay, time),
    }));
  }, [court, selectedDay, isSlotBooked]);

  if (!court) return <NotFound />;

  function handleBook() {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    if (!selectedTime) {
      setError("Selecione um horário para continuar.");
      return;
    }
    setError("");

    const booking = createBooking({
      courtId: court.id,
      courtName: court.name,
      sport: court.sport,
      date: selectedDay,
      time: selectedTime,
      price: court.pricePerHour,
    });

    navigate(`/booking-confirmed/${booking.id}`);
  }

  return (
    <div className="container-app py-10">
      <p className="text-sm text-slate-400">
        <NavLink to="/courts" className="hover:text-brand-600">
          Quadras
        </NavLink>{" "}
        / {court.name}
      </p>

      <div className="mt-2 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">{court.name}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <MapPin size={14} /> {court.neighborhood}, {court.city}
            </span>
            <span className="flex items-center gap-1 font-medium text-slate-700">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              {court.rating} ({court.reviewCount})
            </span>
            <span className="chip">{court.sport}</span>
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

      {/* Photo gallery. Each tile has an explicit pixel height (via flex
          stretch on a fixed-height row), so images never depend on a
          percentage height resolved against an auto-sized container —
          that dependency was the cause of the previous overlap bug. */}
      <div className="mt-6 flex flex-col gap-3 sm:h-[420px] sm:flex-row">
        <div className="h-64 overflow-hidden rounded-2xl sm:h-auto sm:flex-[2]">
          <CourtImage
            sport={court.sport}
            src={court.image}
            alt={court.name}
            className="h-full w-full"
          />
        </div>
        <div className="flex gap-3 sm:h-full sm:w-72 sm:flex-none sm:flex-col">
          <div className="h-32 flex-1 overflow-hidden rounded-2xl sm:h-auto">
            <CourtImage
              sport={court.sport}
              src={court.image2}
              alt={court.name}
              className="h-full w-full"
            />
          </div>
          <div className="h-32 flex-1 overflow-hidden rounded-2xl sm:h-auto">
            <CourtImage
              sport={court.sport}
              src={court.image3}
              alt={court.name}
              className="h-full w-full"
            />
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <section>
            <h2 className="font-display text-xl font-bold">Sobre a quadra</h2>
            <p className="mt-3 text-slate-600">{court.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {court.amenities.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>

            <p className="mt-4 flex items-center gap-2 text-sm text-slate-500">
              <Clock size={15} /> Funcionamento: {court.openingHours}
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

          <section className="mt-10">
            <h2 className="font-display text-xl font-bold">Localização</h2>
            <div className="mt-4 flex h-64 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-center text-sm text-slate-500">
              Mapa da região de {court.neighborhood}, {court.city}
              <br />
              (integração de mapa pronta para ser conectada)
            </div>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-xl font-bold">Regras da quadra</h2>
            <ul className="mt-4 space-y-3">
              {court.rules.map((rule) => (
                <li
                  key={rule}
                  className="flex items-start gap-2 text-sm text-slate-600"
                >
                  <CheckCircle2
                    size={17}
                    className="mt-0.5 shrink-0 text-emerald-500"
                  />{" "}
                  {rule}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10 pb-4">
            <h2 className="font-display text-xl font-bold">Avaliações</h2>
            {court.reviews.length > 0 ? (
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {court.reviews.map((review) => (
                  <div key={review.name} className="card p-5">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={15}
                          className={
                            i < review.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-200"
                          }
                        />
                      ))}
                    </div>
                    <p className="mt-3 text-sm text-slate-600">
                      “{review.comment}”
                    </p>
                    <p className="mt-3 text-sm font-semibold">
                      {review.name}{" "}
                      <span className="font-normal text-slate-400">
                        {review.sport}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-500">
                Esta quadra ainda não possui avaliações. Seja o primeiro a jogar
                e avaliar!
              </p>
            )}
          </section>
        </div>

        <aside className="card h-fit p-6 lg:sticky lg:top-24">
          <p className="text-3xl font-bold">
            {formatPrice(court.pricePerHour)}
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

          <button onClick={handleBook} className="btn-primary mt-5 w-full">
            {isAuthenticated ? "Reservar" : "Entrar para reservar"}
          </button>

          <p className="mt-3 text-center text-xs text-slate-400">
            A reserva é confirmada na hora, sem etapa de pagamento.
          </p>
        </aside>
      </div>
    </div>
  );
}
