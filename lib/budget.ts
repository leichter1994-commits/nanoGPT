import { Expense } from '@/lib/types';

export const MONTH_NAMES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
];

export function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export function getCurrentMonthRelation(month: number, year: number, today = new Date()) {
  const selectedIndex = year * 12 + month;
  const currentIndex = today.getFullYear() * 12 + today.getMonth();

  if (selectedIndex < currentIndex) return 'past';
  if (selectedIndex > currentIndex) return 'future';
  return 'current';
}

export function getIdealSpent({
  month,
  year,
  dailyBudget,
  daysInMonth,
  today = new Date()
}: {
  month: number;
  year: number;
  dailyBudget: number;
  daysInMonth: number;
  today?: Date;
}) {
  const relation = getCurrentMonthRelation(month, year, today);

  if (relation === 'past') {
    return dailyBudget * daysInMonth;
  }

  if (relation === 'future') {
    return 0;
  }

  const dayOfMonth = Math.min(today.getDate(), daysInMonth);
  return dailyBudget * dayOfMonth;
}

export function sumExpenses(expenses: Expense[]) {
  return expenses.reduce((acc, expense) => acc + expense.amount, 0);
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0
  }).format(Number.isFinite(value) ? value : 0);
}

export function getStatus(diffAgainstIdeal: number) {
  if (diffAgainstIdeal >= 0) {
    return {
      label: 'Vas bien',
      tone: 'green',
      description: 'Tu gasto real está por debajo o igual al ideal acumulado.'
    } as const;
  }

  const overspend = Math.abs(diffAgainstIdeal);

  if (overspend <= 5000) {
    return {
      label: 'Justo',
      tone: 'yellow',
      description: 'Estás apenas por encima del ideal. Conviene ajustar hoy.'
    } as const;
  }

  return {
    label: 'Pasado',
    tone: 'red',
    description: 'Ya superaste el ideal acumulado y conviene frenar gastos.'
  } as const;
}

export function formatInputDate(date = new Date()) {
  const timezoneOffset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 10);
}
