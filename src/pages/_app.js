import { Navbar } from "../components";
import { createContext, useEffect, useState } from "react";
import http from "../axios";

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => null,
});

export default function App({ Component, pageProps }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    http.get("/api/me").then((res) => {
      setIsAuthenticated(res.data.success);
    });
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{
          isAuthenticated,
          setIsAuthenticated,
        }}
      >
        <Navbar />
        <Component {...pageProps} />
      </AuthContext.Provider>
    </>
  );
}
