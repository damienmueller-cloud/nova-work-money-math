export type FormatKind = 'currency' | 'number' | 'percent' | 'months' | 'hours' | 'days';

export function formatValue(value: number, kind: FormatKind, prefix = '', suffix = ''): string {
  if (!Number.isFinite(value)) return '—';

  const abs = Math.abs(value);
  let core: string;

  switch (kind) {
    case 'currency':
      core = new Intl.NumberFormat(undefined, {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
      return `${prefix || '$'}${core}${suffix}`;
    case 'percent':
      core = new Intl.NumberFormat(undefined, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }).format(value);
      return `${core}%`;
    case 'months':
      core = new Intl.NumberFormat(undefined, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }).format(value);
      return `${core} mo`;
    case 'hours':
      core = new Intl.NumberFormat(undefined, {
        minimumFractionDigits: abs >= 10 ? 1 : 2,
        maximumFractionDigits: 2,
      }).format(value);
      return `${core} h`;
    case 'days':
      core = new Intl.NumberFormat(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 1,
      }).format(value);
      return `${core} days`;
    case 'number':
    default:
      core = new Intl.NumberFormat(undefined, {
        minimumFractionDigits: abs >= 100 ? 2 : 4,
        maximumFractionDigits: abs >= 100 ? 2 : 4,
      }).format(value);
      return `${prefix}${core}${suffix}`;
  }
}
