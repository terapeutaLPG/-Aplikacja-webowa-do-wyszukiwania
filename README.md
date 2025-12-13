# Aplikacja do wyszukiwania osób

Repozytorium projektu: [Aplikacja-webowa-do-wyszukiwania](https://github.com/terapeutaLPG/-Aplikacja-webowa-do-wyszukiwania.git)

2.  Temat realizowanego projektu: Aplikacja webowa do wyszukiwania osób do wspólnych
    wyjazdów, wycieczek na podstawie własnych preferencji
3.  Cel projektu:
    Celem projektu jest stworzenie aplikacji PWA (webowej), która ułatwi użytkownikom
    znalezienie osób o takich samych lub podobnych preferencjach wyjścia na spacer, rower
    czy dłuższe wyjazdy. Aplikacja będzie służyć jako platforma łącząca ludzi chcących
    wspólnie wyjść na spacer, przejażdżkę rowerową, a także zorganizować dłuższy wyjazd.
    System ma wspierać użytkowników w nawiązywaniu znajomości i budowaniu
    społeczności wokół wspólnych pasji.
4.  Założenia projektu:
    • Aplikacja będzie miała formę responsywnej aplikacji PWA dostępnej z poziomu przeglądarki
    internetowej
    • Użytkownik będzie mógł utworzyć profil, w którym określi swoje preferencje dotyczące
    aktywności (np. rodzaj, lokalizacja, dostępność, intensywność)
    • System będzie umożliwiać wyszukiwanie osób o podobnych zainteresowaniach i planowanie
    wspólnych aktywności
    • W aplikacji zostanie zaimplementowany system filtrowania i dopasowywania użytkowników na
    podstawie podanych kryteriów
    • Aplikacja umożliwi dodawanie do znajomych i możliwość wymieniania z nimi korespondencji
    • Projekt zostanie wykonany z wykorzystaniem środowiska do programowania hybrydowego
    Flutter
    • Interfejs użytkownika będzie intuicyjny i dostosowany do urządzeń
5.  Implementacja logiki aplikacji
6.  Stworzenie pola do dodawania i wyszukiwania wyjazdów
7.  Testowanie działania aplikacj




---------------------



Na podstawie kodu aplikacji:

4.1 Wybór systemu operacyjnego
Aplikacja została zaprojektowana jako aplikacja webowa (Progressive Web App) dostępna przez przeglądarkę internetową, co oznacza, że działa na dowolnym systemie operacyjnym wyposażonym w nowoczesną przeglądarkę. Nie jest to natywna aplikacja mobilna dla konkretnego systemu (Android/iOS), lecz responsywna aplikacja internetowa.

Technologie i platforma:

Platforma docelowa: Przeglądarka internetowa (Chrome, Firefox, Safari, Edge)
Framework frontend: React 19.1.1 (biblioteka JavaScript do budowy interfejsu użytkownika)
Narzędzie budowania: Vite 7.1.7 (nowoczesny build tool)
Język programowania: TypeScript 5.9.3 (typowany nadzbiór JavaScript)
Backend/baza danych: Firebase (Google Cloud Platform)
Firebase Authentication (uwierzytelnianie użytkowników)
Cloud Firestore (NoSQL baza danych w czasie rzeczywistym)
Firebase Analytics (analityka użytkowników)
Kompatybilność z systemami operacyjnymi:

Aplikacja działa na wszystkich popularnych systemach operacyjnych:

Desktop: Windows 10/11, macOS, Linux (Ubuntu, Fedora, Debian)
Mobile: Android 8.0+, iOS 12+
Tablet: iPadOS, Android dla tabletów
Wymagania techniczne:

Nowoczesna przeglądarka z obsługą ES6+ i Web APIs
Połączenie internetowe (aplikacja wymaga komunikacji z Firebase)
JavaScript włączony w przeglądarce
Obsługa localStorage (do cache'owania preferencji lokalnie)
Architektura aplikacji:

Single Page Application (SPA) — cała aplikacja ładuje się raz, a nawigacja odbywa się bez przeładowania strony (React Router DOM 7.9.4)
Client-side rendering — renderowanie interfejsu po stronie klienta
Real-time database — synchronizacja danych w czasie rzeczywistym z Firestore
Zalety podejścia webowego:

Jeden kod źródłowy dla wszystkich platform (cross-platform)
Brak konieczności instalacji aplikacji przez użytkownika
Łatwe aktualizacje (użytkownik zawsze ma najnowszą wersję)
Niższe koszty rozwoju (jedna aplikacja zamiast osobnych dla iOS/Android)
Dostępność z dowolnego urządzenia z przeglądarką
Ograniczenia:

Wymaga połączenia internetowego do działania
Brak dostępu do niektórych natywnych funkcji urządzeń (GPS, powiadomienia push wymagają dodatkowej konfiguracji PWA)
Wydajność może być niższa niż w aplikacjach natywnych
Możliwość konwersji na aplikację mobilną:
Aplikacja może zostać łatwo przekonwertowana na Progressive Web App (PWA) poprzez dodanie:

Service Worker (obsługa offline)
Web App Manifest (instalacja na ekranie głównym)
Push notifications (powiadomienia)
Dzięki temu użytkownicy mobilni mogliby "zainstalować" aplikację na swoim telefonie bez potrzeby korzystania z Google Play/App Store.

Podsumowanie: Wybór architektury webowej pozwala na maksymalną dostępność aplikacji na wszystkich systemach operacyjnych bez konieczności tworzenia osobnych wersji natywnych.
