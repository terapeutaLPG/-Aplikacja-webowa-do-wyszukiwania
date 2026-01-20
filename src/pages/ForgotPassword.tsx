import { useState, useCallback, memo } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

const ForgotPassword = memo(() => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError("");
      setSuccess(false);

      try {
        await sendPasswordResetEmail(auth, email);
        setSuccess(true);
      } catch (err: unknown) {
        console.error("Błąd resetowania hasła:", err);
        const error = err as { code?: string; message?: string };
        setError(
          error.code === "auth/user-not-found"
            ? "Użytkownik o podanym adresie email nie istnieje"
            : "Błąd podczas wysyłania emaila resetującego hasło"
        );
      } finally {
        setLoading(false);
      }
    },
    [email]
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        padding: "2rem",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          borderRadius: "16px",
          padding: "2.5rem",
          maxWidth: "450px",
          width: "100%",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <h2
          style={{
            marginTop: 0,
            marginBottom: "1.5rem",
            fontSize: "2rem",
            fontWeight: "600",
            textAlign: "center",
            color: "rgba(255, 255, 255, 0.87)",
          }}
        >
          Przypomnij hasło
        </h2>
        <p
          style={{
            marginBottom: "2rem",
            textAlign: "center",
            color: "rgba(255, 255, 255, 0.6)",
            fontSize: "0.95rem",
            lineHeight: "1.5",
          }}
        >
          Podaj adres email powiązany z Twoim kontem, a wyślemy Ci link do
          resetowania hasła.
        </p>

        {error && (
          <div
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              color: "#ef4444",
              padding: "0.875rem 1rem",
              borderRadius: "8px",
              marginBottom: "1.5rem",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              fontSize: "0.9rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span style={{ fontSize: "1.2rem" }}>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div
            style={{
              backgroundColor: "rgba(34, 197, 94, 0.1)",
              color: "#22c55e",
              padding: "0.875rem 1rem",
              borderRadius: "8px",
              marginBottom: "1.5rem",
              border: "1px solid rgba(34, 197, 94, 0.3)",
              fontSize: "0.9rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span style={{ fontSize: "1.2rem" }}>✓</span>
            <span>
              Email z linkiem do resetowania hasła został wysłany na podany
              adres.
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "0.9rem",
                fontWeight: "500",
                color: "rgba(255, 255, 255, 0.8)",
              }}
            >
              Adres email
            </label>
            <input
              id="email"
              type="email"
              placeholder="twoj@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.875rem 1rem",
                borderRadius: "8px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                color: "rgba(255, 255, 255, 0.87)",
                fontSize: "1rem",
                transition: "all 0.2s ease",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#646cff";
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
                e.target.style.outline = "none";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.875rem 1.5rem",
              backgroundColor: loading ? "#4a5568" : "#646cff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "1rem",
              fontWeight: "500",
              transition: "all 0.2s ease",
              boxShadow: loading
                ? "none"
                : "0 4px 12px rgba(100, 108, 255, 0.3)",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = "#535bf2";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 16px rgba(100, 108, 255, 0.4)";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = "#646cff";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(100, 108, 255, 0.3)";
              }
            }}
          >
            {loading ? "Wysyłanie..." : "Zresetuj haslo"}
          </button>
        </form>
      </div>
    </div>
  );
});

export default ForgotPassword;
