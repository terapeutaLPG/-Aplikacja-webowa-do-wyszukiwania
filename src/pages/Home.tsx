import { useStore } from "../store";
import { memo } from "react";
import { Link } from "react-router-dom";

const Home = memo(() => {
  const { isAuth } = useStore();

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Aplikacja do wyszukiwania osób</h1>
      <p style={{ fontSize: "18px", marginBottom: "2rem" }}>
        Znajdź osoby do wspólnych aktywności!
      </p>

      {isAuth ? (
        <div>
          <p style={{ marginBottom: "2rem" }}>
            Witaj! Możesz teraz korzystać z aplikacji.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/preferences"
              style={{
                padding: "10px 20px",
                backgroundColor: "#646cff",
                color: "white",
                textDecoration: "none",
                borderRadius: "5px",
              }}
            >
              Ustaw preferencje
            </Link>
            <Link
              to="/search"
              style={{
                padding: "10px 20px",
                backgroundColor: "#42b883",
                color: "white",
                textDecoration: "none",
                borderRadius: "5px",
              }}
            >
              Szukaj osób
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <p style={{ marginBottom: "2rem" }}>
            Zaloguj się, aby korzystać z aplikacji.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
            }}
          >
            <Link
              to="/login"
              style={{
                padding: "10px 20px",
                backgroundColor: "#646cff",
                color: "white",
                textDecoration: "none",
                borderRadius: "5px",
              }}
            >
              Logowanie
            </Link>
            <Link
              to="/register"
              style={{
                padding: "10px 20px",
                backgroundColor: "#42b883",
                color: "white",
                textDecoration: "none",
                borderRadius: "5px",
              }}
            >
              Rejestracja
            </Link>
          </div>
        </div>
      )}
    </div>
  );
});

export default Home;
