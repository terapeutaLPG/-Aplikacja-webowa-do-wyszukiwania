import { memo, useCallback, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

type ProfileData = {
  nick: string;
  bio: string;
};

const Profile = memo(() => {
  const [form, setForm] = useState<ProfileData>({ nick: "", bio: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const loadProfile = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const ref = doc(db, "profiles", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data() as Partial<ProfileData>;
          setForm({
            nick: data.nick ?? user.displayName ?? "",
            bio: data.bio ?? "",
          });
        } else {
          setForm({ nick: user.displayName ?? "", bio: "" });
        }
      } catch (error) {
        console.error("Błąd ładowania profilu:", error);
        setMessage("Nie udało się załadować profilu.");
      }
    };

    loadProfile();
  }, []);

  const handleChange = useCallback(
    (field: keyof ProfileData, value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const user = auth.currentUser;
      if (!user) {
        setMessage("Musisz być zalogowany, aby edytować profil.");
        return;
      }

      setLoading(true);
      setMessage("");

      try {
        await Promise.all([
          setDoc(
            doc(db, "profiles", user.uid),
            {
              ...form,
              userId: user.uid,
              updatedAt: new Date(),
            },
            { merge: true }
          ),
          updateProfile(user, { displayName: form.nick.trim() || undefined }),
        ]);

        setMessage("Profil zaktualizowany.");
      } catch (error) {
        console.error("Błąd zapisu profilu:", error);
        setMessage("Nie udało się zapisać profilu.");
      } finally {
        setLoading(false);
      }
    },
    [form]
  );

  if (!auth.currentUser) {
    return (
      <div style={{ padding: "1rem" }}>
        <h2>Profil</h2>
        <p>Musisz być zalogowany, aby edytować swój profil.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "1rem", maxWidth: 520 }}>
      <h2>Twój profil</h2>
      <p style={{ color: "#555", marginBottom: "1rem" }}>
        Ustaw widoczny w aplikacji nick oraz krótki opis.
      </p>

      {message && (
        <div
          style={{
            marginBottom: "1rem",
            padding: "0.75rem 1rem",
            borderRadius: "6px",
            backgroundColor: message.includes("nie udało") ? "#fdecea" : "#e8f5e9",
            color: message.includes("nie udało") ? "#b71c1c" : "#2e7d32",
            border: message.includes("nie udało") ? "1px solid #f5c6c6" : "1px solid #c8e6c9",
          }}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <label style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          <span>Nick widoczny w aplikacji</span>
          <input
            type="text"
            value={form.nick}
            onChange={(e) => handleChange("nick", e.target.value)}
            maxLength={40}
            placeholder="Twoj nick"
            required
            style={{
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          <span>Krótki opis (opcjonalnie)</span>
          <textarea
            value={form.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
            rows={4}
            maxLength={300}
            placeholder=" Twoj opis"
            style={{
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "15px",
              resize: "vertical",
            }}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px",
            backgroundColor: loading ? "#ccc" : "#646cff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Zapisywanie..." : "Zapisz profil"}
        </button>
      </form>
    </div>
  );
});

export default Profile;
