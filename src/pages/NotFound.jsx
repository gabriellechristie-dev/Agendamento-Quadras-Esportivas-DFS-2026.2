import { NavLink } from "react-router-dom";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-app flex flex-col items-center justify-center gap-3 py-24 text-center">
      <Compass className="text-slate-300" size={40} />
      <h1 className="font-display text-2xl font-bold">Página não encontrada</h1>
      <p className="max-w-xs text-sm text-slate-500">
        O conteúdo que você procura não existe ou foi movido.
      </p>
      <NavLink to="/" className="btn-primary mt-3">
        Voltar ao início
      </NavLink>
    </div>
  );
}
