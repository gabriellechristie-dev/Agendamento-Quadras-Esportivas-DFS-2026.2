import { NavLink } from "react-router-dom";
import { Heart, MapPin } from "lucide-react";
import StarRating from "../ui/StarRating.jsx";
import Badge from "../ui/Badge.jsx";
import CourtImage from "../ui/CourtImage.jsx";
import { formatPrice } from "../../utils/formatters.js";
import { useBooking } from "../../context/BookingContext.jsx";

export default function CourtCard({ court }) {
  const { isFavorite, toggleFavorite } = useBooking();
  const favorited = isFavorite(court.id);

  return (
    <div className="card overflow-hidden group flex flex-col h-full">
      <div className="relative h-52 overflow-hidden">
        <CourtImage
          sport={court.sport}
          src={court.image}
          alt={court.name}
          className="h-full w-full transition-transform duration-300 group-hover:scale-105"
        />
        {court.availableNow && (
          <div className="absolute left-3 top-3">
            <Badge tone="success">Disponível agora</Badge>
          </div>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(court.id);
          }}
          aria-label="Favoritar quadra"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-600 hover:bg-white transition"
        >
          <Heart size={16} className={favorited ? "fill-rose-500 text-rose-500" : ""} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold leading-snug">{court.name}</h3>
          <StarRating rating={court.rating} />
        </div>

        <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
          <MapPin size={14} /> {court.neighborhood}, {court.city}
        </p>

        <div className="mt-3">
          <Badge tone="neutral">{court.sport}</Badge>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-lg font-bold">
            {formatPrice(court.pricePerHour)}
            <span className="text-sm font-normal text-slate-400"> /hora</span>
          </p>
          <NavLink to={`/courts/${court.id}`} className="btn-primary !px-5 !py-2 text-sm">
            Reservar
          </NavLink>
        </div>
      </div>
    </div>
  );
}
