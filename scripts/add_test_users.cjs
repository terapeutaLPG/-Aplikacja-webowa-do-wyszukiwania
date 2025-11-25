// const admin = require("firebase-admin");
// const { faker } = require("@faker-js/faker");
// const path = require("path");

// const serviceAccount = require(path.join(
//   __dirname,
//   "..",
//   "serviceAccountKey.json"
// ));

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const db = admin.firestore();

// const LOCATIONS = [
//   "Wroclaw",
//   "Legnica",
//   "Jelenia Gora",
//   "Lubin",
//   "Walbrzych",
//   "Zlotoryja",
//   "Trzebnica",
//   "Bielawa",
//   "Polkowice",
//   "Milicz",
//   "Olesnica",
//   "Strzelin",
//   "Sobotka",
//   "Jawor",
//   "Kowary",
//   "Swidnica",

//   "Warszawa",
//   "Radom",
//   "Płock",
//   "Siedlce",
//   "Ciechanow",
//   "Ostrołęka",
//   "Przasnysz",
//   "Zyrardow",
//   "Minsk Mazowiecki",
//   "Pionki",
//   "Warka",
//   "Grojec",
//   "Piaseczno",
//   "Konstancin",
//   "Zabki",
//   "Marki",

//   "Poznan",
//   "Leszno",
//   "Konin",
//   "Gniezno",
//   "Ostrów Wlkp",
//   "Wrzesnia",
//   "Pleszew",
//   "Jarocin",
//   "Srem",
//   "Gostyn",
//   "Rawicz",
//   "Nowy Tomysl",
//   "Swarzędz",
//   "Krotoszyn",
//   "Wolsztyn",

//   "Krakow",
//   "Tarnow",
//   "Nowy Sacz",
//   "Bochnia",
//   "Wieliczka",
//   "Myslenice",
//   "Zakopane",
//   "Andrychow",
//   "Oswiecim",
//   "Skawina",
//   "Limanowa",
//   "Miechow",
//   "Wadowice",
//   "Proszowice",
//   "Nowy Targ",

//   "Gdansk",
//   "Gdynia",
//   "Sopot",
//   "Tczew",
//   "Wejherowo",
//   "Lebork",
//   "Bytow",
//   "Kartuzy",
//   "Chojnice",
//   "Starogard Gdanski",
//   "Koscierzyna",
//   "Czluchow",
//   "Reda",
//   "Rumia",

//   "Bydgoszcz",
//   "Torun",
//   "Inowroclaw",
//   "Wloclawek",
//   "Grudziadz",
//   "Chelmza",
//   "Solec Kujawski",
//   "Naklo n. Notecia",
//   "Znin",
//   "Lipno",
//   "Golub Dobrzyn",
//   "Swiecie",

//   "Lodz",
//   "Piotrkow Trybunalski",
//   "Skierniewice",
//   "Kutno",
//   "Zgierz",
//   "Radomsko",
//   "Belchatow",
//   "Sieradz",
//   "Lask",
//   "Wielun",
//   "Pabianice",
//   "Tomaszow Mazowiecki",
//   "Zduńska Wola",

//   "Lublin",
//   "Chelm",
//   "Zamosc",
//   "Biala Podlaska",
//   "Pulawy",
//   "Krasnik",
//   "Swidnik",
//   "Bilgoraj",
//   "Lubartow",
//   "Hrubieszow",
//   "Parczew",
//   "Deblin",
//   "Opole Lubelskie",

//   "Katowice",
//   "Gliwice",
//   "Zabrze",
//   "Bytom",
//   "Chorzow",
//   "Ruda Slaska",
//   "Tychy",
//   "Czestochowa",
//   "Sosnowiec",
//   "Dabrowa Gornicza",
//   "Bielsko-Biala",
//   "Rybnik",
//   "Zory",
//   "Pszczyna",
//   "Mikolow",

//   "Rzeszow",
//   "Przemysl",
//   "Mielec",
//   "Tarnobrzeg",
//   "Sanok",
//   "Jaroslaw",
//   "Lezajsk",
//   "Lancut",
//   "Debica",
//   "Kolbuszowa",
//   "Jaslo",
//   "Krosno",
//   "Nisko",
//   "Ustrzyki Dolne",

//   "Szczecin",
//   "Koszalin",
//   "Stargard",
//   "Swidwin",
//   "Kolobrzeg",
//   "Police",
//   "Szczecinek",
//   "Slawno",
//   "Gryfino",
//   "Gryfice",
//   "Bialogard",
//   "Nowogard",
//   "Kamien Pomorski",

//   "Opole",
//   "Nysa",
//   "Kedzierzyn Kozle",
//   "Kluczbork",
//   "Brzeg",
//   "Namyslow",
//   "Strzelce Opolskie",
//   "Prudnik",
//   "Glogowek",
//   "Olesno",

//   "Kielce",
//   "Skarzysko Kamienna",
//   "Starachowice",
//   "Ostrowiec Swietokrzyski",
//   "Busko Zdrój",
//   "Sandomierz",
//   "Staszow",
//   "Konskie",

//   "Bialystok",
//   "Suwalki",
//   "Lomza",
//   "Augustow",
//   "Siemiatycze",
//   "Zambrow",
//   "Monki",
//   "Hajnowka",
//   "Bielsk Podlaski",

//   "Zielona Gora",
//   "Gorzow Wlkp",
//   "Nowa Sol",
//   "Sulechow",
//   "Swiebodzin",
//   "Slubice",
//   "Miedzyrzecz",
//   "Kostrzyn",
//   "Zary",
//   "Zagan",

//   "Olsztyn",
//   "Elblag",
//   "Ełk",
//   "Mrągowo",
//   "Giżycko",
//   "Iława",
//   "Ostróda",
//   "Ketrzyn",
//   "Lidzbark Warminski",
//   "Pisz",

//   "Dobrzykowice",
//   "Brzezia Laka",
//   "Lyski",
//   "Krosno Odrzanskie",
//   "Twardogora",
//   "Zebrzydowice",
//   "Biskupice",
//   "Baranowo",
//   "Jankowice",
//   "Nowe Miasto",
//   "Suliszew",
//   "Zlotniki",
//   "Ustron",
//   "Pogorzela",
//   "Ostrzyca",
// ];

// const ACTIVITIES = ["spacer", "rower", "wyjazd"];
// const INTENSITIES = ["niska", "srednia", "wysoka"];
// const SEXES = ["M", "K"];

// function rand(arr) {
//   return arr[Math.floor(Math.random() * arr.length)];
// }

// async function addTestUsers(count = 40) {
//   const col = db.collection("preferences");
//   for (let i = 1; i <= count; i++) {
//     const userId = `test_user_${i}`;
//     const typAktywnosci = rand(ACTIVITIES);
//     const lokalizacja = rand(LOCATIONS);
//     const dystansKm =
//       typAktywnosci === "spacer"
//         ? faker.number.int({ min: 1, max: 10 })
//         : typAktywnosci === "rower"
//         ? faker.number.int({ min: 5, max: 50 })
//         : faker.number.int({ min: 50, max: 300 });
//     const intensywnosc = rand(INTENSITIES);
//     const plec = rand(SEXES);
//     const wiek = faker.number.int({ min: 18, max: 55 });
//     const imie =
//       plec === "K"
//         ? faker.person.firstName("female")
//         : faker.person.firstName("male");
//     const opisAktywnosci = faker.lorem.sentence(12);

//     const doc = {
//       userId,
//       imie,
//       plec,
//       wiek,
//       opisAktywnosci,
//       typAktywnosci,
//       lokalizacja,
//       dystansKm,
//       intensywnosc,
//     };

//     await col.doc(userId).set(doc);
//     console.log(
//       `✅ Dodano: ${userId} (${imie}, ${plec}, ${wiek}l.) - ${typAktywnosci}, ${lokalizacja}, ${intensywnosc}`
//     );
//   }
//   console.log("\n dodano wszystkich użytkowników");
// }

// addTestUsers(40)
//   .then(() => process.exit(0))
//   .catch((err) => {
//     console.error("❌ Błąd:", err);
//     process.exit(1);
//   });
// scripts/add_test_users.cjs
const admin = require("firebase-admin");
const { faker } = require("@faker-js/faker");
const path = require("path");

const serviceAccount = require(path.join(
  __dirname,
  "..",
  "serviceAccountKey.json"
));
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

const AVATARS = [
  "https://randomuser.me/api/portraits/men/10.jpg",
  "https://randomuser.me/api/portraits/women/20.jpg",
  "https://randomuser.me/api/portraits/men/25.jpg",
  "https://randomuser.me/api/portraits/women/45.jpg",
  "https://randomuser.me/api/portraits/men/55.jpg",
];

const LOCATIONS = [
  "Wroclaw",
  "Poznan",
  "Warszawa",
  "Gdansk",
  "Krakow",
  "Lodz",
  "Sopot",
  "Bydgoszcz",
  "Rzeszow",
  "Lublin",
];
const ACTIVITIES = ["spacer", "rower", "wyjazd"];
const INTENSITIES = ["niska", "srednia", "wysoka"];
const SEXES = ["M", "K"];

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function addTestUsers(count = 40) {
  const col = db.collection("preferences");
  for (let i = 1; i <= count; i++) {
    const userId = `test_user_${i}`;
    const typAktywnosci = rand(ACTIVITIES);
    const lokalizacja = rand(LOCATIONS);
    const dystansKm =
      typAktywnosci === "spacer"
        ? faker.number.int({ min: 1, max: 10 })
        : typAktywnosci === "rower"
        ? faker.number.int({ min: 5, max: 50 })
        : faker.number.int({ min: 50, max: 300 });
    const intensywnosc = rand(INTENSITIES);
    const plec = rand(SEXES);
    const wiek = faker.number.int({ min: 18, max: 55 });
    const imie =
      plec === "K"
        ? faker.person.firstName("female")
        : faker.person.firstName("male");
    const opisAktywnosci = faker.lorem.sentence(10);
    const avatarUrl = rand(AVATARS);

    const doc = {
      userId,
      imie,
      plec,
      wiek,
      opisAktywnosci,
      typAktywnosci,
      lokalizacja,
      dystansKm,
      intensywnosc,
      avatarUrl,
    };

    await col.doc(userId).set(doc);
    console.log(
      `✅ ${userId} (${imie}, ${plec}, ${wiek}l.) - ${lokalizacja}, ${typAktywnosci}`
    );
  }
  console.log("\n🎉 Wszystkich użytkowników dodano z avatarami!");
}

addTestUsers(40)
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
