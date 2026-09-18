export type BreakdownRow = {
  label: string;
  value: number;
  format: 'currency' | 'number' | 'percent' | 'months' | 'hours' | 'days';
};

export type ComputeResult = {
  primary: number;
  format: 'currency' | 'number' | 'percent' | 'months' | 'hours' | 'days';
  breakdown?: BreakdownRow[];
  error?: string;
};

export type ComputeFn = (v: Record<string, number>) => ComputeResult;

function safeDiv(n: number, d: number): number | null {
  if (!Number.isFinite(n) || !Number.isFinite(d) || d === 0) return null;
  return n / d;
}

export const computeMap: Record<string, ComputeFn> = {
  'day-rate-from-salary': (v) => {
    const rate = safeDiv(v.salary, v.days);
    if (rate === null) return { primary: 0, format: 'currency', error: 'Enter a positive number of billable days.' };
    return {
      primary: rate,
      format: 'currency',
      breakdown: [
        { label: 'Annual target', value: v.salary, format: 'currency' },
        { label: 'Billable days', value: v.days, format: 'days' },
      ],
    };
  },

  'hourly-to-project-fee': (v) => {
    const base = v.hourly * v.hours;
    const fee = base * (1 + v.contingency / 100);
    return {
      primary: fee,
      format: 'currency',
      breakdown: [
        { label: 'Base (rate × hours)', value: base, format: 'currency' },
        { label: 'Contingency amount', value: fee - base, format: 'currency' },
      ],
    };
  },

  'platform-fee-cut': (v) => {
    const fee = v.gross * (v.feePercent / 100);
    const net = v.gross - fee;
    return {
      primary: net,
      format: 'currency',
      breakdown: [
        { label: 'Platform fee', value: fee, format: 'currency' },
        { label: 'Fee %', value: v.feePercent, format: 'percent' },
      ],
    };
  },

  'take-home-simple-percent': (v) => {
    const take = v.gross * (1 - v.rate / 100);
    const tax = v.gross - take;
    return {
      primary: take,
      format: 'currency',
      breakdown: [
        { label: 'Estimated tax / withholding', value: tax, format: 'currency' },
        { label: 'Effective rate used', value: v.rate, format: 'percent' },
      ],
    };
  },

  'break-even-hourly': (v) => {
    const rate = safeDiv(v.costs, v.hours);
    if (rate === null) return { primary: 0, format: 'currency', error: 'Enter billable hours greater than zero.' };
    return {
      primary: rate,
      format: 'currency',
      breakdown: [
        { label: 'Monthly costs', value: v.costs, format: 'currency' },
        { label: 'Billable hours', value: v.hours, format: 'hours' },
      ],
    };
  },

  'runway-months': (v) => {
    const months = safeDiv(v.savings, v.burn);
    if (months === null) return { primary: 0, format: 'months', error: 'Enter a positive monthly burn.' };
    return {
      primary: months,
      format: 'months',
      breakdown: [
        { label: 'Cash available', value: v.savings, format: 'currency' },
        { label: 'Monthly burn', value: v.burn, format: 'currency' },
      ],
    };
  },

  'invoice-late-fee': (v) => {
    const fee = v.amount * (v.annualRate / 100) * (v.days / 365);
    return {
      primary: fee,
      format: 'currency',
      breakdown: [
        { label: 'Invoice + fee', value: v.amount + fee, format: 'currency' },
        { label: 'Days overdue', value: v.days, format: 'days' },
      ],
    };
  },

  'effective-hourly-after-unpaid-admin': (v) => {
    const earnings = v.rate * v.billable;
    const totalHours = v.billable + v.admin;
    const effective = safeDiv(earnings, totalHours);
    if (effective === null) return { primary: 0, format: 'currency', error: 'Enter some hours worked.' };
    return {
      primary: effective,
      format: 'currency',
      breakdown: [
        { label: 'Gross from billable work', value: earnings, format: 'currency' },
        { label: 'Total hours (billable + admin)', value: totalHours, format: 'hours' },
      ],
    };
  },

  'raise-needed-to-keep-net': (v) => {
    const net = v.gross * (1 - v.oldRate / 100);
    const denom = 1 - v.newRate / 100;
    if (denom <= 0) return { primary: 0, format: 'currency', error: 'New tax rate must be under 100%.' };
    const newGross = net / denom;
    return {
      primary: newGross,
      format: 'currency',
      breakdown: [
        { label: 'Current net (illustrative)', value: net, format: 'currency' },
        { label: 'Gross increase needed', value: newGross - v.gross, format: 'currency' },
      ],
    };
  },

  'savings-rate': (v) => {
    if (v.income <= 0) return { primary: 0, format: 'percent', error: 'Income must be greater than zero.' };
    const saved = v.income - v.expenses;
    const rate = (saved / v.income) * 100;
    return {
      primary: rate,
      format: 'percent',
      breakdown: [
        { label: 'Amount saved', value: saved, format: 'currency' },
        { label: 'Expenses', value: v.expenses, format: 'currency' },
      ],
    };
  },

  'side-hustle-hourly-value': (v) => {
    const profit = v.revenue - v.costs;
    const perHour = safeDiv(profit, v.hours);
    if (perHour === null) return { primary: 0, format: 'currency', error: 'Enter hours greater than zero.' };
    return {
      primary: perHour,
      format: 'currency',
      breakdown: [
        { label: 'Net profit', value: profit, format: 'currency' },
        { label: 'Hours invested', value: v.hours, format: 'hours' },
      ],
    };
  },

  'gst-add-remove': (v) => {
    const add = v.mode >= 0.5;
    if (add) {
      const withGst = v.amount * 1.1;
      return {
        primary: withGst,
        format: 'currency',
        breakdown: [
          { label: 'GST (10%)', value: withGst - v.amount, format: 'currency' },
          { label: 'Ex-GST', value: v.amount, format: 'currency' },
        ],
      };
    }
    const exGst = v.amount / 1.1;
    return {
      primary: exGst,
      format: 'currency',
      breakdown: [
        { label: 'GST component', value: v.amount - exGst, format: 'currency' },
        { label: 'GST-inclusive', value: v.amount, format: 'currency' },
      ],
    };
  },

  'currency-markup-on-quote': (v) => {
    const converted = v.base * v.fx;
    const quoted = converted * (1 + v.markup / 100);
    return {
      primary: quoted,
      format: 'number',
      breakdown: [
        { label: 'After FX (no markup)', value: converted, format: 'number' },
        { label: 'Markup amount', value: quoted - converted, format: 'number' },
      ],
    };
  },

  'weekly-hours-to-hit-income-goal': (v) => {
    const monthlyHours = safeDiv(v.goal, v.rate);
    if (monthlyHours === null) return { primary: 0, format: 'hours', error: 'Hourly rate must be greater than zero.' };
    const weekly = safeDiv(monthlyHours, v.weeks);
    if (weekly === null) return { primary: 0, format: 'hours', error: 'Working weeks must be greater than zero.' };
    return {
      primary: weekly,
      format: 'hours',
      breakdown: [
        { label: 'Hours needed per month', value: monthlyHours, format: 'hours' },
        { label: 'At rate', value: v.rate, format: 'currency' },
      ],
    };
  },

  'contractor-vs-employee-gross-rough': (v) => {
    const target = v.salary * (1 + v.overhead / 100);
    const day = safeDiv(target, v.days);
    if (day === null) return { primary: 0, format: 'currency', error: 'Enter billable days greater than zero.' };
    return {
      primary: day,
      format: 'currency',
      breakdown: [
        { label: 'Annual contractor target', value: target, format: 'currency' },
        { label: 'Rough annual equivalent', value: target, format: 'currency' },
        { label: 'Overhead buffer', value: v.overhead, format: 'percent' },
      ],
    };
  },

  'retainer-to-hourly-equivalent': (v) => {
    const hourly = safeDiv(v.retainer, v.hours);
    if (hourly === null) return { primary: 0, format: 'currency', error: 'Enter expected hours greater than zero.' };
    return {
      primary: hourly,
      format: 'currency',
      breakdown: [
        { label: 'Monthly retainer', value: v.retainer, format: 'currency' },
        { label: 'Expected hours', value: v.hours, format: 'hours' },
      ],
    };
  },

  'profit-margin-on-job': (v) => {
    if (v.revenue <= 0) return { primary: 0, format: 'percent', error: 'Revenue must be greater than zero.' };
    const profit = v.revenue - v.costs;
    const margin = (profit / v.revenue) * 100;
    return {
      primary: margin,
      format: 'percent',
      breakdown: [
        { label: 'Profit', value: profit, format: 'currency' },
        { label: 'Direct costs', value: v.costs, format: 'currency' },
      ],
    };
  },
};
