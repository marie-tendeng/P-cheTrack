import Link from "next/link";

const stats = [
  { icone: "🚣", label: "Sorties en mer", value: "48", trend: "+12%", up: true },
  { icone: "🐟", label: "Captures totales", value: "12,5 T", trend: "+8%", up: true },
  { icone: "🛒", label: "Ventes du mois", value: "8 750 000 FCFA", trend: "+15%", up: true },
  { icone: "🤝", label: "Dettes en cours", value: "3 200 000 FCFA", trend: "-5%", up: false },
];

const captures = [
  { jour: "Lun", t: 2.6 },
  { jour: "Mar", t: 3.4 },
  { jour: "Mer", t: 3.0 },
  { jour: "Jeu", t: 4.3 },
  { jour: "Ven", t: 5.2 },
  { jour: "Sam", t: 3.9 },
  { jour: "Dim", t: 3.7 },
];

const ventes = [
  { nom: "Poissons locaux", pct: 45, couleur: "#4f8cff" },
  { nom: "Thon", pct: 35, couleur: "#ffb020" },
  { nom: "Autres espèces", pct: 20, couleur: "#3ecf8e" },
];

const actions = [
  { href: "/ventes", label: "Enregistrer une vente", icone: "💰" },
  { href: "/prises", label: "Saisir les prises", icone: "🐟" },
  { href: "/depenses", label: "Ajouter une dépense", icone: "⛽" },
];

const activites = [
  { texte: "Vente enregistrée – Thon (350 kg)", quand: "Il y a 1 h" },
  { texte: "Nouvelle sortie – Pirogue N°07", quand: "Il y a 2 h" },
  { texte: "Paiement reçu – 250 000 FCFA (Wave)", quand: "Il y a 3 h" },
  { texte: "Dette mise à jour – Mareyeur Diallo", quand: "Il y a 4 h" },
];

function CourbeCaptures() {
  const W = 320;
  const H = 150;
  const padX = 28;
  const padTop = 14;
  const padBottom = 28;
  const max = 6;
  const hauteur = H - padTop - padBottom;
  const stepX = (W - padX * 2) / (captures.length - 1);

  const points = captures.map((c, i) => ({
    jour: c.jour,
    x: padX + i * stepX,
    y: padTop + (1 - c.t / max) * hauteur,
  }));

  const ligne = points.map((p) => p.x + "," + p.y).join(" ");
  const base = padTop + hauteur;
  const aire =
    padX + "," + base + " " + ligne + " " + points[points.length - 1].x + "," + base;

  return (
    <svg
      viewBox={"0 0 " + W + " " + H}
      className="chart"
      role="img"
      aria-label="Courbe des captures de la semaine"
    >
      {[0, 2, 4, 6].map((v) => {
        const y = padTop + (1 - v / max) * hauteur;
        return (
          <g key={v}>
            <line x1={padX} x2={W - padX} y1={y} y2={y} className="grid-line" />
            <text x={2} y={y + 3} className="axis">
              {v} T
            </text>
          </g>
        );
      })}
      <polygon points={aire} className="area" />
      <polyline points={ligne} className="line" fill="none" />
      {points.map((p) => (
        <circle key={p.jour} cx={p.x} cy={p.y} r="3.5" className="dot" />
      ))}
      {points.map((p) => (
        <text key={"l-" + p.jour} x={p.x} y={H - 8} textAnchor="middle" className="axis">
          {p.jour}
        </text>
      ))}
    </svg>
  );
}

function Donut() {
  const r = 40;
  const C = 2 * Math.PI * r;
  let cumul = 0;

  return (
    <svg viewBox="0 0 120 120" className="donut" role="img" aria-label="Répartition des ventes">
      <g transform="rotate(-90 60 60)">
        {ventes.map((v) => {
          const longueur = (v.pct / 100) * C;
          const cercle = (
            <circle
              key={v.nom}
              cx="60"
              cy="60"
              r={r}
              fill="none"
              stroke={v.couleur}
              strokeWidth="16"
              strokeDasharray={longueur + " " + (C - longueur)}
              strokeDashoffset={-cumul}
            />
          );
          cumul += longueur;
          return cercle;
        })}
      </g>
      <text x="60" y="58" textAnchor="middle" className="donut-value">
        8,75 M
      </text>
      <text x="60" y="74" textAnchor="middle" className="donut-label">
        FCFA
      </text>
    </svg>
  );
}

export default function Accueil() {
  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <h1>
            Pêch<span className="hero-accent">Track</span>
          </h1>
          <p className="hero-tag">Pêcher • Suivre • Prospérer</p>
          <p className="hero-sub">Une gestion intelligente pour une pêche durable</p>
        </div>
        <div className="hero-place">📍 Saint-Louis, Sénégal</div>
      </section>

      <section className="stats">
        {stats.map((s) => (
          <div className="card stat" key={s.label}>
            <div className="stat-icon">{s.icone}</div>
            <div>
              <div className="label">{s.label}</div>
              <div className="value">{s.value}</div>
              <div className={s.up ? "up" : "down"}>
                {s.up ? "↑" : "↓"} {s.trend}
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="row-a">
        <div className="card">
          <h2>Activité des captures</h2>
          <p className="hint">7 derniers jours (tonnes)</p>
          <CourbeCaptures />
        </div>

        <div className="card">
          <h2>Répartition des ventes</h2>
          <div className="donut-wrap">
            <Donut />
            <ul className="legend">
              {ventes.map((v) => (
                <li key={v.nom}>
                  <span className="swatch" style={{ background: v.couleur }} />
                  {v.nom} <strong>{v.pct}%</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="row-b">
        <div className="card weather">
          <div className="weather-temp">☀️ 32°C</div>
          <div className="hint">Ciel dégagé</div>
          <div className="weather-place">📍 Saint-Louis, Sénégal</div>
          <div className="hint">Mer calme 🌊</div>
        </div>

        <div className="card">
          <h2>Actions rapides</h2>
          <div className="actions">
            {actions.map((a) => (
              <Link key={a.href} href={a.href} className="action">
                <span>{a.icone}</span> {a.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="card">
          <h2>Stock en frigo</h2>
          <p className="hint">Capacité : 10 T</p>
          <div className="bar">
            <div className="bar-fill" style={{ width: "72%" }} />
          </div>
          <div className="stock-value">
            7,2 T <span className="up">(72%)</span>
          </div>
        </div>
      </section>

      <section className="card">
        <h2>Dernières activités</h2>
        <ul className="activities">
          {activites.map((a) => (
            <li key={a.texte}>
              <span>{a.texte}</span>
              <span className="hint">{a.quand}</span>
            </li>
          ))}
        </ul>
      </section>

      <p className="hint" style={{ marginTop: 16 }}>
        Chiffres d'exemple. Les écrans Prises, Ventes et Dépenses gardent vos saisies dans ce
        navigateur.
      </p>
    </>
  );
}
