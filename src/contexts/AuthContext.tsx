import api from "@/services/api";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";
import Router from "next/router";

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: SigninValues) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

type Props = {
  children: ReactNode;
};

type SigninValues = {
  usuario: string;
  password: string;
};

type User = {
  id: string;
  email: string;
  name: string;
  created_at: string;
  updated_at: string;
  status: boolean;
  rol: string;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { token } = parseCookies();
    if (token) {
      api.get("me").then(({ data }) => {
        setUser(data);
      });
    }
  }, []);

  async function signIn(values: SigninValues) {
    const { data } = await api.post("/login", values);

    const { token } = data;

    setCookie(undefined, "token", token);

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.get("me");

    setUser(response.data);

    setCookie(undefined, "rol", response.data.rol);

    Router.push("/");
  }

  function logout() {
    destroyCookie(null, "token");
    destroyCookie(null, "rol");
    Router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}
