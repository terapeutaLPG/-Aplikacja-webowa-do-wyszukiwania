import { Link, useLocation } from "react-router-dom";
import { useStore } from "../store";
import { memo } from "react";

const NavBar = memo(() => {
  const { pathname } = useLocation();
  const { isAuth, logout } = useStore();
  const is = (p: string) => pathname === p;

  return (
    <nav
      style={{
        display: "flex",
        gap: "1rem",
        padding: "1rem 0",
        borderBottom: "1px solid #ccc",
        marginBottom: "2rem",
        alignItems: "center",
      }}
    >
      <Link
        to="/"
        style={{
          fontWeight: "bold",
          fontSize: "18px",
          textDecoration: "none",
          color: "#646cff",
        }}
      >
        🔍 FindBuddy
      </Link>

      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        {!isAuth ? (
          <>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "#646cff" }}
            >
              Logowanie
            </Link>
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "#646cff" }}
            >
              Rejestracja
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/preferences"
              style={{ textDecoration: "none", color: "#646cff" }}
            >
              Preferencje
            </Link>
            <Link
              to="/search"
              style={{ textDecoration: "none", color: "#646cff" }}
            >
              Szukaj
            </Link>
            <Link
              to="/matches"
              style={{ textDecoration: "none", color: "#646cff" }}
            >
              Dopasowania
            </Link>
            <button
              onClick={logout}
              style={{
                background: "none",
                border: "1px solid #646cff",
                color: "#646cff",
                padding: "5px 10px",
                borderRadius: "3px",
                cursor: "pointer",
              }}
            >
              Wyloguj
            </button>
          </>
        )}
      </div>
    </nav>
  );
});

export default NavBar;
