"use client";

import useStored from "../useStored";

const especes = [
  { id: "sardinelle", nom: "Sardinelle", unite: "en caisses", emoji: "🐟" },
  { id: "thiof", nom: "Thiof", unite: "en pièces", emoji: "🐠" },
  { id: "crevettes", nom: "Crevettes", unite: "en kgs", emoji: "🦐" },
  { id: "poulpe", nom: "Poulpe", unite: "en kgs", emoji: "🐙" },
];

export default function Prises() {
  const [prises, setPrises] = useStored("pechtrack-prises", {});

  function changer(id, delta) {
    const actuel = prises[id] || 0;
    const suivant = Math.max(0, actuel + delta);
    setPrises({ ...prises, [id]: suivant });
  }

  return (
    <>
      <h1>Prises du jour</h1>
      <p className="subtitle">Ajoutez ce que la pirogue a ramené.</p>

      <div className="list">
        {especes.map((e) => {
          const qte = prises[e.id] || 0;
          return (
            <div className="card row" key={e.id}>
              <div className="row">
                <span className="emoji">{e.emoji}</span>
                <div>
                  <div className="name">{e.nom}</div>
                  <div className="hint">
                    {e.unite}, reste {qte} à vendre
                  </div>
                </div>
              </div>
              <div className="counter">
                <button
                  className="round"
                  onClick={() => changer(e.id, -1)}
                  aria-label={"Retirer " + e.nom}
                >
                  −
                </button>
                <span className="qty">{qte}</span>
                <button
                  className="round plus"
                  onClick={() => changer(e.id, 1)}
                  aria-label={"Ajouter " + e.nom}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
