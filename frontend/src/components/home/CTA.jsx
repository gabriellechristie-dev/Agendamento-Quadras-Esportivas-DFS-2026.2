import { NavLink } from "react-router-dom";
import { MapPin } from "lucide-react";

export default function CTA() {
  return (
    <section className="container-app pb-16 sm:pb-20">
      <div className="rounded-2xl bg-brand-gradient px-6 py-16 text-center sm:px-16">
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
          Bora marcar o próximo jogo?
        </h2>
        <p className="mt-3 text-white/85">
          Escolha a quadra, veja os horários livres e confirme em segundos.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <NavLink to="/courts" className="btn-secondary !bg-white/95">
            <MapPin size={16} /> Encontrar quadras
          </NavLink>
          <NavLink
            to="/sign-up"
            className="btn bg-transparent border border-white/60 text-white px-6 py-3 hover:bg-white/10"
          >
            Criar minha conta
          </NavLink>
        </div>
      </div>
    </section>
  );
}
