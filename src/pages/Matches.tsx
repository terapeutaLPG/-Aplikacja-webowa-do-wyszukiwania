import { memo } from "react";

const Matches = memo(() => {
  return (
    <div>
      <h2>Twoje dopasowania</h2>
      <p>Tutaj będą wyświetlane Twoje dopasowania.</p>
      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
        }}
      >
        <p>
          Ta funkcja będzie dostępna wkrótce. Aby znaleźć osoby, użyj zakładki
          "Szukaj".
        </p>
      </div>
    </div>
  );
});

export default Matches;
