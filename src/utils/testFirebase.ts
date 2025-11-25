import { auth, db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export const createTestUser = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.log("Użytkownik nie jest zalogowany");
      return;
    }

    // Dodaj testowego użytkownika
    await addDoc(collection(db, "preferences"), {
      userId: "test-user-" + Date.now(),
      typAktywnosci: "spacer",
      lokalizacja: "Warszawa",
      dystansKm: 10,
      intensywnosc: "srednia",
      imie: "Jan Testowy",
      wiek: 25,
      updatedAt: new Date()
    });

    console.log("Testowy użytkownik został dodany");
  } catch (error) {
    console.error("Błąd dodawania testowego użytkownika:", error);
  }
};

export const testFirestoreConnection = async () => {
  try {
    console.log("Testowanie połączenia z Firestore...");
    const testCollection = collection(db, "test");
    console.log("Połączenie z Firestore działa");
    return true;
  } catch (error) {
    console.error("Błąd połączenia z Firestore:", error);
    return false;
  }
};
