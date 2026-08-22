import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

const AuthContext = createContext(null);

const STORAGE_KEY = "arenaplay:user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  async function login(credentials) {
    try {
      const email = credentials.email;
      const senha = credentials.password || credentials.senha;

      const response = await api.post("/auth/login", {
        email,
        senha,
      });

      const { token, usuario, user: userData } = response.data;
      if (token) {
        localStorage.setItem("arenaplay:token", token);
      }
      setUser(userData || usuario || { email });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  }

  function logout() {
    setUser(null);
  }

  async function register(dadosCadastro) {
    try {
      await api.post("/jogadores", dadosCadastro);

      await login({
        email: dadosCadastro.email,
        senha: dadosCadastro.senha || dadosCadastro.password,
      });
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: Boolean(user), login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
