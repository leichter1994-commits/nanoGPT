type Props = {
  contadorSushis: number;
  mejorRecord: number;
  frase: string;
  rompisteRecord: boolean;
  ultimoSushiISO: string | null;
  historialSushis: string[];
  onBorrarHistorial: () => void;
};

export const SushiStats = ({
  contadorSushis,
  mejorRecord,
  frase,
  rompisteRecord,
  ultimoSushiISO,
  historialSushis,
  onBorrarHistorial
}: Props) => {
  const ultimaFecha = ultimoSushiISO
    ? new Date(ultimoSushiISO).toLocaleString("es-AR", { dateStyle: "medium", timeStyle: "short" })
    : "Todavía sin registros";

  return (
    <section className="rounded-[28px] bg-white/95 p-6 shadow-soft">
      <h2 className="text-xl font-bold text-soy">Estadísticas</h2>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <article className="rounded-2xl border border-soy/10 bg-rice p-3">
          <p className="text-xs uppercase tracking-wider text-soy/60">Total</p>
          <p className="mt-1 text-xl font-bold text-soy">{contadorSushis} sushis</p>
        </article>
        <article className="rounded-2xl border border-soy/10 bg-rice p-3">
          <p className="text-xs uppercase tracking-wider text-soy/60">Récord histórico</p>
          <p className="mt-1 text-xl font-bold text-soy">{mejorRecord} sushis</p>
        </article>
      </div>

      <p className="mt-4 rounded-xl bg-salmon/10 px-4 py-3 text-sm font-medium text-soy">{frase}</p>

      <p className="mt-4 text-sm text-soy/80">
        <span className="font-semibold">Último sushi:</span> {ultimaFecha}
      </p>

      {rompisteRecord && (
        <p className="mt-4 rounded-xl bg-amber-100 px-4 py-2 font-semibold text-amber-900">
          🎉 ¡Nuevo récord! Superaste tu mejor marca.
        </p>
      )}

      <div className="mt-5 rounded-2xl border border-soy/10 bg-rice p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h3 className="font-semibold text-soy">Últimos 5 momentos</h3>
          <button
            type="button"
            onClick={onBorrarHistorial}
            className="rounded-lg border border-soy/20 px-3 py-1 text-xs font-semibold text-soy transition hover:bg-soy/5"
          >
            Borrar historial
          </button>
        </div>

        {historialSushis.length === 0 ? (
          <p className="text-sm text-soy/65">Aún no hay eventos guardados.</p>
        ) : (
          <ol className="list-inside list-decimal space-y-1 text-sm text-soy/80">
            {historialSushis.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
};
