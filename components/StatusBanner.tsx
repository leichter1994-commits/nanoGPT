type StatusBannerProps = {
  label: string;
  description: string;
  tone: 'green' | 'yellow' | 'red';
  difference: string;
};

const toneClasses: Record<StatusBannerProps['tone'], string> = {
  green: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  yellow: 'border-amber-200 bg-amber-50 text-amber-900',
  red: 'border-rose-200 bg-rose-50 text-rose-900'
};

export function StatusBanner({ label, description, tone, difference }: StatusBannerProps) {
  return (
    <section className={`rounded-3xl border p-6 shadow-soft ${toneClasses[tone]}`}>
      <p className="text-sm font-semibold uppercase tracking-[0.2em]">Estado actual</p>
      <div className="mt-3 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{label}</h2>
          <p className="mt-1 text-sm opacity-80">{description}</p>
        </div>
        <p className="text-lg font-semibold">Diferencia vs ideal: {difference}</p>
      </div>
    </section>
  );
}
