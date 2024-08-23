import React from "react";
import { HomeScreen } from "./HomeScreen.tsx";
import { AuthScreen } from "./AuthScreen.tsx";
import { useAuthStore } from "../store/authUser.ts";

export const Homepage = () => {
  const { user } = useAuthStore();
  return (
    <div className="hero-bg h-screen">
      {user ? <HomeScreen /> : <AuthScreen />}
    </div>
  );
};
