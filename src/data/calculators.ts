export type InputDef = {
  id: string;
  label: string;
  defaultValue: number;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  help?: string;
};

export type Calculator = {
  slug: string;
  title: string;
  description: string;
  category: string;
  inputs: InputDef[];
  resultLabel: string;
  resultFormat: 'currency' | 'number' | 'percent' | 'months' | 'hours' | 'days';
  resultPrefix?: string;
  resultSuffix?: string;
  explainer: string;
  relatedSlugs: string[];
  seoTitle: string;
  seoDescription: string;
  /** Mark take-home / tax toys as illustrative estimates */
  illustrative?: boolean;
};

export const CATEGORY_ORDER = [
  'Rates & pricing',
  'Take-home & tax toys',
  'Cashflow & runway',
  'Invoicing & fees',
  'Hours & productivity',
  'Side hustle',
] as const;

export const calculators: Calculator[] = [
  {
    slug: 'day-rate-from-salary',
    title: 'Day rate from salary',
    description: 'Convert an annual salary target into a freelance day rate.',
    category: 'Rates & pricing',
    inputs: [
      { id: 'salary', label: 'Target annual income', defaultValue: 90000, min: 0, step: 1000, prefix: '$' },
      { id: 'days', label: 'Billable days per year', defaultValue: 220, min: 1, max: 365, step: 1, help: 'Typical full-time freelancers use ~200–230.' },
    ],
    resultLabel: 'Suggested day rate',
    resultFormat: 'currency',
    explainer:
      'Divide your annual income goal by the number of days you expect to bill. Build in non-billable time (admin, sales, leave) by using fewer billable days rather than padding the salary figure twice.',
    relatedSlugs: ['hourly-to-project-fee', 'break-even-hourly', 'weekly-hours-to-hit-income-goal'],
    seoTitle: 'Day Rate from Salary Calculator',
    seoDescription: 'Convert an annual salary into a freelance day rate using billable days per year.',
  },
  {
    slug: 'hourly-to-project-fee',
    title: 'Hourly to project fee',
    description: 'Turn an hourly rate and estimated hours into a project quote with contingency.',
    category: 'Rates & pricing',
    inputs: [
      { id: 'hourly', label: 'Hourly rate', defaultValue: 85, min: 0, step: 1, prefix: '$' },
      { id: 'hours', label: 'Estimated hours', defaultValue: 40, min: 0, step: 0.5 },
      { id: 'contingency', label: 'Contingency', defaultValue: 15, min: 0, max: 100, step: 1, suffix: '%' },
    ],
    resultLabel: 'Project fee',
    resultFormat: 'currency',
    explainer:
      'Multiply rate × hours, then add a contingency percentage for scope creep and unknowns. Many freelancers use 10–20% on fixed-price work.',
    relatedSlugs: ['day-rate-from-salary', 'currency-markup-on-quote', 'platform-fee-cut'],
    seoTitle: 'Hourly Rate to Project Fee Calculator',
    seoDescription: 'Estimate a fixed project fee from hourly rate, hours, and contingency.',
  },
  {
    slug: 'platform-fee-cut',
    title: 'Platform fee cut',
    description: 'See how much a marketplace or platform keeps from a gig.',
    category: 'Invoicing & fees',
    inputs: [
      { id: 'gross', label: 'Client pays (gross)', defaultValue: 1000, min: 0, step: 10, prefix: '$' },
      { id: 'feePercent', label: 'Platform fee', defaultValue: 20, min: 0, max: 100, step: 0.1, suffix: '%' },
    ],
    resultLabel: 'You receive',
    resultFormat: 'currency',
    explainer:
      'Platforms often take a percentage of the client payment. This shows fee amount and your net before tax. Raise your listed rate if you need a specific take-home after fees.',
    relatedSlugs: ['hourly-to-project-fee', 'take-home-simple-percent', 'gst-add-remove'],
    seoTitle: 'Platform Fee Calculator for Freelancers',
    seoDescription: 'Calculate how much a platform fee removes from your freelance payout.',
  },
  {
    slug: 'take-home-simple-percent',
    title: 'Take-home (simple %)',
    description: 'Rough take-home after a flat effective tax/withholding percentage.',
    category: 'Take-home & tax toys',
    inputs: [
      { id: 'gross', label: 'Gross amount', defaultValue: 5000, min: 0, step: 50, prefix: '$' },
      { id: 'rate', label: 'Effective tax / withholding', defaultValue: 30, min: 0, max: 100, step: 0.5, suffix: '%' },
    ],
    resultLabel: 'Estimated take-home',
    resultFormat: 'currency',
    illustrative: true,
    explainer:
      'Applies a single effective percentage to gross income. Real tax depends on jurisdiction, deductions, brackets, and credits. Use only as a planning toy — not tax advice.',
    relatedSlugs: ['raise-needed-to-keep-net', 'contractor-vs-employee-gross-rough', 'gst-add-remove'],
    seoTitle: 'Simple Take-Home Pay Estimator',
    seoDescription: 'Illustrative take-home estimate using a flat effective tax percentage. Not tax advice.',
  },
  {
    slug: 'break-even-hourly',
    title: 'Break-even hourly rate',
    description: 'Minimum hourly rate to cover monthly costs from billable hours.',
    category: 'Rates & pricing',
    inputs: [
      { id: 'costs', label: 'Monthly costs / draw', defaultValue: 4500, min: 0, step: 50, prefix: '$' },
      { id: 'hours', label: 'Billable hours / month', defaultValue: 80, min: 0.1, step: 1 },
    ],
    resultLabel: 'Break-even hourly',
    resultFormat: 'currency',
    explainer:
      'Divide the money you need each month by realistic billable hours. Anything above this rate funds profit, tax set-asides, and buffer.',
    relatedSlugs: ['day-rate-from-salary', 'weekly-hours-to-hit-income-goal', 'runway-months'],
    seoTitle: 'Break-Even Hourly Rate Calculator',
    seoDescription: 'Find the minimum freelance hourly rate to cover monthly costs.',
  },
  {
    slug: 'runway-months',
    title: 'Runway months',
    description: 'How long cash lasts at your current monthly burn.',
    category: 'Cashflow & runway',
    inputs: [
      { id: 'savings', label: 'Cash / savings available', defaultValue: 24000, min: 0, step: 100, prefix: '$' },
      { id: 'burn', label: 'Net monthly burn', defaultValue: 4000, min: 0.01, step: 50, prefix: '$', help: 'Expenses minus any steady income.' },
    ],
    resultLabel: 'Runway',
    resultFormat: 'months',
    explainer:
      'Cash ÷ monthly burn. Useful before quitting a job or during slow seasons. Increase runway by cutting burn or building a larger cash buffer.',
    relatedSlugs: ['savings-rate', 'break-even-hourly', 'side-hustle-hourly-value'],
    seoTitle: 'Cash Runway Months Calculator',
    seoDescription: 'Estimate how many months your savings last at a given burn rate.',
  },
  {
    slug: 'invoice-late-fee',
    title: 'Invoice late fee',
    description: 'Simple interest-style late fee for overdue invoices.',
    category: 'Invoicing & fees',
    inputs: [
      { id: 'amount', label: 'Invoice amount', defaultValue: 2500, min: 0, step: 10, prefix: '$' },
      { id: 'annualRate', label: 'Annual late-fee rate', defaultValue: 12, min: 0, max: 100, step: 0.1, suffix: '%' },
      { id: 'days', label: 'Days overdue', defaultValue: 30, min: 0, step: 1 },
    ],
    resultLabel: 'Late fee',
    resultFormat: 'currency',
    explainer:
      'Uses simple interest: amount × annual rate × (days / 365). Check local rules and your contract before charging. Some jurisdictions cap or prohibit late fees.',
    relatedSlugs: ['platform-fee-cut', 'gst-add-remove', 'hourly-to-project-fee'],
    seoTitle: 'Invoice Late Fee Calculator',
    seoDescription: 'Estimate a simple-interest late fee on an overdue freelance invoice.',
  },
  {
    slug: 'effective-hourly-after-unpaid-admin',
    title: 'Effective hourly after unpaid admin',
    description: 'True hourly value once unpaid admin and sales time are included.',
    category: 'Hours & productivity',
    inputs: [
      { id: 'rate', label: 'Billable hourly rate', defaultValue: 100, min: 0, step: 1, prefix: '$' },
      { id: 'billable', label: 'Billable hours', defaultValue: 30, min: 0, step: 0.5 },
      { id: 'admin', label: 'Unpaid admin / sales hours', defaultValue: 10, min: 0, step: 0.5 },
    ],
    resultLabel: 'Effective hourly',
    resultFormat: 'currency',
    explainer:
      'Total earnings ÷ all hours worked (billable + unpaid). If effective rate feels low, raise prices, batch admin, or protect more billable blocks.',
    relatedSlugs: ['side-hustle-hourly-value', 'break-even-hourly', 'weekly-hours-to-hit-income-goal'],
    seoTitle: 'Effective Hourly Rate After Admin Time',
    seoDescription: 'Calculate your real hourly rate including unpaid admin and sales hours.',
  },
  {
    slug: 'raise-needed-to-keep-net',
    title: 'Raise needed to keep net',
    description: 'Gross increase required when your effective tax rate changes.',
    category: 'Take-home & tax toys',
    inputs: [
      { id: 'gross', label: 'Current gross', defaultValue: 80000, min: 0, step: 500, prefix: '$' },
      { id: 'oldRate', label: 'Current effective tax rate', defaultValue: 25, min: 0, max: 99.9, step: 0.1, suffix: '%' },
      { id: 'newRate', label: 'New effective tax rate', defaultValue: 30, min: 0, max: 99.9, step: 0.1, suffix: '%' },
    ],
    resultLabel: 'New gross to keep same net',
    resultFormat: 'currency',
    illustrative: true,
    explainer:
      'Keeps after-tax income constant when the effective rate rises: newGross = currentNet ÷ (1 − newRate). Illustrative only — not tax advice.',
    relatedSlugs: ['take-home-simple-percent', 'contractor-vs-employee-gross-rough', 'day-rate-from-salary'],
    seoTitle: 'Raise Needed to Keep Net Pay Calculator',
    seoDescription: 'Estimate the gross raise needed to preserve take-home when tax rates change. Not advice.',
  },
  {
    slug: 'savings-rate',
    title: 'Savings rate',
    description: 'What share of income you keep after expenses.',
    category: 'Cashflow & runway',
    inputs: [
      { id: 'income', label: 'Income (period)', defaultValue: 6000, min: 0.01, step: 50, prefix: '$' },
      { id: 'expenses', label: 'Expenses (same period)', defaultValue: 4200, min: 0, step: 50, prefix: '$' },
    ],
    resultLabel: 'Savings rate',
    resultFormat: 'percent',
    explainer:
      '(Income − expenses) ÷ income. A simple pulse check for how much of each dollar stays in your pocket. Pair with runway months for buffer planning.',
    relatedSlugs: ['runway-months', 'side-hustle-hourly-value', 'weekly-hours-to-hit-income-goal'],
    seoTitle: 'Personal Savings Rate Calculator',
    seoDescription: 'Calculate your savings rate from income and expenses for a period.',
  },
  {
    slug: 'side-hustle-hourly-value',
    title: 'Side hustle hourly value',
    description: 'Net profit per hour after costs for a side project.',
    category: 'Side hustle',
    inputs: [
      { id: 'revenue', label: 'Revenue', defaultValue: 1200, min: 0, step: 10, prefix: '$' },
      { id: 'costs', label: 'Costs / fees', defaultValue: 200, min: 0, step: 10, prefix: '$' },
      { id: 'hours', label: 'Hours invested', defaultValue: 20, min: 0.1, step: 0.5 },
    ],
    resultLabel: 'Net value per hour',
    resultFormat: 'currency',
    explainer:
      '(Revenue − costs) ÷ hours. Helps decide whether a side hustle beats overtime, or whether you should raise prices / cut hours.',
    relatedSlugs: ['effective-hourly-after-unpaid-admin', 'platform-fee-cut', 'savings-rate'],
    seoTitle: 'Side Hustle Hourly Value Calculator',
    seoDescription: 'Find net profit per hour for a side hustle after costs.',
  },
  {
    slug: 'gst-add-remove',
    title: 'GST add / remove (10% AU)',
    description: 'Add or remove Australian GST at 10% from a price.',
    category: 'Take-home & tax toys',
    inputs: [
      { id: 'amount', label: 'Amount', defaultValue: 1100, min: 0, step: 1, prefix: '$' },
      {
        id: 'mode',
        label: 'Mode (1 = add GST, 0 = remove GST)',
        defaultValue: 1,
        min: 0,
        max: 1,
        step: 1,
        help: 'Enter 1 to add 10% GST, or 0 to remove GST from a GST-inclusive price.',
      },
    ],
    resultLabel: 'Result amount',
    resultFormat: 'currency',
    illustrative: true,
    explainer:
      'Australian GST is 10%. Add: amount × 1.10. Remove from inclusive price: amount ÷ 1.10. Illustrative helper for quotes — confirm with your accountant or ATO guidance.',
    relatedSlugs: ['platform-fee-cut', 'invoice-late-fee', 'take-home-simple-percent'],
    seoTitle: 'Australian GST 10% Add or Remove Calculator',
    seoDescription: 'Add or remove 10% Australian GST from a price. Illustrative only.',
  },
  {
    slug: 'currency-markup-on-quote',
    title: 'Currency markup on quote',
    description: 'Convert a base quote with FX rate and a currency risk markup.',
    category: 'Rates & pricing',
    inputs: [
      { id: 'base', label: 'Base quote (home currency)', defaultValue: 2000, min: 0, step: 10, prefix: '$' },
      { id: 'fx', label: 'FX rate (client currency per 1 home)', defaultValue: 0.65, min: 0.0001, step: 0.0001 },
      { id: 'markup', label: 'Currency / risk markup', defaultValue: 3, min: 0, max: 50, step: 0.1, suffix: '%' },
    ],
    resultLabel: 'Client-currency quote',
    resultFormat: 'number',
    resultPrefix: '',
    explainer:
      'Converts home-currency quote × FX rate, then applies a markup for FX volatility and conversion fees. Round sensibly for the client currency.',
    relatedSlugs: ['hourly-to-project-fee', 'platform-fee-cut', 'gst-add-remove'],
    seoTitle: 'Currency Markup Quote Calculator',
    seoDescription: 'Build a foreign-currency quote with FX conversion and risk markup.',
  },
  {
    slug: 'weekly-hours-to-hit-income-goal',
    title: 'Weekly hours to hit income goal',
    description: 'Hours per week needed at your rate to hit a monthly income goal.',
    category: 'Hours & productivity',
    inputs: [
      { id: 'goal', label: 'Monthly income goal', defaultValue: 6000, min: 0, step: 50, prefix: '$' },
      { id: 'rate', label: 'Hourly rate', defaultValue: 75, min: 0.01, step: 1, prefix: '$' },
      { id: 'weeks', label: 'Working weeks per month', defaultValue: 4.33, min: 1, max: 5, step: 0.01, help: 'Average month ≈ 4.33 weeks.' },
    ],
    resultLabel: 'Hours needed per week',
    resultFormat: 'hours',
    explainer:
      'Monthly goal ÷ rate ÷ weeks. If hours look unrealistic, raise your rate or lower the goal before burning out.',
    relatedSlugs: ['break-even-hourly', 'day-rate-from-salary', 'effective-hourly-after-unpaid-admin'],
    seoTitle: 'Weekly Hours to Hit Income Goal',
    seoDescription: 'Calculate billable hours per week needed to reach a monthly income goal.',
  },
  {
    slug: 'contractor-vs-employee-gross-rough',
    title: 'Contractor vs employee (rough)',
    description: 'Rough contractor day/annual gross to match an employee package.',
    category: 'Take-home & tax toys',
    inputs: [
      { id: 'salary', label: 'Employee salary + benefits value', defaultValue: 85000, min: 0, step: 500, prefix: '$', help: 'Include rough value of leave, super/pension match, etc.' },
      { id: 'overhead', label: 'Contractor overhead / risk buffer', defaultValue: 30, min: 0, max: 100, step: 1, suffix: '%', help: 'Covers unpaid leave, equipment, insurance, downtime.' },
      { id: 'days', label: 'Billable days / year', defaultValue: 210, min: 1, max: 365, step: 1 },
    ],
    resultLabel: 'Rough contractor day rate',
    resultFormat: 'currency',
    illustrative: true,
    explainer:
      'Scales the employee package by an overhead buffer, then divides by billable days. Very rough — ignores progressive tax differences and benefits nuance. Not advice.',
    relatedSlugs: ['day-rate-from-salary', 'take-home-simple-percent', 'raise-needed-to-keep-net'],
    seoTitle: 'Contractor vs Employee Gross Comparison (Rough)',
    seoDescription: 'Rough estimate of contractor day rate to match an employee package. Illustrative only.',
  },
  {
    slug: 'retainer-to-hourly-equivalent',
    title: 'Retainer to hourly equivalent',
    description: 'What a monthly retainer works out to per hour at expected load.',
    category: 'Rates & pricing',
    inputs: [
      { id: 'retainer', label: 'Monthly retainer', defaultValue: 3000, min: 0, step: 50, prefix: '$' },
      { id: 'hours', label: 'Expected hours / month', defaultValue: 25, min: 0.1, step: 0.5 },
    ],
    resultLabel: 'Equivalent hourly',
    resultFormat: 'currency',
    explainer:
      'Retainer ÷ expected hours. Cap scope in the contract so “expected” does not silently become unpaid overtime.',
    relatedSlugs: ['hourly-to-project-fee', 'effective-hourly-after-unpaid-admin', 'break-even-hourly'],
    seoTitle: 'Retainer to Hourly Equivalent Calculator',
    seoDescription: 'Convert a monthly retainer into an equivalent hourly rate.',
  },
  {
    slug: 'profit-margin-on-job',
    title: 'Profit margin on a job',
    description: 'Margin after direct costs on a single project.',
    category: 'Side hustle',
    inputs: [
      { id: 'revenue', label: 'Job revenue', defaultValue: 4000, min: 0, step: 10, prefix: '$' },
      { id: 'costs', label: 'Direct costs', defaultValue: 1200, min: 0, step: 10, prefix: '$' },
    ],
    resultLabel: 'Profit margin',
    resultFormat: 'percent',
    explainer:
      'Profit ÷ revenue. Direct costs might include contractors, stock, ads, or paid tools for that job. Fixed overhead is usually tracked separately.',
    relatedSlugs: ['side-hustle-hourly-value', 'platform-fee-cut', 'savings-rate'],
    seoTitle: 'Job Profit Margin Calculator',
    seoDescription: 'Calculate profit margin on a freelance or side-hustle job after direct costs.',
  },
];

export function getCalculator(slug: string): Calculator | undefined {
  return calculators.find((c) => c.slug === slug);
}

export function getCalculatorsByCategory(): { category: string; items: Calculator[] }[] {
  const map = new Map<string, Calculator[]>();
  for (const calc of calculators) {
    const list = map.get(calc.category) ?? [];
    list.push(calc);
    map.set(calc.category, list);
  }
  const ordered = CATEGORY_ORDER.filter((c) => map.has(c)).map((category) => ({
    category,
    items: map.get(category)!,
  }));
  for (const [category, items] of map) {
    if (!CATEGORY_ORDER.includes(category as (typeof CATEGORY_ORDER)[number])) {
      ordered.push({ category, items });
    }
  }
  return ordered;
}

export function getRelated(calc: Calculator): Calculator[] {
  return calc.relatedSlugs
    .map((s) => getCalculator(s))
    .filter((c): c is Calculator => Boolean(c));
}
