"use client";

import { useState } from "react";
import useStored from "../useStored";

export default function Depenses() {
  const [depenses, setDepenses] = useStored("pechtrack-depenses", []);
  const [libelle, setLibelle] = useState("");
  const [montant, setMontant] = useState("");

  function ajouter(e) {
    e.preventDefault();
    const m = Number(montant);
    if (!libelle.trim() || !m || m <= 0) return;
    setDepenses([{ libelle: libelle.trim(), montant: m }, ...depenses]);
    setLibelle("");
    setMontant("");
  }

  const total = depenses.reduce((somme, d) => somme + d.montant, 0);

  return (
    <>
      <h1>Dépenses</h1>
      <p className="subtitle">Carburant, glace, filets, réparations…</p>

      <form className="form" onSubmit={ajouter}>
        <input
          placeholder="Dépense (ex : Carburant)"
          value={libelle}
          onChange={(e) => setLibelle(e.target.value)}
        />
        <input
          placeholder="Montant (FCFA)"
          type="number"
          inputMode="numeric"
          value={montant}
          onChange={(e) => setMontant(e.target.value)}
        />
        <button className="primary" type="submit">
          Enregistrer la dépense
        </button>
      </form>

      <div className="total">Total : {total.toLocaleString("fr-FR")} FCFA</div>

      <div className="list">
        {depenses.map((d, i) => (
          <div className="card row" key={i}>
            <span className="name">{d.libelle}</span>
            <span>{d.montant.toLocaleString("fr-FR")} FCFA</span>
          </div>
        ))}
      </div>
    </>
  );
}
