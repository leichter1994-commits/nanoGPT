export const STORAGE_KEYS = {
  sushiCount: "sushiCount",
  bestRecord: "bestRecord",
  lastSushiTime: "lastSushiTime",
  sushiHistory: "sushiHistory"
} as const;

export const parseSafeNumber = (value: string | null): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? Math.floor(parsed) : 0;
};

export const parseSafeHistory = (value: string | null): string[] => {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((item) => typeof item === "string").slice(0, 5);
  } catch {
    return [];
  }
};
