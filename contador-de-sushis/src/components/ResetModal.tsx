type Props = {
  abierto: boolean;
  onCancelar: () => void;
  onConfirmar: () => void;
};

export const ResetModal = ({ abierto, onCancelar, onConfirmar }: Props) => {
  if (!abierto) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-soy/40 p-4">
      <div className="w-full max-w-sm rounded-3xl bg-white p-5 shadow-soft" role="dialog" aria-modal="true">
        <h3 className="text-lg font-bold text-soy">¿Reiniciar contador?</h3>
        <p className="mt-2 text-sm text-soy/75">Vas a volver a 0 sushis en esta sesión.</p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onCancelar}
            className="rounded-xl border border-soy/20 px-4 py-2 font-semibold text-soy"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirmar}
            className="rounded-xl bg-salmon px-4 py-2 font-semibold text-white"
          >
            Sí, reiniciar
          </button>
        </div>
      </div>
    </div>
  );
};
