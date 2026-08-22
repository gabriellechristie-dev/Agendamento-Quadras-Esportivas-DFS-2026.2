import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CalendarCheck, Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";

const links = [
  { to: "/", label: "Início", end: true },
  { to: "/courts", label: "Quadras" },
  { to: "/my-bookings", label: "Minhas reservas" },
];

export default function Navbar() {
  // Dados e funções disponibilizados pelo AuthContext
  const { user, isAuthenticated, logout, tipo } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Encerra a sessão e envia o usuário para o login
  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-slate-50/90 backdrop-blur">
      <div className="container-app flex h-16 items-center justify-between gap-4">
        
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 shrink-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient text-white">
            <CalendarCheck size={18} />
          </span>

          <span className="font-display text-lg font-bold tracking-tight">
            ArenaPlay
          </span>
        </NavLink>

        {/* Navegação desktop */}
        <nav className="hidden md:flex items-center gap-1 rounded-full bg-slate-100 p-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Área de autenticação desktop */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              
              {/* Informações do usuário logado */}
              <NavLink
                to="/my-bookings"
                className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
              >
                {user?.email}

                {/* Mostra o tipo recebido pelo backend */}
                {tipo && (
                  <span className="text-xs text-slate-400">
                    {tipo}
                  </span>
                )}
              </NavLink>

              {/* Logout */}
              <button
                type="button"
                onClick={handleLogout}
                className="text-sm font-medium text-slate-500 hover:text-slate-800"
              >
                Sair
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <NavLink
                to="/login"
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                Entrar
              </NavLink>

              <NavLink
                to="/sign-up"
                className="btn-primary !px-5 !py-2.5 text-sm"
              >
                Criar conta
              </NavLink>
            </div>
          )}
        </div>

        {/* Botão do menu mobile */}
        <button
          type="button"
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-full text-slate-600"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Abrir menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
          
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-600"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {isAuthenticated ? (
            <>
              {/* Identificação do usuário no mobile */}
              <div className="px-3 py-2 text-sm text-slate-500">
                {user?.email}
                {tipo && ` • ${tipo}`}
              </div>

              <button
                type="button"
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="btn-secondary w-full !py-2.5 text-sm"
              >
                Sair
              </button>
            </>
          ) : (
            <div className="flex gap-2 pt-1">
              <NavLink
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="btn-secondary flex-1 !py-2.5 text-sm"
              >
                Entrar
              </NavLink>

              <NavLink
                to="/sign-up"
                onClick={() => setMenuOpen(false)}
                className="btn-primary flex-1 !py-2.5 text-sm"
              >
                Criar conta
              </NavLink>
            </div>
          )}
        </div>
      )}
    </header>
  );
}