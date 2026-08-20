import { createContext, useContext, useEffect, useState } from "react";

import { login as loginService } from "../services/authService.js";

const AuthContext = createContext(null);


const STORAGE_KEY = "arenaplay:user";


const TOKEN_KEY = "arenaplay:token";

export function AuthProvider({ children }) {
 
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);

      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  
  const [token, setToken] = useState(
    localStorage.getItem(TOKEN_KEY)
  );


  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    if (user) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

 
  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  }, [token]);

 
  const login = async (email, password) => {
    setLoading(true);

    try {
      const response = await loginService(
        email,
        password
      );

     
      setUser(response.usuario);
      setToken(response.token);
    } finally {
      
      setLoading(false);
    }
  };

  
  function logout() {
    setUser(null);
    setToken(null);
  }

  
  const tipo = user?.tipo;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        tipo,
        loading,
        isAuthenticated: Boolean(user && token),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }

  return ctx;
}