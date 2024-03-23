import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { login, logout } from "./store/authSlice";
import authService from "./appwrite/auth";
import { Footer, Header } from "./components";
import Loading from "./components/Loading";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-wrap content-between dark:bg-zinc-900">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="w-full block">
            <Header />
            <main>
              <Outlet />
            </main>
          </div>
          <div className="w-full">
            <Footer />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
