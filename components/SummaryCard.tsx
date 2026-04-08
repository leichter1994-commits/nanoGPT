import { formatCurrency } from '@/lib/budget';

type SummaryCardProps = {
  label: string;
  value: number;
  helper: string;
  highlighted?: boolean;
  formatAsCurrency?: boolean;
};

export function SummaryCard({
  label,
  value,
  helper,
  highlighted = false,
  formatAsCurrency = true
}: SummaryCardProps) {
  return (
    <article
      className={[
        'rounded-3xl border p-5 shadow-soft transition',
        highlighted
          ? 'border-brand-200 bg-gradient-to-br from-brand-500 to-brand-700 text-white'
          : 'border-slate-200 bg-white/95 text-slate-900'
      ].join(' ')}
    >
      <p className={highlighted ? 'text-sm text-brand-50' : 'text-sm text-slate-500'}>{label}</p>
      <p className="mt-3 text-2xl font-semibold">{formatAsCurrency ? formatCurrency(value) : value}</p>
      <p className={highlighted ? 'mt-2 text-sm text-brand-100' : 'mt-2 text-sm text-slate-500'}>{helper}</p>
    </article>
  );
}
