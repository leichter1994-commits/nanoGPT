"use client";

import { useEffect, useMemo, useState } from "react";
import { parseSafeHistory, parseSafeNumber, STORAGE_KEYS } from "@/lib/storage";

const MAX_HISTORY = 5;

const getNow = () => new Date().toISOString();

const getMessageByCount = (sushiCount: number): string => {
  if (sushiCount === 0) {
    return "Todavía no arrancaste. El sushi te está esperando.";
  }
  if (sushiCount <= 5) {
    return "Entrada tranquila, todavía estás calentando.";
  }
  if (sushiCount <= 12) {
    return "Buen ritmo, ya estás en modo sushi.";
  }
  if (sushiCount <= 24) {
    return "Cuidado, estás entrando en territorio profesional.";
  }
  return "Leyenda del sushi desbloqueada.";
};

export const useSushiCounter = () => {
  const [sushiCount, setSushiCount] = useState(0);
  const [bestRecord, setBestRecord] = useState(0);
  const [lastSushiTime, setLastSushiTime] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [showPopAnimation, setShowPopAnimation] = useState(false);
  const [floatingSushiId, setFloatingSushiId] = useState(0);

  useEffect(() => {
    const countFromStorage = parseSafeNumber(localStorage.getItem(STORAGE_KEYS.sushiCount));
    const recordFromStorage = parseSafeNumber(localStorage.getItem(STORAGE_KEYS.bestRecord));
    const lastTimeFromStorage = localStorage.getItem(STORAGE_KEYS.lastSushiTime);
    const historyFromStorage = parseSafeHistory(localStorage.getItem(STORAGE_KEYS.sushiHistory));

    setSushiCount(countFromStorage);
    setBestRecord(Math.max(recordFromStorage, countFromStorage));
    setLastSushiTime(lastTimeFromStorage || null);
    setHistory(historyFromStorage);
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    localStorage.setItem(STORAGE_KEYS.sushiCount, String(sushiCount));
    localStorage.setItem(STORAGE_KEYS.bestRecord, String(bestRecord));
    localStorage.setItem(STORAGE_KEYS.lastSushiTime, lastSushiTime ?? "");
    localStorage.setItem(STORAGE_KEYS.sushiHistory, JSON.stringify(history));
  }, [bestRecord, history, isHydrated, lastSushiTime, sushiCount]);

  const handleAddSushi = (amount = 1) => {
    if (amount <= 0) {
      return;
    }

    const newCount = sushiCount + amount;
    const now = getNow();
    const newHistory = [
      `${new Date(now).toLocaleString("es-AR", { dateStyle: "short", timeStyle: "short" })} (+${amount})`,
      ...history
    ].slice(0, MAX_HISTORY);

    setSushiCount(newCount);
    setLastSushiTime(now);
    setHistory(newHistory);

    if (newCount > bestRecord) {
      setBestRecord(newCount);
    }

    setShowPopAnimation(true);
    setFloatingSushiId((current) => current + 1);
    window.setTimeout(() => setShowPopAnimation(false), 260);
  };

  const handleRemoveSushi = () => {
    setSushiCount((current) => Math.max(0, current - 1));
  };

  const handleReset = () => {
    setSushiCount(0);
    setLastSushiTime(null);
    setHistory([]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const phrase = useMemo(() => getMessageByCount(sushiCount), [sushiCount]);
  const hasNewRecord = sushiCount > 0 && sushiCount === bestRecord;

  return {
    sushiCount,
    bestRecord,
    lastSushiTime,
    history,
    phrase,
    hasNewRecord,
    showPopAnimation,
    floatingSushiId,
    handleAddSushi,
    handleRemoveSushi,
    handleReset,
    clearHistory
  };
};
