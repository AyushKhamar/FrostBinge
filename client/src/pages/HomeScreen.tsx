import React from "react";
import { useAuthStore } from "../store/authUser.ts";

export const HomeScreen = () => {
  const { logout } = useAuthStore();
  return (
    <div>
      <button
        className="text-white p-2 m-2 border-2 rounded-md border-cyan-50"
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>
    </div>
  );
};
