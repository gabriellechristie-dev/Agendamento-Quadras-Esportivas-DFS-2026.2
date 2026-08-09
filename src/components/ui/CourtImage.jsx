import { Trophy } from "lucide-react";

const GRADIENTS = {
  Futsal: "from-blue-600 to-blue-400",
  Society: "from-emerald-600 to-emerald-400",
  "Beach Tennis": "from-amber-500 to-orange-400",
  Tênis: "from-orange-600 to-amber-400",
  Basquete: "from-purple-600 to-indigo-400",
  "Vôlei de Areia": "from-cyan-500 to-teal-400",
};

export default function CourtImage({ sport, src, alt, className = "" }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt || sport}
        className={`object-cover ${className}`}
        loading="lazy"
      />
    );
  }

  const gradient = GRADIENTS[sport] || "from-brand-600 to-brand-400";

  return (
    <div
      className={`relative flex items-center justify-center bg-gradient-to-br ${gradient} ${className}`}
    >
      <Trophy className="text-white/25" size={56} strokeWidth={1.5} />
      <span className="absolute bottom-3 right-3 rounded-full bg-black/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
        {sport}
      </span>
    </div>
  );
}
