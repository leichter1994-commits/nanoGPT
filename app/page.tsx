'use client';

import { useEffect, useMemo, useState } from 'react';
import { ExpenseForm } from '@/components/ExpenseForm';
import { ExpenseList } from '@/components/ExpenseList';
import { StatusBanner } from '@/components/StatusBanner';
import { SummaryCard } from '@/components/SummaryCard';
import {
  formatCurrency,
  formatInputDate,
  getDaysInMonth,
  getIdealSpent,
  getStatus,
  MONTH_NAMES,
  sumExpenses
} from '@/lib/budget';
import { Expense, ExpenseCategory, StoredBudgetLegacy, StoredBudgetV2 } from '@/lib/types';

const STORAGE_KEY = 'ahorro-libre:v2';
const STORAGE_KEY_LEGACY = 'ahorro-libre:v1';

const fechaActual = new Date();

const draftInicial = {
  date: formatInputDate(fechaActual),
  amount: '',
  category: 'comida' as ExpenseCategory,
  detail: ''
};

function getPeriodoKey(mes: number, anio: number) {
  return `${anio}-${String(mes + 1).padStart(2, '0')}`;
}

function fechaPerteneceAlPeriodo(fechaIso: string, mes: number, anio: number) {
  const fecha = new Date(`${fechaIso}T12:00:00`);
  return fecha.getMonth() === mes && fecha.getFullYear() === anio;
}

export default function HomePage() {
  const [isReady, setIsReady] = useState(false);
  const [sueldoMensual, setSueldoMensual] = useState('');
  const [mesSeleccionado, setMesSeleccionado] = useState(fechaActual.getMonth());
  const [anioSeleccionado, setAnioSeleccionado] = useState(fechaActual.getFullYear());
  const [sueldosPorPeriodo, setSueldosPorPeriodo] = useState<Record<string, string>>({});
  const [gastosPorPeriodo, setGastosPorPeriodo] = useState<Record<string, Expense[]>>({});
  const [draft, setDraft] = useState(draftInicial);
  const [errorGasto, setErrorGasto] = useState('');

  const periodoKey = useMemo(() => getPeriodoKey(mesSeleccionado, anioSeleccionado), [mesSeleccionado, anioSeleccionado]);
  const gastosActuales = gastosPorPeriodo[periodoKey] ?? [];

  useEffect(() => {
    const savedData = window.localStorage.getItem(STORAGE_KEY);

    if (savedData) {
      try {
        const parsed = JSON.parse(savedData) as StoredBudgetV2;
        const mes = parsed.month ?? fechaActual.getMonth();
        const anio = parsed.year ?? fechaActual.getFullYear();
        const key = getPeriodoKey(mes, anio);

        setMesSeleccionado(mes);
        setAnioSeleccionado(anio);
        setSueldosPorPeriodo(parsed.salaryByPeriod ?? {});
        setGastosPorPeriodo(parsed.expensesByPeriod ?? {});
        setSueldoMensual(parsed.salaryByPeriod?.[key] ?? '');
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } else {
      const legacyData = window.localStorage.getItem(STORAGE_KEY_LEGACY);
      if (legacyData) {
        try {
          const parsedLegacy = JSON.parse(legacyData) as StoredBudgetLegacy;
          const mes = parsedLegacy.month ?? fechaActual.getMonth();
          const anio = parsedLegacy.year ?? fechaActual.getFullYear();
          const key = getPeriodoKey(mes, anio);

          setMesSeleccionado(mes);
          setAnioSeleccionado(anio);
          setSueldosPorPeriodo({ [key]: parsedLegacy.salary ?? '' });
          setGastosPorPeriodo({ [key]: parsedLegacy.expenses ?? [] });
          setSueldoMensual(parsedLegacy.salary ?? '');
        } catch {
          window.localStorage.removeItem(STORAGE_KEY_LEGACY);
        }
      }
    }

    setIsReady(true);
  }, []);

  useEffect(() => {
    const sueldoPeriodo = sueldosPorPeriodo[periodoKey] ?? '';
    setSueldoMensual(sueldoPeriodo);
  }, [periodoKey, sueldosPorPeriodo]);

  useEffect(() => {
    if (!isReady) return;

    const payload: StoredBudgetV2 = {
      month: mesSeleccionado,
      year: anioSeleccionado,
      salaryByPeriod: sueldosPorPeriodo,
      expensesByPeriod: gastosPorPeriodo
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [anioSeleccionado, gastosPorPeriodo, isReady, mesSeleccionado, sueldosPorPeriodo]);

  const sueldoNumero = Number(sueldoMensual) || 0;
  const diasDelMes = useMemo(() => getDaysInMonth(anioSeleccionado, mesSeleccionado), [anioSeleccionado, mesSeleccionado]);
  const presupuestoDiario = sueldoNumero / Math.max(diasDelMes, 1);
  const presupuestoSemanal = presupuestoDiario * 7;
  const totalGastado = useMemo(() => sumExpenses(gastosActuales), [gastosActuales]);
  const gastoIdeal = useMemo(
    () =>
      getIdealSpent({
        month: mesSeleccionado,
        year: anioSeleccionado,
        dailyBudget: presupuestoDiario,
        daysInMonth: diasDelMes
      }),
    [anioSeleccionado, diasDelMes, mesSeleccionado, presupuestoDiario]
  );

  const dineroRestante = sueldoNumero - totalGastado;
  const diferenciaContraIdeal = gastoIdeal - totalGastado;
  const estado = getStatus(diferenciaContraIdeal);
  const progresoPresupuesto = sueldoNumero > 0 ? Math.min((totalGastado / sueldoNumero) * 100, 100) : 0;

  const handleCambiarSueldo = (valor: string) => {
    setSueldoMensual(valor);
    setSueldosPorPeriodo((actual) => ({
      ...actual,
      [periodoKey]: valor
    }));
  };

  const handleAddExpense = () => {
    const monto = Number(draft.amount);

    if (!draft.date || !Number.isFinite(monto) || monto <= 0) {
      setErrorGasto('Completá una fecha válida y un monto mayor a 0.');
      return;
    }

    if (!fechaPerteneceAlPeriodo(draft.date, mesSeleccionado, anioSeleccionado)) {
      setErrorGasto('La fecha del gasto debe pertenecer al mes y año seleccionados.');
      return;
    }

    const nuevoGasto: Expense = {
      id: crypto.randomUUID(),
      date: draft.date,
      amount: monto,
      category: draft.category,
      detail: draft.detail.trim()
    };

    setGastosPorPeriodo((actual) => {
      const lista = [...(actual[periodoKey] ?? []), nuevoGasto].sort(
        (a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id)
      );
      return {
        ...actual,
        [periodoKey]: lista
      };
    });

    setErrorGasto('');
    setDraft({ ...draftInicial, date: draft.date });
  };

  const handleDeleteExpense = (id: string) => {
    setGastosPorPeriodo((actual) => ({
      ...actual,
      [periodoKey]: (actual[periodoKey] ?? []).filter((expense) => expense.id !== id)
    }));
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] bg-gradient-to-br from-brand-500 via-sky-500 to-cyan-400 p-8 text-white shadow-soft">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-100">Ahorro Libre</p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">Tu presupuesto del mes, claro y bajo control.</h1>
          <p className="mt-4 max-w-2xl text-base text-sky-50 sm:text-lg">
            Cargá tu sueldo, elegí el período y seguí si estás gastando por debajo, justo o por encima del ideal acumulado.
          </p>
        </div>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <div className="mb-6 flex flex-col gap-2">
              <h2 className="text-lg font-semibold text-slate-900">Configuración mensual</h2>
              <p className="text-sm text-slate-500">Cada mes guarda su propio sueldo y sus propios gastos en tu navegador.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Sueldo mensual
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Ej: 1200000"
                  value={sueldoMensual}
                  onChange={(event) => handleCambiarSueldo(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-brand-400 focus:bg-white"
                />
              </label>

              <label className="space-y-2 text-sm font-medium text-slate-700">
                Mes
                <select
                  value={mesSeleccionado}
                  onChange={(event) => setMesSeleccionado(Number(event.target.value))}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-brand-400 focus:bg-white"
                >
                  {MONTH_NAMES.map((monthName, index) => (
                    <option key={monthName} value={index}>
                      {monthName}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-2 text-sm font-medium text-slate-700">
                Año
                <select
                  value={anioSeleccionado}
                  onChange={(event) => setAnioSeleccionado(Number(event.target.value))}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-brand-400 focus:bg-white"
                >
                  {Array.from({ length: 7 }, (_, index) => fechaActual.getFullYear() - 2 + index).map((yearOption) => (
                    <option key={yearOption} value={yearOption}>
                      {yearOption}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-6 rounded-3xl bg-slate-50 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">Uso del presupuesto</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">{progresoPresupuesto.toFixed(0)}%</p>
                </div>
                <div className="text-right text-sm text-slate-500">
                  <p>{formatCurrency(totalGastado)} gastados</p>
                  <p>{formatCurrency(sueldoNumero)} disponibles en el mes</p>
                </div>
              </div>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-400 transition-all"
                  style={{ width: `${progresoPresupuesto}%` }}
                />
              </div>
            </div>
          </section>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
              label="Días del mes"
              value={diasDelMes}
              helper="Cálculo real según el mes y año elegidos."
              formatAsCurrency={false}
            />
            <SummaryCard label="Presupuesto diario" value={presupuestoDiario} helper="Lo que podrías gastar por día para no pasarte." highlighted />
            <SummaryCard label="Presupuesto semanal" value={presupuestoSemanal} helper="Estimación simple basada en 7 días." />
            <SummaryCard label="Ideal acumulado" value={gastoIdeal} helper="Comparación automática según pasado, actual o futuro." />
          </div>

          <StatusBanner
            label={estado.label}
            description={estado.description}
            tone={estado.tone}
            difference={formatCurrency(diferenciaContraIdeal)}
          />

          <ExpenseForm draft={draft} onChange={setDraft} onSubmit={handleAddExpense} error={errorGasto} />
          <ExpenseList expenses={gastosActuales} onDelete={handleDeleteExpense} />
        </div>

        <aside className="space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-slate-900">Resumen final</h2>
            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <span className="text-sm text-slate-500">Total gastado</span>
                <span className="text-base font-semibold text-slate-900">{formatCurrency(totalGastado)}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <span className="text-sm text-slate-500">Dinero restante</span>
                <span className="text-base font-semibold text-slate-900">{formatCurrency(dineroRestante)}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <span className="text-sm text-slate-500">Diferencia contra el ideal</span>
                <span className="text-base font-semibold text-slate-900">{formatCurrency(diferenciaContraIdeal)}</span>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-slate-900">Cómo se calcula</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-500">
              <li>• Mes pasado: el ideal acumulado toma todo el presupuesto del mes.</li>
              <li>• Mes actual: multiplica el presupuesto diario por el día actual.</li>
              <li>• Mes futuro: el ideal acumulado arranca en cero.</li>
              <li>• Los días del mes contemplan febrero, años bisiestos y meses de 30/31 días.</li>
            </ul>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-slate-50 shadow-soft">
            <h2 className="text-lg font-semibold">Enfoque del MVP</h2>
            <p className="mt-3 text-sm text-slate-300">
              Una sola pantalla, rápida y simple. Cada período guarda su estado sin pisar meses anteriores.
            </p>
          </section>
        </aside>
      </section>
    </main>
  );
}
