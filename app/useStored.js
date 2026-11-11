"use client";

import { useEffect, useState } from "react";

// Comme useState, mais la valeur est gardée dans le navigateur (localStorage).
export default function useStored(key, initial) {
  const [value, setValue] = useState(initial);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setValue(JSON.parse(raw));
    } catch (e) {
      // on ignore : le stockage peut être indisponible
    }
    setReady(true);
  }, [key]);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // on ignore
    }
  }, [key, value, ready]);

  return [value, setValue];
}
