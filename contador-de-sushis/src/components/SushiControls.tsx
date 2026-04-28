type Props = {
  onSumar: (cantidad?: number) => void;
  onRestar: () => void;
  onPedirReinicio: () => void;
};

export const SushiControls = ({ onSumar, onRestar, onPedirReinicio }: Props) => {
  return (
    <section className="grid gap-3" aria-label="Controles del contador">
      <button
        type="button"
        onClick={() => onSumar(1)}
        className="w-full rounded-2xl bg-salmon px-6 py-4 text-lg font-bold text-white shadow-lg transition hover:brightness-105 active:scale-[0.98]"
        aria-label="Comí un sushi"
      >
        Comí un sushi 🍣
      </button>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onSumar(5)}
          className="rounded-2xl bg-wasabi px-4 py-3 font-semibold text-soy transition hover:brightness-105 active:scale-[0.98]"
          aria-label="Sumar cinco sushis"
        >
          +5 sushis
        </button>
        <button
          type="button"
          onClick={() => onSumar(10)}
          className="rounded-2xl bg-soy px-4 py-3 font-semibold text-rice transition hover:brightness-110 active:scale-[0.98]"
          aria-label="Modo atracón sumar diez"
        >
          Modo atracón +10
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onRestar}
          className="rounded-2xl border border-soy/20 bg-white px-4 py-3 font-semibold text-soy transition hover:bg-soy/5 active:scale-[0.98]"
          aria-label="Restar uno"
        >
          Restar 1
        </button>
        <button
          type="button"
          onClick={onPedirReinicio}
          className="rounded-2xl border border-red-400/40 bg-red-50 px-4 py-3 font-semibold text-red-700 transition hover:bg-red-100 active:scale-[0.98]"
          aria-label="Reiniciar contador"
        >
          Reiniciar contador
        </button>
      </div>
    </section>
  );
};
