import { Routes, Route, Navigate } from "react-router-dom";
import { Homepage } from "./pages/Homepage.tsx";
import { LoginPage } from "./pages/LoginPage.tsx";
import { SignupPage } from "./pages/SignupPage.tsx";
import { Footer } from "./components/Footer.tsx";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser.ts";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import WatchPage from "./pages/WatchPage.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import SearchHistoryPage from "./pages/SearchHistoryPage.tsx";
import NotFoundPage from "./pages/NotFound.tsx";
function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore();
  console.log("auth user is heree", user);
  useEffect(() => {
    authCheck();
  }, [authCheck]);
  if (isCheckingAuth) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10" />
        </div>
      </div>
    );
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to={"/"} />}
        ></Route>
        <Route
          path="/signup"
          element={!user ? <SignupPage /> : <Navigate to={"/"} />}
        ></Route>
        <Route
          path="/watch/:id"
          element={user ? <WatchPage /> : <Navigate to={"/"} />}
        ></Route>
        <Route
          path="/search"
          element={user ? <SearchPage /> : <Navigate to={"/"} />}
        ></Route>
        <Route
          path="/history"
          element={user ? <SearchHistoryPage /> : <Navigate to={"/"} />}
        ></Route>
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
