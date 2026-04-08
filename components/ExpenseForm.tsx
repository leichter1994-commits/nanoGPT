import { expenseCategories, ExpenseCategory } from '@/lib/types';

type ExpenseDraft = {
  date: string;
  amount: string;
  category: ExpenseCategory;
  detail: string;
};

type ExpenseFormProps = {
  draft: ExpenseDraft;
  onChange: (draft: ExpenseDraft) => void;
  onSubmit: () => void;
  error: string;
};

export function ExpenseForm({ draft, onChange, onSubmit, error }: ExpenseFormProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">Registrar gasto</h2>
        <p className="mt-1 text-sm text-slate-500">Cargá un gasto manual para actualizar el seguimiento.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-slate-700">
          Fecha
          <input
            type="date"
            value={draft.date}
            onChange={(event) => onChange({ ...draft, date: event.target.value })}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-brand-400 focus:bg-white"
          />
        </label>

        <label className="space-y-2 text-sm font-medium text-slate-700">
          Monto
          <input
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            placeholder="Ej: 12500"
            value={draft.amount}
            onChange={(event) => onChange({ ...draft, amount: event.target.value })}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-brand-400 focus:bg-white"
          />
        </label>

        <label className="space-y-2 text-sm font-medium text-slate-700">
          Categoría
          <select
            value={draft.category}
            onChange={(event) => onChange({ ...draft, category: event.target.value as ExpenseCategory })}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-brand-400 focus:bg-white"
          >
            {expenseCategories.map((category) => (
              <option key={category} value={category}>
                {category[0].toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm font-medium text-slate-700">
          Detalle (opcional)
          <input
            type="text"
            maxLength={80}
            placeholder="Ej: Supermercado de la semana"
            value={draft.detail}
            onChange={(event) => onChange({ ...draft, detail: event.target.value })}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-brand-400 focus:bg-white"
          />
        </label>
      </div>

      {error ? <p className="mt-4 text-sm font-medium text-rose-600">{error}</p> : null}

      <button
        type="button"
        onClick={onSubmit}
        className="mt-5 inline-flex items-center justify-center rounded-2xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
      >
        Agregar gasto
      </button>
    </section>
  );
}
