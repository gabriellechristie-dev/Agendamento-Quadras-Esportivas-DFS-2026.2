import { useParams, NavLink } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useBooking } from "../context/BookingContext.jsx";
import { formatLongDate, formatPrice } from "../utils/formatters.js";
import NotFound from "./NotFound.jsx";

export default function BookingConfirmed() {
  const { bookingId } = useParams();
  const { bookings } = useBooking();
  const booking = bookings.find((b) => b.id === bookingId);

  if (!booking) return <NotFound />;

  return (
    <div className="container-app flex justify-center py-16">
      <div className="card w-full max-w-md p-8 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white">
          <CheckCircle2 size={32} />
        </span>

        <h1 className="mt-5 font-display text-2xl font-bold">Reserva confirmada</h1>
        <p className="mt-1 text-sm text-slate-500">
          Comprovante{" "}
          <span className="font-semibold text-slate-700">{booking.confirmationCode}</span>
        </p>

        <div className="mt-6 space-y-2 rounded-xl bg-slate-100 p-5 text-left text-sm">
          <Row label="Quadra" value={booking.courtName} />
          <Row label="Data" value={formatLongDate(booking.date)} />
          <Row label="Horário" value={`${booking.time} · 1h`} />
          <div className="mt-2 flex items-center justify-between border-t border-slate-200 pt-3">
            <span className="font-semibold">Valor</span>
            <span className="font-bold">{formatPrice(booking.price)}</span>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <NavLink to="/my-bookings" className="btn-primary flex-1">
            Ver minhas reservas
          </NavLink>
          <NavLink to="/courts" className="btn-secondary flex-1">
            Reservar outra quadra
          </NavLink>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
