import { NavLink } from "react-router-dom";
import { courts } from "../../data/courts.js";
import CourtCard from "../courts/CourtCard.jsx";

export default function FeaturedCourts() {
  const featured = [...courts].sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <section className="container-app py-16 sm:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl font-bold">Quadras em destaque</h2>
          <p className="mt-2 text-slate-500">
            As mais reservadas da semana, com avaliação acima de 4,5.
          </p>
        </div>
        <NavLink to="/courts" className="btn-secondary">
          Ver todas as quadras
        </NavLink>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((court) => (
          <CourtCard key={court.id} court={court} />
        ))}
      </div>
    </section>
  );
}
