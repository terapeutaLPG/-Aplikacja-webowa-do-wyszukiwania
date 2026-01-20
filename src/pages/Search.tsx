import { useState, useCallback, memo, useEffect } from "react";
import { useStore } from "../store";
import { db, auth } from "../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

type UserPreferences = {
  userId: string;
  imie?: string;
  plec?: string;
  wiek?: number;
  opisAktywnosci?: string;
  avatarUrl?: string;
  typAktywnosci: string;
  lokalizacja: string;
  dystansKm: number;
  intensywnosc: string;
  updatedAt?: any;
};

const Search = memo(() => {
  const { preferences } = useStore();
  const [myPreferences, setMyPreferences] = useState<UserPreferences | null>(null);
  const [matchedUsers, setMatchedUsers] = useState<UserPreferences[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [initialLoading, setInitialLoading] = useState(true);

  // Funkcja do obliczania dopasowania
  const calculateMatch = (userPrefs: UserPreferences, myPrefs: UserPreferences): number => {
    let score = 0;
    
    if (userPrefs.typAktywnosci === myPrefs.typAktywnosci) {
      score += 40;
    }
    
    if (userPrefs.intensywnosc === myPrefs.intensywnosc) {
      score += 30;
    }
    
    if (userPrefs.lokalizacja.toLowerCase().trim() === myPrefs.lokalizacja.toLowerCase().trim()) {
      score += 30;
    }
    
    return score;
  };

  useEffect(() => {
    const loadMatches = async () => {
      const user = auth.currentUser;
      if (!user) {
        setError("Musisz być zalogowany");
        setInitialLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        // Sprawdź czy użytkownik ma preferencje
        const myDocRef = doc(db, "preferences", user.uid);
        const myDocSnap = await getDoc(myDocRef);

        if (!myDocSnap.exists()) {
          setError("Najpierw ustaw swoje preferencje w zakładce Preferencje");
          setLoading(false);
          setInitialLoading(false);
          return;
        }

        const myPrefs = myDocSnap.data() as UserPreferences;
        setMyPreferences(myPrefs);

        // Pobierz wszystkie preferencje użytkowników
        const preferencesRef = collection(db, "preferences");
        const querySnapshot = await getDocs(preferencesRef);
        
        const allUsers: UserPreferences[] = [];
        querySnapshot.forEach((doc) => {
          const userData = doc.data() as UserPreferences;
          if (userData.userId !== user.uid) {
            allUsers.push(userData);
          }
        });

        console.log("Znaleziono użytkowników:", allUsers.length);

        if (allUsers.length === 0) {
          setMatchedUsers([]);
          setError("Brak innych użytkowników w bazie danych. Poproś znajomych o rejestrację!");
        } else {
          const matches = allUsers.filter(userPrefs => {
            const score = calculateMatch(userPrefs, myPrefs);
            return score >= 60;
          });

          setMatchedUsers(matches);
          if (matches.length === 0) {
            setError("Nie znaleziono dopasowań. Spróbuj zmienić swoje preferencje.");
          }
        }

      } catch (error: any) {
        console.error("Błąd podczas ładowania dopasowań:", error);
        if (error.code === 'permission-denied') {
          setError("Brak uprawnień do odczytu danych. Sprawdź reguły Firestore.");
        } else if (error.code === 'unavailable') {
          setError("Baza danych jest niedostępna. Spróbuj później.");
        } else {
          setError("Błąd podczas ładowania danych: " + error.message);
        }
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    };

    const timer = setTimeout(loadMatches, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (initialLoading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h2>🔍 Wyszukiwanie dopasowań</h2>
        <p>Ładowanie...</p>
      </div>
    );
  }

  if (!auth.currentUser) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h2>Wyszukiwanie</h2>
        <p>Musisz być zalogowany, aby wyszukiwać osoby.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>🔍 Wyszukiwanie dopasowań</h2>
      
      {error && (
        <div style={{ 
          color: "#721c24", 
          backgroundColor: "#f8d7da", 
          padding: "15px", 
          borderRadius: "5px",
          marginBottom: "1rem",
          border: "1px solid #f5c6cb"
        }}>
          <strong>Uwaga:</strong> {error}
        </div>
      )}

      {myPreferences && (
        <div style={{ 
          marginBottom: "2rem", 
          padding: "1rem", 
          backgroundColor: "#f5f5f5", 
          borderRadius: "8px" 
        }}>
          <h3>Twoje preferencje:</h3>
          <p><strong>Typ aktywności:</strong> {myPreferences.typAktywnosci}</p>
          <p><strong>Lokalizacja:</strong> {myPreferences.lokalizacja}</p>
          <p><strong>Dystans:</strong> {myPreferences.dystansKm} km</p>
          <p><strong>Intensywność:</strong> {myPreferences.intensywnosc}</p>
        </div>
      )}

      {!myPreferences && !loading && (
        <div style={{
          textAlign: "center",
          padding: "2rem",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px"
        }}>
          <h3>Brak preferencji</h3>
          <p>Najpierw ustaw swoje preferencje, aby móc wyszukiwać dopasowania.</p>
          <a 
            href="/preferences" 
            style={{ 
              color: "#646cff", 
              textDecoration: "underline" 
            }}
          >
            Przejdź do ustawień preferencji
          </a>
        </div>
      )}

      {myPreferences && matchedUsers.length > 0 && (
        <div>
          <h3>Znalezione dopasowania ({matchedUsers.length}):</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {matchedUsers.map((user, index) => (
              <div
                key={user.userId || index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "15px",
                  backgroundColor: "white",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                <div
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                    backgroundColor: "#e0e0e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    color: "#999",
                  }}
                >
                  👤
                </div>
                
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: "0 0 10px 0" }}>
                    {user.imie || "Użytkownik"}
                    {user.wiek && ` (${user.wiek} lat)`}
                  </h4>
                  
                  <div style={{ display: "flex", gap: "20px", fontSize: "14px" }}>
                    <span><strong>Aktywność:</strong> {user.typAktywnosci}</span>
                    <span><strong>Lokalizacja:</strong> {user.lokalizacja}</span>
                    <span><strong>Intensywność:</strong> {user.intensywnosc}</span>
                  </div>
                  
                  <div style={{ marginTop: "10px" }}>
                    <span style={{ 
                      backgroundColor: "#e8f5e8", 
                      color: "#2d5a2d", 
                      padding: "3px 8px", 
                      borderRadius: "3px",
                      fontSize: "12px"
                    }}>
                      Dopasowanie: {calculateMatch(user, myPreferences)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {myPreferences && matchedUsers.length === 0 && !error && !loading && (
        <div style={{ 
          textAlign: "center", 
          padding: "2rem",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px"
        }}>
          <h3>Brak dopasowań</h3>
          <p>Aktualnie nie ma użytkowników pasujących do Twoich preferencji.</p>
          <p style={{ fontSize: "14px", color: "#666" }}>
            Spróbuj zmienić swoje preferencje lub sprawdź później.
          </p>
        </div>
      )}
    </div>
  );
});

export default Search;
