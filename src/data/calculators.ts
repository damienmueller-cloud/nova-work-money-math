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
    relatedSlugs: ['hourly-to-project-fee', 'vacation-buffer-day-rate', 'weekly-hours-to-hit-income-goal'],
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
    relatedSlugs: ['listed-rate-after-platform-fee', 'hourly-to-project-fee', 'take-home-simple-percent'],
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
    relatedSlugs: ['raise-needed-to-keep-net', 'tax-set-aside-percent', 'gst-add-remove'],
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
    relatedSlugs: ['day-rate-from-salary', 'monthly-to-hourly-rate', 'runway-months'],
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
    relatedSlugs: ['payment-terms-cash-gap', 'client-concentration-risk', 'break-even-hourly'],
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
    relatedSlugs: ['platform-fee-cut', 'net-30-cash-cost', 'hourly-to-project-fee'],
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
    relatedSlugs: ['hours-freed-by-rate-raise', 'annual-income-from-weekly-hours', 'break-even-hourly'],
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
    relatedSlugs: ['side-hustle-hourly-value', 'platform-fee-cut', 'discount-hit-on-fee'],
    seoTitle: 'Job Profit Margin Calculator',
    seoDescription: 'Calculate profit margin on a freelance or side-hustle job after direct costs.',
  },
  {
    slug: 'listed-rate-after-platform-fee',
    title: 'Listed rate after platform fee',
    description: 'What to list so you still net your target after a marketplace fee.',
    category: 'Invoicing & fees',
    inputs: [
      { id: 'target', label: 'Target amount you want to receive', defaultValue: 800, min: 0.01, step: 10, prefix: '$' },
      { id: 'feePercent', label: 'Platform fee', defaultValue: 20, min: 0, max: 99.9, step: 0.1, suffix: '%' },
    ],
    resultLabel: 'List / quote this amount',
    resultFormat: 'currency',
    explainer:
      'listed = target ÷ (1 − fee%). Common when Upwork, Fiverr, or similar take a cut and you still need a specific net. Pair with platform-fee-cut to sanity-check.',
    relatedSlugs: ['platform-fee-cut', 'hourly-to-project-fee', 'take-home-simple-percent'],
    seoTitle: 'Listed Rate After Platform Fee Calculator',
    seoDescription: 'Find the freelance list price that still nets your target after a platform fee percentage.',
  },
  {
    slug: 'payment-terms-cash-gap',
    title: 'Payment terms cash gap',
    description: 'How much invoice cash sits unpaid under Net-X terms.',
    category: 'Cashflow & runway',
    inputs: [
      { id: 'monthlyBilling', label: 'Average monthly billing', defaultValue: 8000, min: 0, step: 50, prefix: '$' },
      { id: 'termsDays', label: 'Payment terms (days)', defaultValue: 30, min: 0, step: 1, help: 'Net-15 = 15, Net-30 = 30, etc.' },
    ],
    resultLabel: 'Cash typically outstanding',
    resultFormat: 'currency',
    explainer:
      'Rough working-capital stuck in receivables: monthly billing × (terms days ÷ 30). Shorter terms or deposits shrink the gap; Net-60 roughly doubles Net-30 exposure.',
    relatedSlugs: ['runway-months', 'invoice-late-fee', 'invoice-tax-set-aside'],
    seoTitle: 'Payment Terms Cash Gap Calculator',
    seoDescription: 'Estimate freelancing cash tied up in unpaid invoices under Net-X payment terms.',
  },
  {
    slug: 'annual-income-from-weekly-hours',
    title: 'Annual income from weekly hours',
    description: 'Project yearly gross from weekly billable hours and hourly rate.',
    category: 'Hours & productivity',
    inputs: [
      { id: 'hours', label: 'Billable hours / week', defaultValue: 25, min: 0, step: 0.5 },
      { id: 'rate', label: 'Hourly rate', defaultValue: 90, min: 0, step: 1, prefix: '$' },
      { id: 'weeks', label: 'Working weeks / year', defaultValue: 46, min: 1, max: 52, step: 1, help: 'Leave room for holidays and sick days (~46 is common).' },
    ],
    resultLabel: 'Projected annual gross',
    resultFormat: 'currency',
    explainer:
      'hours × rate × weeks. Use realistic billable hours and weeks off. Compare to day-rate-from-salary if you are pricing from a salary target instead.',
    relatedSlugs: ['weekly-hours-to-hit-income-goal', 'day-rate-from-salary', 'break-even-hourly'],
    seoTitle: 'Annual Income from Weekly Billable Hours',
    seoDescription: 'Estimate yearly freelance income from weekly hours, hourly rate, and working weeks.',
  },
  {
    slug: 'discount-hit-on-fee',
    title: 'Discount hit on a fee',
    description: 'See the dollar and percent impact of offering a client discount.',
    category: 'Rates & pricing',
    inputs: [
      { id: 'fee', label: 'Original fee', defaultValue: 3000, min: 0, step: 10, prefix: '$' },
      { id: 'discount', label: 'Discount', defaultValue: 10, min: 0, max: 100, step: 0.5, suffix: '%' },
    ],
    resultLabel: 'Discounted fee',
    resultFormat: 'currency',
    explainer:
      'Shows the discounted total and how many dollars you give away. A “small” 10% cut on a fixed fee is permanent revenue lost unless you reclaim scope or volume.',
    relatedSlugs: ['profit-margin-on-job', 'hourly-to-project-fee', 'retainer-to-hourly-equivalent'],
    seoTitle: 'Client Discount Impact Calculator',
    seoDescription: 'Calculate how a percentage discount changes your freelance project fee.',
  },
  {
    slug: 'invoice-tax-set-aside',
    title: 'Invoice tax set-aside',
    description: 'How much of each invoice to park for tax at your effective rate.',
    category: 'Take-home & tax toys',
    inputs: [
      { id: 'invoice', label: 'Invoice amount (ex GST if separate)', defaultValue: 2200, min: 0, step: 10, prefix: '$' },
      { id: 'rate', label: 'Set-aside rate', defaultValue: 30, min: 0, max: 100, step: 0.5, suffix: '%', help: 'Many freelancers use 25–40% as a planning buffer.' },
    ],
    resultLabel: 'Amount to set aside',
    resultFormat: 'currency',
    illustrative: true,
    explainer:
      'invoice × set-aside %. Transfer that amount to a tax savings account when paid. Illustrative planning toy — not tax advice; actual liability depends on deductions, brackets, and jurisdiction.',
    relatedSlugs: ['take-home-simple-percent', 'gst-add-remove', 'payment-terms-cash-gap'],
    seoTitle: 'Freelance Invoice Tax Set-Aside Calculator',
    seoDescription: 'Estimate how much of each freelance invoice to set aside for tax. Illustrative only.',
  },
  {
    slug: 'hours-freed-by-rate-raise',
    title: 'Hours freed by a rate raise',
    description: 'How many weekly hours you can drop after raising your rate and keep the same income.',
    category: 'Hours & productivity',
    inputs: [
      { id: 'goal', label: 'Weekly income to keep', defaultValue: 2000, min: 0.01, step: 25, prefix: '$' },
      { id: 'oldRate', label: 'Current hourly rate', defaultValue: 80, min: 0.01, step: 1, prefix: '$' },
      { id: 'newRate', label: 'New hourly rate', defaultValue: 100, min: 0.01, step: 1, prefix: '$' },
    ],
    resultLabel: 'Hours freed per week',
    resultFormat: 'hours',
    explainer:
      'oldHours = goal ÷ oldRate; newHours = goal ÷ newRate; freed = old − new. Raising rates is often the cleanest way to buy back time without cutting income.',
    relatedSlugs: ['weekly-hours-to-hit-income-goal', 'effective-hourly-after-unpaid-admin', 'break-even-hourly'],
    seoTitle: 'Hours Freed by Raising Your Freelance Rate',
    seoDescription: 'See how many weekly billable hours a rate increase frees while keeping the same income.',
  },

  {
    slug: 'monthly-to-hourly-rate',
    title: 'Monthly to hourly rate',
    description: 'Turn a monthly income goal and billable hours into an hourly rate.',
    category: 'Rates & pricing',
    inputs: [
      { id: 'monthly', label: 'Monthly income goal', defaultValue: 6000, min: 0, step: 50, prefix: '$' },
      { id: 'hours', label: 'Billable hours / month', defaultValue: 80, min: 0.1, step: 1 },
    ],
    resultLabel: 'Hourly rate needed',
    resultFormat: 'currency',
    explainer:
      'Monthly goal ÷ billable hours. Use realistic billable hours (not every hour at the desk). Pair with break-even hourly if you also need to cover fixed costs.',
    relatedSlugs: ['break-even-hourly', 'weekly-hours-to-hit-income-goal', 'retainer-to-hourly-equivalent'],
    seoTitle: 'Monthly Income to Hourly Rate Calculator',
    seoDescription: 'Convert a monthly income goal and billable hours into the hourly rate you need.',
  },
  {
    slug: 'tax-set-aside-percent',
    title: 'Tax set-aside percent',
    description: 'How much of gross income to park at your chosen set-aside percentage.',
    category: 'Take-home & tax toys',
    inputs: [
      { id: 'gross', label: 'Gross income', defaultValue: 5000, min: 0, step: 50, prefix: '$' },
      { id: 'percent', label: 'Set-aside percentage', defaultValue: 30, min: 0, max: 100, step: 0.5, suffix: '%', help: 'Many freelancers plan with 25–40% as a buffer.' },
    ],
    resultLabel: 'Amount to set aside',
    resultFormat: 'currency',
    illustrative: true,
    explainer:
      'gross × set-aside %. Move that amount to a tax savings pot when paid. Illustrative planning toy — not tax advice; real liability depends on deductions, brackets, and jurisdiction.',
    relatedSlugs: ['take-home-simple-percent', 'invoice-tax-set-aside', 'gst-add-remove'],
    seoTitle: 'Tax Set-Aside Percentage Calculator',
    seoDescription: 'Estimate how much of gross income to set aside at a chosen percentage. Illustrative only — not tax advice.',
  },
  {
    slug: 'net-30-cash-cost',
    title: 'Net-30 cash cost',
    description: 'Opportunity cost of waiting on an invoice at your annual rate of return.',
    category: 'Invoicing & fees',
    inputs: [
      { id: 'amount', label: 'Invoice amount', defaultValue: 3000, min: 0, step: 10, prefix: '$' },
      { id: 'rate', label: 'Annual opportunity rate', defaultValue: 8, min: 0, max: 100, step: 0.1, suffix: '%', help: 'What that cash could earn elsewhere (e.g. savings / investment proxy).' },
      { id: 'days', label: 'Days delayed', defaultValue: 30, min: 0, step: 1 },
    ],
    resultLabel: 'Cost of waiting',
    resultFormat: 'currency',
    explainer:
      'amount × (annual rate ÷ 100) × (days ÷ 365). Shows the soft cost of Net-30 / slow pay versus getting paid today. Not a late fee — use invoice-late-fee for contract interest.',
    relatedSlugs: ['invoice-late-fee', 'payment-terms-cash-gap', 'runway-months'],
    seoTitle: 'Net-30 Invoice Cash Cost Calculator',
    seoDescription: 'Estimate the opportunity cost of waiting on Net-30 or delayed freelance invoices.',
  },
  {
    slug: 'vacation-buffer-day-rate',
    title: 'Vacation buffer day rate',
    description: 'Day rate that still hits your annual goal after unpaid leave days.',
    category: 'Rates & pricing',
    inputs: [
      { id: 'income', label: 'Annual income goal', defaultValue: 90000, min: 0, step: 1000, prefix: '$' },
      { id: 'leaveDays', label: 'Unpaid leave days', defaultValue: 20, min: 0, max: 364, step: 1 },
      { id: 'billableDays', label: 'Billable days if no leave', defaultValue: 220, min: 1, max: 365, step: 1, help: 'Working days available before subtracting leave.' },
    ],
    resultLabel: 'Adjusted day rate',
    resultFormat: 'currency',
    explainer:
      'income ÷ (billableDays − leaveDays). Prices leave into your rate so holidays do not silently cut annual income. Leave days must be less than available billable days.',
    relatedSlugs: ['day-rate-from-salary', 'contractor-vs-employee-gross-rough', 'break-even-hourly'],
    seoTitle: 'Vacation Buffer Day Rate Calculator',
    seoDescription: 'Adjust your freelance day rate so unpaid leave still leaves room for your annual income goal.',
  },
  {
    slug: 'client-concentration-risk',
    title: 'Client concentration risk',
    description: 'What share of revenue comes from your largest client.',
    category: 'Cashflow & runway',
    inputs: [
      { id: 'top', label: 'Top client revenue', defaultValue: 40000, min: 0, step: 100, prefix: '$' },
      { id: 'total', label: 'Total revenue (same period)', defaultValue: 100000, min: 0.01, step: 100, prefix: '$' },
    ],
    resultLabel: 'Concentration',
    resultFormat: 'percent',
    explainer:
      '100 × top client ÷ total revenue. High concentration (often flagged above ~30–40%) means one lost client can smash cashflow — diversify or keep a thicker runway.',
    relatedSlugs: ['runway-months', 'savings-rate', 'payment-terms-cash-gap'],
    seoTitle: 'Client Concentration Risk Calculator',
    seoDescription: 'Calculate what percentage of revenue comes from your top client to gauge concentration risk.',
  },
  {
    slug: 'hourly-from-day-rate',
    title: 'Hourly from day rate',
    description: 'Convert a day rate into an equivalent hourly rate for quotes and comparisons.',
    category: 'Rates & pricing',
    inputs: [
      { id: 'dayRate', label: 'Day rate', defaultValue: 750, min: 0, step: 10, prefix: '$' },
      { id: 'hours', label: 'Hours in a billable day', defaultValue: 7.5, min: 0.1, max: 24, step: 0.5, help: 'Many freelancers use 7–8 hours; some quote on 6.' },
    ],
    resultLabel: 'Equivalent hourly',
    resultFormat: 'currency',
    explainer:
      'Day rate ÷ hours in a billable day. Useful when a client asks for hourly, or when comparing retainers and platforms that price by the hour.',
    relatedSlugs: ['day-rate-from-salary', 'monthly-to-hourly-rate', 'retainer-to-hourly-equivalent'],
    seoTitle: 'Day Rate to Hourly Rate Calculator',
    seoDescription: 'Convert a freelance day rate into an equivalent hourly rate using hours in a billable day.',
  },
  {
    slug: 'billable-utilization',
    title: 'Billable utilization',
    description: 'What share of your worked hours were actually billable.',
    category: 'Hours & productivity',
    inputs: [
      { id: 'billable', label: 'Billable hours', defaultValue: 25, min: 0, step: 0.5 },
      { id: 'total', label: 'Total hours worked', defaultValue: 40, min: 0.01, step: 0.5, help: 'Include admin, sales, and unpaid work.' },
    ],
    resultLabel: 'Utilization',
    resultFormat: 'percent',
    explainer:
      '100 × billable ÷ total hours. Healthy freelance utilization often lands around 50–70% once sales and admin are honest. Low utilization means raise rates or cut unpaid work.',
    relatedSlugs: ['effective-hourly-after-unpaid-admin', 'hours-freed-by-rate-raise', 'weekly-hours-to-hit-income-goal'],
    seoTitle: 'Billable Utilization Rate Calculator',
    seoDescription: 'Calculate freelance billable utilization as billable hours divided by total hours worked.',
  },
  {
    slug: 'subcontractor-markup',
    title: 'Subcontractor markup',
    description: 'Price a client fee after marking up outsourced or subcontracted costs.',
    category: 'Rates & pricing',
    inputs: [
      { id: 'cost', label: 'Subcontractor / vendor cost', defaultValue: 2000, min: 0, step: 50, prefix: '$' },
      { id: 'markup', label: 'Markup', defaultValue: 25, min: 0, max: 500, step: 1, suffix: '%', help: 'Common agency markups sit around 15–40%.' },
    ],
    resultLabel: 'Client price',
    resultFormat: 'currency',
    explainer:
      'cost × (1 + markup %). Your margin is the markup amount — make sure it covers your coordination time, risk, and payment delays.',
    relatedSlugs: ['profit-margin-on-job', 'hourly-to-project-fee', 'discount-hit-on-fee'],
    seoTitle: 'Subcontractor Markup Calculator',
    seoDescription: 'Mark up a subcontractor or vendor cost to set the client price and your margin.',
  },
  {
    slug: 'breakeven-projects-per-month',
    title: 'Break-even projects / month',
    description: 'How many average projects you need each month to cover fixed costs.',
    category: 'Cashflow & runway',
    inputs: [
      { id: 'costs', label: 'Monthly fixed costs / draw', defaultValue: 5000, min: 0, step: 50, prefix: '$' },
      { id: 'avgFee', label: 'Average project fee (net)', defaultValue: 2500, min: 0.01, step: 50, prefix: '$', help: 'After platform fees if you sell on marketplaces.' },
    ],
    resultLabel: 'Projects needed',
    resultFormat: 'number',
    explainer:
      'Monthly costs ÷ average net project fee. Round up in real life — partial projects do not pay rent. Pair with runway months if pipeline is lumpy.',
    relatedSlugs: ['break-even-hourly', 'runway-months', 'profit-margin-on-job'],
    seoTitle: 'Break-Even Projects Per Month Calculator',
    seoDescription: 'Find how many average freelance projects you need each month to cover fixed costs.',
  },
  {
    slug: 'scope-creep-hours-cost',
    title: 'Scope creep hours cost',
    description: 'What unpaid extra hours are worth at your hourly rate.',
    category: 'Hours & productivity',
    inputs: [
      { id: 'hours', label: 'Extra unpaid hours', defaultValue: 8, min: 0, step: 0.5 },
      { id: 'rate', label: 'Hourly rate', defaultValue: 95, min: 0, step: 1, prefix: '$' },
    ],
    resultLabel: 'Value of creep',
    resultFormat: 'currency',
    explainer:
      'Extra hours × hourly rate. Use this number in change-order talks or to decide whether a “quick favour” is actually a discount you did not mean to give.',
    relatedSlugs: ['hourly-to-project-fee', 'discount-hit-on-fee', 'effective-hourly-after-unpaid-admin'],
    seoTitle: 'Scope Creep Cost Calculator',
    seoDescription: 'Estimate the dollar cost of unpaid scope-creep hours at your freelance hourly rate.',
  },
  {
    slug: 'rush-rate-premium',
    title: 'Rush rate premium',
    description: 'Mark up your hourly rate for rush, weekend, or overtime work.',
    category: 'Rates & pricing',
    inputs: [
      { id: 'base', label: 'Base hourly rate', defaultValue: 90, min: 0, step: 1, prefix: '$' },
      { id: 'premium', label: 'Rush / overtime premium', defaultValue: 50, min: 0, max: 500, step: 1, suffix: '%', help: 'Common rush premiums sit around 25–100%.' },
    ],
    resultLabel: 'Rush hourly rate',
    resultFormat: 'currency',
    explainer:
      'Base rate × (1 + premium %). Quote the rush rate before you start — clients rarely object once the calendar is already crushed.',
    relatedSlugs: ['hourly-to-project-fee', 'scope-creep-hours-cost', 'discount-hit-on-fee'],
    seoTitle: 'Rush Rate Premium Calculator',
    seoDescription: 'Calculate a freelance rush or overtime hourly rate from your base rate and a premium percentage.',
  },
  {
    slug: 'proposal-expected-value',
    title: 'Proposal expected value',
    description: 'Expected dollar value of writing a proposal given your win rate.',
    category: 'Side hustle',
    inputs: [
      { id: 'fee', label: 'Project fee if won', defaultValue: 4000, min: 0, step: 50, prefix: '$' },
      { id: 'winRate', label: 'Win rate', defaultValue: 25, min: 0, max: 100, step: 1, suffix: '%' },
      { id: 'hours', label: 'Hours to write proposal', defaultValue: 3, min: 0, step: 0.25, help: 'Include research and revisions.' },
    ],
    resultLabel: 'Expected value',
    resultFormat: 'currency',
    explainer:
      'Project fee × win rate. Compare that to hours spent pitching to decide whether a lead is worth chasing, or whether your proposal process needs to get shorter.',
    relatedSlugs: ['profit-margin-on-job', 'effective-hourly-after-unpaid-admin', 'breakeven-projects-per-month'],
    seoTitle: 'Proposal Expected Value Calculator',
    seoDescription: 'Estimate the expected value of a freelance proposal from project fee, win rate, and hours spent pitching.',
  },
  {
    slug: 'overhead-loaded-hourly',
    title: 'Overhead-loaded hourly',
    description: 'Add monthly business overhead onto your base hourly rate.',
    category: 'Rates & pricing',
    inputs: [
      { id: 'base', label: 'Base hourly rate', defaultValue: 80, min: 0, step: 1, prefix: '$' },
      { id: 'overhead', label: 'Monthly overhead', defaultValue: 800, min: 0, step: 25, prefix: '$', help: 'Software, insurance, coworking, accounting, etc.' },
      { id: 'hours', label: 'Billable hours / month', defaultValue: 80, min: 0.1, step: 1 },
    ],
    resultLabel: 'Loaded hourly rate',
    resultFormat: 'currency',
    explainer:
      'Base rate + (monthly overhead ÷ billable hours). Pricing only on labour leaves tools and admin unpaid — load them in so every hour funds the business.',
    relatedSlugs: ['break-even-hourly', 'monthly-to-hourly-rate', 'effective-hourly-after-unpaid-admin'],
    seoTitle: 'Overhead-Loaded Hourly Rate Calculator',
    seoDescription: 'Load monthly freelancing overhead onto your hourly rate using realistic billable hours.',
  },
  {
    slug: 'annual-from-day-rate',
    title: 'Annual income from day rate',
    description: 'Turn a day rate and billable days into an annual income estimate.',
    category: 'Rates & pricing',
    inputs: [
      { id: 'dayRate', label: 'Day rate', defaultValue: 750, min: 0, step: 10, prefix: '$' },
      { id: 'days', label: 'Billable days per year', defaultValue: 200, min: 0, max: 365, step: 1, help: 'After leave, sick days, and non-billable work.' },
    ],
    resultLabel: 'Annual income',
    resultFormat: 'currency',
    explainer:
      'Day rate × billable days. The reverse of day-rate-from-salary — useful when a client quotes a day rate and you want the yearly picture before saying yes.',
    relatedSlugs: ['day-rate-from-salary', 'hourly-from-day-rate', 'annual-income-from-weekly-hours'],
    seoTitle: 'Annual Income from Day Rate Calculator',
    seoDescription: 'Estimate annual freelance income from day rate and billable days per year.',
  },
  {
    slug: 'deposit-cash-cover',
    title: 'Deposit cash cover',
    description: 'How large a project deposit needs to be to cover early costs and first weeks of work.',
    category: 'Cashflow & runway',
    inputs: [
      { id: 'fee', label: 'Total project fee', defaultValue: 8000, min: 0.01, step: 50, prefix: '$' },
      { id: 'costs', label: 'Upfront costs + early labour', defaultValue: 2400, min: 0, step: 50, prefix: '$', help: 'Materials, subcontractors, and hours you will bill before the next invoice.' },
    ],
    resultLabel: 'Deposit needed',
    resultFormat: 'percent',
    explainer:
      '100 × (upfront costs ÷ project fee). Round up to a clean 30–50% deposit in real quotes so you are not financing the client’s project from your own cash.',
    relatedSlugs: ['payment-terms-cash-gap', 'net-30-cash-cost', 'runway-months'],
    seoTitle: 'Project Deposit Percentage Calculator',
    seoDescription: 'Find what percentage deposit covers your upfront costs and early labour on a freelance project.',
  },
  {
    slug: 'raise-vs-client-loss',
    title: 'Rate raise vs client loss',
    description: 'How much work you could lose after a rate rise and still earn the same.',
    category: 'Rates & pricing',
    inputs: [
      { id: 'rate', label: 'Current hourly rate', defaultValue: 80, min: 0, step: 1, prefix: '$' },
      { id: 'raise', label: 'Planned rate rise', defaultValue: 20, min: 0, max: 500, step: 1, suffix: '%' },
    ],
    resultLabel: 'Work you could lose and break even',
    resultFormat: 'percent',
    explainer:
      'Break-even loss = raise ÷ (1 + raise). A 20% rise means you can lose about 16.7% of billable hours and still earn the same, while freeing that time for better clients or rest.',
    relatedSlugs: ['hours-freed-by-rate-raise', 'raise-needed-to-keep-net', 'client-concentration-risk'],
    seoTitle: 'Rate Increase vs Client Loss Calculator',
    seoDescription: 'See what share of work you can lose after raising freelance rates and still earn the same.',
  },
  {
    slug: 'emergency-fund-target',
    title: 'Emergency fund target',
    description: 'Size a cash buffer from monthly essentials and see the gap to your current savings.',
    category: 'Cashflow & runway',
    inputs: [
      { id: 'essentials', label: 'Monthly essential costs', defaultValue: 3500, min: 0, step: 50, prefix: '$', help: 'Rent, food, insurance, minimum debt payments, core business costs.' },
      { id: 'months', label: 'Months of cover', defaultValue: 6, min: 0, max: 36, step: 1, help: 'Variable-income earners often aim for 3–6+ months.' },
      { id: 'saved', label: 'Already set aside', defaultValue: 8000, min: 0, step: 100, prefix: '$' },
    ],
    resultLabel: 'Emergency fund target',
    resultFormat: 'currency',
    explainer:
      'Monthly essentials × months of cover. The breakdown shows how far your current savings are from that target. Illustrative only, not financial advice.',
    relatedSlugs: ['runway-months', 'savings-rate', 'client-concentration-risk'],
    seoTitle: 'Emergency Fund Calculator for Freelancers',
    seoDescription: 'Work out an emergency fund target from monthly essentials and months of cover, plus the gap to your savings.',
    illustrative: true,
  },
  {
    slug: 'tool-subscription-payback',
    title: 'Tool subscription payback',
    description: 'Check if a paid tool pays for itself in hours saved each month.',
    category: 'Hours & productivity',
    inputs: [
      { id: 'cost', label: 'Monthly subscription cost', defaultValue: 30, min: 0, step: 1, prefix: '$' },
      { id: 'hoursSaved', label: 'Hours saved per month', defaultValue: 3, min: 0, step: 0.25 },
      { id: 'hourly', label: 'Your hourly rate', defaultValue: 75, min: 0, step: 1, prefix: '$', help: 'Use your billable rate if saved hours turn into paid work.' },
    ],
    resultLabel: 'Net monthly value',
    resultFormat: 'currency',
    explainer:
      '(Hours saved × hourly rate) − subscription cost. A negative result means the tool costs more than the time it frees. The breakdown shows the hours it must save just to break even.',
    relatedSlugs: ['effective-hourly-after-unpaid-admin', 'overhead-loaded-hourly', 'billable-utilization'],
    seoTitle: 'Software Subscription ROI Calculator',
    seoDescription: 'See whether a monthly tool subscription pays for itself in time saved at your hourly rate.',
  },
  {
    slug: 'side-hustle-goal-weeks',
    title: 'Side hustle goal timeline',
    description: 'How many weeks of side work it takes to reach a savings goal.',
    category: 'Side hustle',
    inputs: [
      { id: 'goal', label: 'Savings goal', defaultValue: 5000, min: 0, step: 100, prefix: '$' },
      { id: 'hourly', label: 'Net earnings per hour', defaultValue: 35, min: 0, step: 1, prefix: '$', help: 'After platform fees and costs.' },
      { id: 'hoursPerWeek', label: 'Hours per week', defaultValue: 8, min: 0, step: 0.5 },
    ],
    resultLabel: 'Weeks to goal',
    resultFormat: 'number',
    resultSuffix: ' weeks',
    explainer:
      'Goal ÷ (net hourly × hours per week). Use what you actually keep per hour, not the listed price, so the timeline is honest.',
    relatedSlugs: ['side-hustle-hourly-value', 'listed-rate-after-platform-fee', 'weekly-hours-to-hit-income-goal'],
    seoTitle: 'Side Hustle Savings Goal Calculator',
    seoDescription: 'Estimate how many weeks of side hustle work it takes to hit a savings goal.',
  },
  {
    slug: 'travel-time-cost',
    title: 'Travel time cost',
    description: 'What on-site travel really costs you in time and kilometres.',
    category: 'Rates & pricing',
    inputs: [
      { id: 'hours', label: 'Round-trip travel time', defaultValue: 1.5, min: 0, step: 0.25, suffix: 'hrs' },
      { id: 'hourly', label: 'Your hourly rate', defaultValue: 90, min: 0, step: 1, prefix: '$' },
      { id: 'km', label: 'Round-trip distance', defaultValue: 60, min: 0, step: 1, suffix: 'km' },
      { id: 'perKm', label: 'Running cost per km', defaultValue: 0.88, min: 0, step: 0.01, prefix: '$', help: 'Fuel, wear, insurance share. Use your own figure.' },
    ],
    resultLabel: 'Travel cost to cover',
    resultFormat: 'currency',
    explainer:
      '(Travel hours × hourly rate) + (km × running cost per km). Add this to an on-site quote or charge a call-out fee so travel does not quietly eat your margin.',
    relatedSlugs: ['hourly-to-project-fee', 'profit-margin-on-job', 'rush-rate-premium'],
    seoTitle: 'Travel Time Cost Calculator for Quotes',
    seoDescription: 'Add travel time and per-km running costs to on-site freelance and trade quotes.',
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
