export const expenseCategories = [
  'alquiler',
  'luz',
  'agua',
  'gas',
  'internet',
  'comida',
  'transporte',
  'tarjeta',
  'salidas',
  'salud',
  'otros'
] as const;

export type ExpenseCategory = (typeof expenseCategories)[number];

export type Expense = {
  id: string;
  date: string;
  amount: number;
  category: ExpenseCategory;
  detail: string;
};

export type StoredBudgetV2 = {
  month: number;
  year: number;
  salaryByPeriod: Record<string, string>;
  expensesByPeriod: Record<string, Expense[]>;
};

export type StoredBudgetLegacy = {
  salary?: string;
  month?: number;
  year?: number;
  expenses?: Expense[];
};
