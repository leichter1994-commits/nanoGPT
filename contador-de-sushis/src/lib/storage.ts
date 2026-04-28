export const CLAVES_STORAGE = {
  contadorSushis: "contadorSushis",
  mejorRecord: "mejorRecord",
  ultimoSushiISO: "ultimoSushiISO",
  historialSushis: "historialSushis"
} as const;

const esNumeroValido = (valor: number) => Number.isFinite(valor) && valor >= 0;

export const parsearNumeroSeguro = (valor: string | null): number => {
  const numero = Number(valor);
  return esNumeroValido(numero) ? Math.floor(numero) : 0;
};

export const parsearHistorialSeguro = (valor: string | null): string[] => {
  if (!valor) return [];

  try {
    const parsed = JSON.parse(valor);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => typeof item === "string").slice(0, 5);
  } catch {
    return [];
  }
};

export const tieneStorageDisponible = (): boolean => {
  try {
    return typeof window !== "undefined" && !!window.localStorage;
  } catch {
    return false;
  }
};
