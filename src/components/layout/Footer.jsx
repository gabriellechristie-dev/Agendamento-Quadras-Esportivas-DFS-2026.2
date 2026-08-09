import { NavLink } from "react-router-dom";
import { CalendarCheck, Mail, Phone, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-100/60">
      <div className="container-app py-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient text-white">
              <CalendarCheck size={18} />
            </span>
            <span className="font-display text-lg font-bold">ArenaPlay</span>
          </div>
          <p className="mt-4 text-sm text-slate-500 max-w-xs">
            Reserve quadras esportivas em poucos cliques, com disponibilidade em tempo real e
            preço transparente.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold text-slate-900">Navegar</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-500">
            <li>
              <NavLink to="/courts" className="hover:text-brand-600">
                Todas as quadras
              </NavLink>
            </li>
            <li>
              <NavLink to="/my-bookings" className="hover:text-brand-600">
                Minhas reservas
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className="hover:text-brand-600">
                Entrar
              </NavLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold text-slate-900">Esportes</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-500">
            <li>Futsal e Society</li>
            <li>Beach Tennis</li>
            <li>Tênis e Basquete</li>
            <li>Vôlei de areia</li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold text-slate-900">Suporte</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-500">
            <li className="flex items-center gap-2">
              <Mail size={15} /> contato@arenaplay.com.br
            </li>
            <li className="flex items-center gap-2">
              <Phone size={15} /> (11) 4002-8922
            </li>
            <li className="flex items-center gap-2">
              <Clock size={15} /> Seg a dom, 8h às 22h
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200 py-6 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} ArenaPlay. Todos os direitos reservados. Projeto acadêmico —
        DFS-2026.2.
      </div>
    </footer>
  );
}
