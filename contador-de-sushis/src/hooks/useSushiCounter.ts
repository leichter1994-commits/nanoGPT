"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CLAVES_STORAGE,
  parsearHistorialSeguro,
  parsearNumeroSeguro,
  tieneStorageDisponible
} from "@/lib/storage";

const MAX_HISTORIAL = 5;

export type TipoEventoSushi = {
  id: number;
  emoji: "🍣";
};

const mensajePorCantidad = (contadorSushis: number): string => {
  if (contadorSushis === 0) return "Todavía no arrancaste. El sushi te está esperando.";
  if (contadorSushis <= 5) return "Entrada tranquila, todavía estás calentando.";
  if (contadorSushis <= 12) return "Buen ritmo, ya estás en modo sushi.";
  if (contadorSushis <= 24) return "Cuidado, estás entrando en territorio profesional.";
  return "Leyenda del sushi desbloqueada.";
};

const horaBonita = (fechaISO: string) =>
  new Date(fechaISO).toLocaleString("es-AR", {
    dateStyle: "short",
    timeStyle: "short"
  });

export const useSushiCounter = () => {
  const [contadorSushis, setContadorSushis] = useState(0);
  const [mejorRecord, setMejorRecord] = useState(0);
  const [ultimoSushiISO, setUltimoSushiISO] = useState<string | null>(null);
  const [historialSushis, setHistorialSushis] = useState<string[]>([]);

  const [hidratoOk, setHidratoOk] = useState(false);
  const [animarNumero, setAnimarNumero] = useState(false);
  const [eventoFlotante, setEventoFlotante] = useState<TipoEventoSushi | null>(null);

  useEffect(() => {
    if (!tieneStorageDisponible()) {
      setHidratoOk(true);
      return;
    }

    const contadorGuardado = parsearNumeroSeguro(localStorage.getItem(CLAVES_STORAGE.contadorSushis));
    const recordGuardado = parsearNumeroSeguro(localStorage.getItem(CLAVES_STORAGE.mejorRecord));
    const ultimoSushiGuardado = localStorage.getItem(CLAVES_STORAGE.ultimoSushiISO);
    const historialGuardado = parsearHistorialSeguro(localStorage.getItem(CLAVES_STORAGE.historialSushis));

    setContadorSushis(contadorGuardado);
    setMejorRecord(Math.max(recordGuardado, contadorGuardado));
    setUltimoSushiISO(ultimoSushiGuardado || null);
    setHistorialSushis(historialGuardado);
    setHidratoOk(true);
  }, []);

  useEffect(() => {
    if (!hidratoOk || !tieneStorageDisponible()) return;

    localStorage.setItem(CLAVES_STORAGE.contadorSushis, String(contadorSushis));
    localStorage.setItem(CLAVES_STORAGE.mejorRecord, String(mejorRecord));
    localStorage.setItem(CLAVES_STORAGE.ultimoSushiISO, ultimoSushiISO ?? "");
    localStorage.setItem(CLAVES_STORAGE.historialSushis, JSON.stringify(historialSushis));
  }, [contadorSushis, mejorRecord, ultimoSushiISO, historialSushis, hidratoOk]);

  const sumarSushis = (cantidad = 1) => {
    if (cantidad <= 0) return;

    const nuevoTotal = contadorSushis + cantidad;
    const ahoraISO = new Date().toISOString();

    const nuevoHistorial = [`${horaBonita(ahoraISO)} (+${cantidad})`, ...historialSushis].slice(0, MAX_HISTORIAL);

    setContadorSushis(nuevoTotal);
    setUltimoSushiISO(ahoraISO);
    setHistorialSushis(nuevoHistorial);

    if (nuevoTotal > mejorRecord) {
      setMejorRecord(nuevoTotal);
    }

    setAnimarNumero(true);
    setEventoFlotante({ id: Date.now(), emoji: "🍣" });
    window.setTimeout(() => setAnimarNumero(false), 280);
    window.setTimeout(() => setEventoFlotante(null), 950);
  };

  const restarSushi = () => setContadorSushis((actual) => Math.max(0, actual - 1));

  const reiniciarContador = () => {
    setContadorSushis(0);
    setUltimoSushiISO(null);
    setHistorialSushis([]);
  };

  const borrarHistorial = () => setHistorialSushis([]);

  const frase = useMemo(() => mensajePorCantidad(contadorSushis), [contadorSushis]);
  const rompisteRecord = contadorSushis > 0 && contadorSushis === mejorRecord;

  return {
    contadorSushis,
    mejorRecord,
    ultimoSushiISO,
    historialSushis,
    frase,
    rompisteRecord,
    hidratoOk,
    animarNumero,
    eventoFlotante,
    sumarSushis,
    restarSushi,
    reiniciarContador,
    borrarHistorial
  };
};
