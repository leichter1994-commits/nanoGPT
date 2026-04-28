type TouchAreaProps = {
  onAdd: () => void;
};

export const TouchArea = ({ onAdd }: TouchAreaProps) => {
  return (
    <button
      type="button"
      onClick={onAdd}
      className="w-full rounded-3xl border-2 border-dashed border-salmon/50 bg-white/70 px-6 py-10 text-center text-base font-semibold text-soy transition hover:bg-white active:scale-[0.99] sm:text-lg"
      aria-label="Zona táctil para sumar un sushi"
    >
      Tocá acá para sumar otro sushi
    </button>
  );
};
