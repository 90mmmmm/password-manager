"use client";

import { createContext, useEffect, useState } from "react";
import { initJuno, authSubscribe } from "@junobuild/core-peer";
import Authentication from "@/components/Pages/Authentication";
import Dashboard from "@/components/Pages/Dashboard";
import { Toaster } from "@/components/ui/toaster";

export const AuthContext = createContext();

export default function Home() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    // Initialize Juno backend
    const initializeJuno = async () => {
      await initJuno({
        satelliteId: "b44l3-vyaaa-aaaal-ad6qq-cai",
      });
    };
    initializeJuno();

    // Subscribe to authentication changes
    const subscription = authSubscribe((user) => setUser(user));

    return () => {
      subscription(); // Clean up subscription
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {user !== undefined && user !== null ? <Dashboard /> : <Authentication />}
      <Toaster />
    </AuthContext.Provider>
  );
}
