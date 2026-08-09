import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchX } from "lucide-react";
import { courts } from "../data/courts.js";
import CourtCard from "../components/courts/CourtCard.jsx";
import CourtFilters from "../components/courts/CourtFilters.jsx";

const INITIAL_FILTERS = {
  search: "",
  sports: [],
  cities: [],
  maxPrice: 200,
  onlyAvailable: false,
};

export default function Courts() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState(() => {
    const sport = searchParams.get("sport");
    const search = searchParams.get("search");
    return {
      ...INITIAL_FILTERS,
      sports: sport ? [sport] : [],
      search: search || "",
    };
  });

  const results = useMemo(() => {
    return courts.filter((court) => {
      const searchOk =
        !filters.search ||
        `${court.name} ${court.neighborhood} ${court.sport}`
          .toLowerCase()
          .includes(filters.search.toLowerCase());
      const sportOk = filters.sports.length === 0 || filters.sports.includes(court.sport);
      const cityOk = filters.cities.length === 0 || filters.cities.includes(court.city);
      const priceOk = court.pricePerHour <= filters.maxPrice;
      const availableOk = !filters.onlyAvailable || court.availableNow;
      return searchOk && sportOk && cityOk && priceOk && availableOk;
    });
  }, [filters]);

  return (
    <div className="container-app py-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Quadras disponíveis</h1>
        <p className="mt-1 text-slate-500">
          {results.length} quadra(s) encontrada{results.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        <CourtFilters
          filters={filters}
          setFilters={setFilters}
          onReset={() => setFilters(INITIAL_FILTERS)}
        />

        {results.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((court) => (
              <CourtCard key={court.id} court={court} />
            ))}
          </div>
        ) : (
          <div className="card flex flex-col items-center justify-center gap-3 py-20 text-center">
            <SearchX className="text-slate-300" size={40} />
            <p className="font-display text-lg font-semibold">Nenhuma quadra encontrada</p>
            <p className="max-w-xs text-sm text-slate-500">
              Ajuste os filtros ou tente outra busca para ver mais opções.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
