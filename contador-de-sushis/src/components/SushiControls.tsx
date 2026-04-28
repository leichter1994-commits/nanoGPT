type SushiControlsProps = {
  onAdd: (amount?: number) => void;
  onRemove: () => void;
  onReset: () => void;
};

export const SushiControls = ({ onAdd, onRemove, onReset }: SushiControlsProps) => {
  const handleResetClick = () => {
    const confirmed = window.confirm("¿Seguro que querés reiniciar el contador?");
    if (confirmed) {
      onReset();
    }
  };

  return (
    <section className="grid gap-3" aria-label="Controles del contador">
      <button
        type="button"
        onClick={() => onAdd(1)}
        className="w-full rounded-2xl bg-salmon px-6 py-4 text-lg font-bold text-white shadow-lg transition hover:brightness-105 active:scale-[0.98]"
        aria-label="Sumar un sushi"
      >
        Comí un sushi 🍣
      </button>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onAdd(5)}
          className="rounded-2xl bg-wasabi px-5 py-3 font-semibold text-soy transition hover:brightness-105 active:scale-[0.98]"
          aria-label="Sumar cinco sushis"
        >
          +5 sushis
        </button>
        <button
          type="button"
          onClick={() => onAdd(10)}
          className="rounded-2xl bg-soy px-5 py-3 font-semibold text-rice transition hover:brightness-110 active:scale-[0.98]"
          aria-label="Activar modo atracón y sumar diez sushis"
        >
          Modo atracón +10
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={onRemove}
          className="rounded-2xl border border-soy/20 bg-white px-5 py-3 font-semibold text-soy transition hover:bg-soy/5 active:scale-[0.98]"
          aria-label="Restar un sushi"
        >
          Restar 1
        </button>
        <button
          type="button"
          onClick={handleResetClick}
          className="rounded-2xl border border-red-400/40 bg-red-50 px-5 py-3 font-semibold text-red-700 transition hover:bg-red-100 active:scale-[0.98]"
          aria-label="Reiniciar contador"
        >
          Reiniciar contador
        </button>
      </div>
    </section>
  );
};
