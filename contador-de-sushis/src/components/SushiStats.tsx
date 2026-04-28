type SushiStatsProps = {
  sushiCount: number;
  bestRecord: number;
  phrase: string;
  hasNewRecord: boolean;
  lastSushiTime: string | null;
  history: string[];
  onClearHistory: () => void;
};

export const SushiStats = ({
  sushiCount,
  bestRecord,
  phrase,
  hasNewRecord,
  lastSushiTime,
  history,
  onClearHistory
}: SushiStatsProps) => {
  const formattedLastSushi = lastSushiTime
    ? new Date(lastSushiTime).toLocaleString("es-AR", { dateStyle: "medium", timeStyle: "short" })
    : "Todavía sin registros";

  return (
    <section className="rounded-3xl bg-white/95 p-6 shadow-soft">
      <h2 className="text-xl font-bold text-soy">Estadísticas</h2>
      <ul className="mt-4 space-y-2 text-sm text-soy/85 sm:text-base">
        <li>
          <span className="font-semibold">Total actual:</span> {sushiCount} sushis.
        </li>
        <li>
          <span className="font-semibold">Frase del día:</span> {phrase}
        </li>
        <li>
          <span className="font-semibold">Último sushi:</span> {formattedLastSushi}
        </li>
        <li>
          <span className="font-semibold">Tu récord:</span> {bestRecord} sushis.
        </li>
      </ul>

      {hasNewRecord && (
        <p className="mt-4 rounded-xl bg-amber-100 px-4 py-2 font-semibold text-amber-900">
          🎉 ¡Nuevo récord! Superaste tu mejor marca.
        </p>
      )}

      <div className="mt-5 rounded-2xl border border-soy/10 bg-rice p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h3 className="font-semibold text-soy">Últimos 5 momentos</h3>
          <button
            type="button"
            onClick={onClearHistory}
            className="rounded-lg border border-soy/20 px-3 py-1 text-xs font-semibold text-soy transition hover:bg-soy/5"
          >
            Borrar historial
          </button>
        </div>

        {history.length === 0 ? (
          <p className="text-sm text-soy/65">Aún no hay eventos guardados.</p>
        ) : (
          <ol className="list-inside list-decimal space-y-1 text-sm text-soy/80">
            {history.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
};
