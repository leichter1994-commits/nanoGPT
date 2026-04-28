import clsx from "clsx";

type CounterDisplayProps = {
  sushiCount: number;
  showPopAnimation: boolean;
  floatingSushiId: number;
};

export const CounterDisplay = ({ sushiCount, showPopAnimation, floatingSushiId }: CounterDisplayProps) => {
  return (
    <section className="relative rounded-3xl bg-rice/95 p-6 text-center shadow-soft">
      <h1 className="text-3xl font-extrabold tracking-tight text-soy sm:text-4xl">Contador de Sushis 🍣</h1>
      <p className="mt-2 text-sm text-soy/70 sm:text-base">¿Cuántas piezas sobrevivieron?</p>

      <div className="relative mt-6">
        <p
          className={clsx(
            "text-7xl font-black leading-none text-soy sm:text-8xl",
            showPopAnimation && "animate-pop"
          )}
          aria-live="polite"
          aria-label={`Cantidad actual: ${sushiCount} sushis`}
        >
          {sushiCount}
        </p>
        <span className="mt-3 block text-sm font-semibold uppercase tracking-wider text-soy/65">sushis comidos</span>

        {floatingSushiId > 0 && (
          <span
            key={floatingSushiId}
            className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 animate-floatUp text-4xl"
            aria-hidden="true"
          >
            🍣
          </span>
        )}
      </div>
    </section>
  );
};
