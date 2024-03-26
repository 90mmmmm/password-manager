"use client";

import { createContext, useEffect, useState } from "react";

import Authentication from "@/components/Pages/Authentication";
import Dashboard from "@/components/Pages/Dashboard";

import { Toaster } from "@/components/ui/toaster";

export const AuthContext = createContext();

export default function Home() {
  const [user, setUser] = useState(undefined);

  useEffect( () => {
    const sub = authSubscribe ((user) => setUser(user));

    return () => sub();
}, []);

  return (
    <AuthContext.Provider value={{ user }}>
    {user !== undefined && user !== null ? <Dashboard /> : <Authentication />}
          <Toaster />
    </AuthContext.Provider>
  );
}
