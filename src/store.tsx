import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

export type Preferences = {
  typAktywnosci: "spacer" | "rower" | "wyjazd";
  lokalizacja: string;
  dystansKm: number;
  intensywnosc: "niska" | "srednia" | "wysoka";
};

type UserState = {
  isAuth: boolean;
  preferences: Preferences | null;
  setAuth: (v: boolean) => void;
  setPreferences: (p: Preferences) => void;
  logout: () => void;
};

const Ctx = createContext<UserState | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [isAuth, setAuthState] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const [preferences, setPreferencesState] = useState<Preferences | null>(
    () => {
      try {
        const storedPreferences = localStorage.getItem("preferences");
        return storedPreferences ? JSON.parse(storedPreferences) : null;
      } catch (error) {
        console.error("Błąd ładowania preferencji z localStorage:", error);
        return null;
      }
    }
  );

  // Obserwuj stan uwierzytelnienia Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthState(!!user);
      setAuthLoading(false);
    }, (error) => {
      console.error("Błąd uwierzytelnienia Firebase:", error);
      setAuthState(false);
      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (preferences) {
      localStorage.setItem("preferences", JSON.stringify(preferences));
    } else {
      localStorage.removeItem("preferences");
    }
  }, [preferences]);

  const setAuth = useCallback((v: boolean) => setAuthState(v), []);

  const setPreferences = useCallback(
    (p: Preferences) => setPreferencesState(p),
    []
  );

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      setAuthState(false);
      setPreferencesState(null);
      localStorage.removeItem("preferences");
    } catch (error) {
      console.error("Błąd wylogowania:", error);
    }
  }, []);

  const value = useMemo(
    () => ({ isAuth, preferences, setAuth, setPreferences, logout }),
    [isAuth, preferences, setAuth, setPreferences, logout]
  );

  // Pokaż loading podczas sprawdzania stanu uwierzytelnienia
  if (authLoading) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "100vh" 
      }}>
        Ładowanie aplikacji...
      </div>
    );
  }

  return (
    <Ctx.Provider value={value}>
      {children}
    </Ctx.Provider>
  );
}

export const useStore = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
};
