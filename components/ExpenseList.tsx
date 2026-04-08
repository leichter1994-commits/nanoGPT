import { formatCurrency } from '@/lib/budget';
import { Expense } from '@/lib/types';

type ExpenseListProps = {
  expenses: Expense[];
  onDelete: (id: string) => void;
};

export function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Gastos cargados</h2>
          <p className="mt-1 text-sm text-slate-500">Podés revisar y eliminar registros individuales.</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
          {expenses.length} items
        </span>
      </div>

      {expenses.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
          Todavía no registraste gastos en este período.
        </div>
      ) : (
        <div className="space-y-3">
          {expenses.map((expense) => (
            <article
              key={expense.id}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
                    {expense.category}
                  </span>
                  <span className="text-sm text-slate-500">{expense.date}</span>
                </div>
                <p className="mt-2 text-base font-semibold text-slate-900">{formatCurrency(expense.amount)}</p>
                {expense.detail ? <p className="mt-1 text-sm text-slate-500">{expense.detail}</p> : null}
              </div>

              <button
                type="button"
                onClick={() => onDelete(expense.id)}
                className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                Eliminar
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
