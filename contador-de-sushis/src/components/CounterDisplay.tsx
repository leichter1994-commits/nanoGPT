import clsx from "clsx";
import type { TipoEventoSushi } from "@/hooks/useSushiCounter";

type Props = {
  contadorSushis: number;
  animarNumero: boolean;
  eventoFlotante: TipoEventoSushi | null;
};

export const CounterDisplay = ({ contadorSushis, animarNumero, eventoFlotante }: Props) => {
  return (
    <section className="relative rounded-[28px] bg-white/95 p-6 text-center shadow-soft sm:p-8">
      <p className="inline-flex rounded-full bg-salmon/10 px-4 py-1 text-xs font-semibold text-salmon">
        Mini app MVP lista para usar
      </p>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-soy sm:text-4xl">Contador de Sushis 🍣</h1>
      <p className="mt-2 text-sm text-soy/70 sm:text-base">¿Cuántas piezas sobrevivieron?</p>

      <div className="relative mt-7">
        <p
          className={clsx("text-7xl font-black leading-none text-soy sm:text-8xl", animarNumero && "animate-pop")}
          aria-live="polite"
          aria-label={`Llevás ${contadorSushis} sushis comidos`}
        >
          {contadorSushis}
        </p>
        <span className="mt-3 block text-xs font-semibold uppercase tracking-[0.2em] text-soy/60 sm:text-sm">
          sushis comidos
        </span>

        {eventoFlotante && (
          <span
            key={eventoFlotante.id}
            className="pointer-events-none absolute left-1/2 top-5 -translate-x-1/2 animate-floatUp text-4xl"
            aria-hidden="true"
          >
            {eventoFlotante.emoji}
          </span>
        )}
      </div>
    </section>
  );
};
