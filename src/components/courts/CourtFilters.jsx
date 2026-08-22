import { SlidersHorizontal, Search } from "lucide-react";
import { SPORTS, CITIES } from "../../data/courts.js";
import { formatPrice } from "../../utils/formatters.js";

export default function CourtFilters({ filters, setFilters, onReset }) {
  function toggleSport(sport) {
    setFilters((prev) => ({
      ...prev,
      sports: prev.sports.includes(sport)
        ? prev.sports.filter((s) => s !== sport)
        : [...prev.sports, sport],
    }));
  }

  function toggleCity(city) {
    setFilters((prev) => ({
      ...prev,
      cities: prev.cities.includes(city)
        ? prev.cities.filter((c) => c !== city)
        : [...prev.cities, city],
    }));
  }

  return (
    <aside className="card h-fit p-5 lg:sticky lg:top-24">
      <div className="flex items-center gap-2 font-display text-base font-semibold">
        <SlidersHorizontal size={17} /> Filtros
      </div>

      <div className="mt-5">
        <label className="text-sm font-medium text-slate-600">Busca</label>
        <div className="relative mt-2">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Quadra, bairro..."
            className="input pl-9"
            value={filters.search}
            onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
          />
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm font-medium text-slate-600">Esporte</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {SPORTS.map((sport) => {
            const active = filters.sports.includes(sport);
            return (
              <button
                key={sport}
                onClick={() => toggleSport(sport)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  active
                    ? "bg-brand-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {sport}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm font-medium text-slate-600">Cidade</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {CITIES.map((city) => {
            const active = filters.cities.includes(city);
            return (
              <button
                key={city}
                onClick={() => toggleCity(city)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  active
                    ? "bg-brand-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {city}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm font-medium text-slate-600">
          Preço máximo por hora: {formatPrice(filters.maxPrice)}
        </p>
        <input
          type="range"
          min={60}
          max={200}
          step={10}
          value={filters.maxPrice}
          onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
          className="mt-3 w-full accent-brand-600"
        />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-600">Disponível agora</p>
        <button
          role="switch"
          aria-checked={filters.onlyAvailable}
          onClick={() => setFilters((prev) => ({ ...prev, onlyAvailable: !prev.onlyAvailable }))}
          className={`h-6 w-11 rounded-full transition ${
            filters.onlyAvailable ? "bg-brand-600" : "bg-slate-200"
          }`}
        >
          <span
            className={`block h-5 w-5 translate-x-0.5 rounded-full bg-white transition-transform ${
              filters.onlyAvailable ? "translate-x-5" : ""
            }`}
          />
        </button>
      </div>

      <button
        onClick={onReset}
        className="mt-6 w-full text-center text-sm font-medium text-brand-600 hover:text-brand-700"
      >
        Limpar filtros
      </button>
    </aside>
  );
}
