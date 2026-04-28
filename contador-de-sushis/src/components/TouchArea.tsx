type Props = {
  onSumar: () => void;
};

export const TouchArea = ({ onSumar }: Props) => {
  return (
    <button
      type="button"
      onClick={onSumar}
      className="group w-full rounded-3xl border-2 border-dashed border-salmon/40 bg-white/75 px-6 py-9 text-center transition hover:bg-white active:scale-[0.99]"
      aria-label="Zona táctil grande para sumar un sushi"
    >
      <p className="text-base font-bold text-soy sm:text-lg">Tocá acá para sumar otro sushi</p>
      <p className="mt-1 text-sm text-soy/65">Ideal para usar con una mano mientras comés 🍱</p>
      <span className="mt-3 inline-flex rounded-full bg-salmon/10 px-3 py-1 text-xs font-semibold text-salmon">
        Tap rápido
      </span>
    </button>
  );
};
