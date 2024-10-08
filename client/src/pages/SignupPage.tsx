import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useAuthStore } from "../store/authUser.ts";

export const SignupPage = () => {
  const [searchParams] = useSearchParams();
  const queryValue = searchParams.get("email");
  const [email, setEmail] = useState(queryValue || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { signup } = useAuthStore();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signup({ email, username, password });
    console.log(e.target);
  };
  return (
    <div className="h-screen w-full hero-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="logo" className="w-52" />
        </Link>
      </header>
      <div className="flex items-center justify-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
          <h1 className="text-center text-white text-2xl font-bold mb-4">
            Signup
          </h1>
          <form action="" className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300 block"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="you@example.com"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-300 block"
              >
                Username
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="Habibi who are you ?"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300 block"
              >
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="Dont Share!"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
            >
              SignUp
            </button>
          </form>
          <div className="text-center text-gray-400">
            Already a member ?{" "}
            <Link className="text-red-600 hover:underline" to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
