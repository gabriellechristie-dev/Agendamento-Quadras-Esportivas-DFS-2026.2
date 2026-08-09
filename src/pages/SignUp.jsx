import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function SignUp() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Preencha nome, e-mail e senha para criar sua conta.");
      return;
    }
    login({ name, email });
    const redirectTo = location.state?.from || "/my-bookings";
    navigate(redirectTo);
  }

  return (
    <div className="container-app flex justify-center py-16">
      <div className="card w-full max-w-md p-8">
        <h1 className="font-display text-2xl font-bold">Criar minha conta</h1>
        <p className="mt-1 text-sm text-slate-500">
          Cadastre-se para reservar quadras e acompanhar seus jogos.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-600">Nome completo</label>
            <input
              className="input mt-2"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            <label className="text-sm font-medium text-slate-600">Telefone</label>
            <input
              className="input mt-2"
              placeholder="(11) 99999-9999"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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

          <button type="submit" className="btn-primary w-full">
            Criar conta
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Já tem conta?{" "}
          <NavLink
            to="/login"
            state={location.state}
            className="font-semibold text-brand-600 hover:text-brand-700"
          >
            Entrar
          </NavLink>
        </p>
      </div>
    </div>
  );
}
