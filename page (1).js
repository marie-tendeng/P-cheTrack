"use client";

import { useState } from "react";
import useStored from "../useStored";

export default function Ventes() {
  const [ventes, setVentes] = useStored("pechtrack-ventes", []);
  const [espece, setEspece] = useState("");
  const [montant, setMontant] = useState("");

  function ajouter(e) {
    e.preventDefault();
    const m = Number(montant);
    if (!espece.trim() || !m || m <= 0) return;
    setVentes([{ espece: espece.trim(), montant: m }, ...ventes]);
    setEspece("");
    setMontant("");
  }

  const total = ventes.reduce((somme, v) => somme + v.montant, 0);

  return (
    <>
      <h1>Ventes</h1>
      <p className="subtitle">Enregistrez chaque vente.</p>

      <form className="form" onSubmit={ajouter}>
        <input
          placeholder="Espèce (ex : Thiof)"
          value={espece}
          onChange={(e) => setEspece(e.target.value)}
        />
        <input
          placeholder="Montant (FCFA)"
          type="number"
          inputMode="numeric"
          value={montant}
          onChange={(e) => setMontant(e.target.value)}
        />
        <button className="primary" type="submit">
          Enregistrer la vente
        </button>
      </form>

      <div className="total">Total : {total.toLocaleString("fr-FR")} FCFA</div>

      <div className="list">
        {ventes.map((v, i) => (
          <div className="card row" key={i}>
            <span className="name">{v.espece}</span>
            <span>{v.montant.toLocaleString("fr-FR")} FCFA</span>
          </div>
        ))}
      </div>
    </>
  );
}
