const stats = [
  { label: "Sorties en mer", value: "48", trend: "+12%", up: true },
  { label: "Captures totales", value: "12,5 T", trend: "+8%", up: true },
  { label: "Ventes du mois", value: "8 750 000 FCFA", trend: "+15%", up: true },
  { label: "Dettes en cours", value: "3 200 000 FCFA", trend: "-5%", up: false },
];

export default function Accueil() {
  return (
    <>
      <h1>PêchTrack</h1>
      <p className="subtitle">Pêcher • Suivre • Prospérer — Saint-Louis, Sénégal</p>

      <div className="grid">
        {stats.map((s) => (
          <div className="card" key={s.label}>
            <div className="label">{s.label}</div>
            <div className="value">{s.value}</div>
            <div className={s.up ? "up" : "down"}>
              {s.up ? "↑" : "↓"} {s.trend}
            </div>
          </div>
        ))}
      </div>

      <p className="hint" style={{ marginTop: 16 }}>
        Chiffres d'exemple. Les écrans Prises, Ventes et Dépenses enregistrent
        vos saisies dans ce navigateur.
      </p>
    </>
  );
}
