import { useState, useCallback, memo, useEffect } from "react";
import { useStore, type Preferences } from "../store";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const PreferencesPage = memo(() => {
  const { preferences, setPreferences } = useStore();
  const [formData, setFormData] = useState<Preferences>({
    typAktywnosci: "spacer",
    lokalizacja: "",
    dystansKm: 5,
    intensywnosc: "srednia",
  });
  const [loading, setLoading] = useState(false);

  // Załaduj preferencje z Firebase
  useEffect(() => {
    async function loadPreferences() {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const docRef = doc(db, "preferences", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const prefs: Preferences = {
            typAktywnosci: data.typAktywnosci,
            lokalizacja: data.lokalizacja,
            dystansKm: data.dystansKm,
            intensywnosc: data.intensywnosc,
          };
          setFormData(prefs);
          setPreferences(prefs);
        }
      } catch (error) {
        console.error("Błąd ładowania preferencji:", error);
      }
    }

    loadPreferences();
  }, [setPreferences]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const user = auth.currentUser;
      if (!user) {
        alert("Musisz być zalogowany!");
        return;
      }

      setLoading(true);
      try {
        await setDoc(doc(db, "preferences", user.uid), {
          ...formData,
          userId: user.uid,
          updatedAt: new Date(),
        });

        setPreferences(formData);
        alert("Preferencje zapisane!");
      } catch (error) {
        console.error("Błąd zapisywania preferencji:", error);
        alert("Błąd podczas zapisywania preferencji");
      } finally {
        setLoading(false);
      }
    },
    [formData, setPreferences]
  );

  const handleChange = useCallback(
    (field: keyof Preferences, value: string | number) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  return (
    <div>
      <h2>Preferencje</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Typ aktywności:
          </label>
          <select
            value={formData.typAktywnosci}
            onChange={(e) => handleChange("typAktywnosci", e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <option value="spacer">Spacer</option>
            <option value="rower">Rower</option>
            <option value="wyjazd">Wyjazd</option>
          </select>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Lokalizacja:
          </label>
          <input
            type="text"
            value={formData.lokalizacja}
            onChange={(e) => handleChange("lokalizacja", e.target.value)}
            required
            placeholder="np. Warszawa, Kraków..."
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Dystans (km): {formData.dystansKm}
          </label>
          <input
            type="range"
            value={formData.dystansKm}
            onChange={(e) =>
              handleChange("dystansKm", parseInt(e.target.value))
            }
            min="1"
            max="50"
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Intensywność:
          </label>
          <select
            value={formData.intensywnosc}
            onChange={(e) => handleChange("intensywnosc", e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <option value="niska">Niska</option>
            <option value="srednia">Średnia</option>
            <option value="wysoka">Wysoka</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: loading ? "#ccc" : "#646cff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Zapisywanie..." : "Zapisz preferencje"}
        </button>
      </form>
    </div>
  );
});

export default PreferencesPage;
