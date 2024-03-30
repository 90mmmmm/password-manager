"use client";

import { createContext, useEffect, useState } from "react";
import { initJuno, authSubscribe } from "@junobuild/core-peer";
import Authentication from "@/components/Pages/Authentication";
import Dashboard from "@/components/Pages/Dashboard";
import { Toaster } from "@/components/ui/toaster";

export const AuthContext = createContext();
export const PasswordsContext = createContext();
export const FilterContext = createContext();

export default function Home() {
  const [user, setUser] = useState(undefined);

  const [passwords, setPasswords] = useState([]);

  const [filter, setFilter] = useState({
    passwordType: "passwords",
    filteredPasswords: passwords,
  });

  useEffect(() => {
    // Initialize Juno backend
    const initializeJuno = async () => {
      await initJuno({
        satelliteId: "b44l3-vyaaa-aaaal-ad6qq-cai",
      });
    };
    initializeJuno();

    // Subscribe to authentication changes
    const sub = authSubscribe((user) => setUser(user));

    return () => {
      sub(); // Clean up subscription
    };
  }, []);

  // Disable SSR for this page
Home.getInitialProps = () => {
  return { data: null };
};

  return (
    <AuthContext.Provider value={{ user }}>
       <PasswordsContext.Provider
        value={{ passwords: passwords, setPasswords: setPasswords }}
      >
        <FilterContext.Provider
          value={{ filter: filter, setFilter: setFilter }}
        >
      {user !== undefined && user !== null ? <Dashboard /> : <Authentication />}
      <Toaster />
      </FilterContext.Provider>
      </PasswordsContext.Provider>
    </AuthContext.Provider>
  );
}
