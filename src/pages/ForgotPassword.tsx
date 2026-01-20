import { useState, useCallback, memo } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import "../App.css";

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
      } catch (error: any) {
        console.error("Błąd resetowania hasła:", error);
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
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h2 className="forgot-password-title">Przypomnij hasło</h2>
        <p className="forgot-password-description">
          Podaj adres email powiązany z Twoim kontem, a wyślemy Ci link do
          resetowania hasła.
        </p>

        {error && (
          <div className="forgot-password-error">
            <span className="forgot-password-message-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="forgot-password-success">
            <span className="forgot-password-message-icon">✓</span>
            <span>
              Email z linkiem do resetowania hasła został wysłany na podany
              adres.
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="forgot-password-form-group">
            <label htmlFor="email" className="forgot-password-label">
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
              className="forgot-password-input"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="forgot-password-button"
          >
            {loading ? "Wysyłanie..." : "Jesli Twoj mail jest w bazie, to wlasnie zostal wyslany link resetujacy haslo."}
          </button>
        </form>
      </div>
    </div>
  );
});

export default ForgotPassword;
