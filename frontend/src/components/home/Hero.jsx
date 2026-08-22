import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Sparkles } from "lucide-react";
import { SPORTS } from "../../data/courts.js";

export default function Hero() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    navigate(search ? `/courts?search=${encodeURIComponent(search)}` : "/courts");
  }

  return (
    <section className="relative overflow-hidden bg-brand-950">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-brand-900 to-emerald-800" />
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="absolute -bottom-24 left-1/4 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <div className="container-app relative py-24 sm:py-32">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur">
            <Sparkles size={14} /> +1.200 reservas por mês
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-white sm:text-6xl">
            Sua quadra reservada em poucos cliques
          </h1>

          <p className="mt-5 max-w-lg text-lg text-white/80">
            Futsal, society, beach tennis, tênis e basquete. Veja horários livres agora mesmo e
            garanta o jogo com a sua turma.
          </p>

          <form
            onSubmit={handleSearch}
            className="mt-8 flex flex-col gap-2 rounded-2xl bg-white p-2 shadow-card-hover sm:flex-row"
          >
            <div className="flex flex-1 items-center gap-2 px-3">
              <Search size={18} className="text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Busque por esporte, bairro ou quadra"
                className="w-full border-none py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
            </div>
            <button type="submit" className="btn-primary justify-center">
              Reservar agora
            </button>
          </form>

          <div className="mt-6 flex flex-wrap gap-2">
            {SPORTS.map((sport) => (
              <button
                key={sport}
                onClick={() => navigate(`/courts?sport=${encodeURIComponent(sport)}`)}
                className="rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur hover:bg-white/20 transition"
              >
                {sport}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
