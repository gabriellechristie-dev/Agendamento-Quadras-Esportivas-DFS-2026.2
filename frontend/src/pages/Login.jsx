import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Preencha e-mail e senha para continuar.");
      return;
    }
    setError("");
    try {
      await login(email, password );
      const redirectTo = location.state?.from || "/my-bookings";
      navigate(redirectTo);
    } catch (error) {
      setError(error.response?.data?.mensagem || "Não foi possível fazer login. Tente novamente mais tarde.");
      return;
    }

  };

  return (
    <div className="container-app flex justify-center py-16">
      <div className="card w-full max-w-md p-8">
        <h1 className="font-display text-2xl font-bold">Entrar no ArenaPlay</h1>
        <p className="mt-1 text-sm text-slate-500">Acesse para ver suas reservas e favoritos.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-600">E-mail</label>
            <input
              type="email"
              className="input mt-2"
              placeholder="voce@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">Senha</label>
            <input
              type="password"
              className="input mt-2"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-sm font-medium text-rose-600">{error}</p>}

          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Ainda não tem conta?{" "}
          <NavLink
            to="/sign-up"
            state={location.state}
            className="font-semibold text-brand-600 hover:text-brand-700"
          >
            Criar conta
          </NavLink>
        </p>
      </div>
    </div>
  );
}
