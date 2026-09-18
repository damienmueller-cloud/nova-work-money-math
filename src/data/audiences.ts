import { calculators, getCalculator, type Calculator } from './calculators';

export type AudienceHub = {
  slug: string;
  path: string;
  title: string;
  headline: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  /** Prefer these slugs; missing ones are skipped safely */
  featuredSlugs: string[];
};

export const audienceHubs: AudienceHub[] = [
  {
    slug: 'freelancers',
    path: '/for/freelancers',
    title: 'For freelancers',
    headline: 'Calculators freelancers actually open',
    description:
      'Day rates, project fees, platform cuts, unpaid admin, and cash timing — practical math for solo freelancers who bill for work.',
    seoTitle: 'Freelance Calculators — Rates, Fees & Cashflow',
    seoDescription:
      'Free freelance calculators for day rates, project fees, platform fees, runway, and illustrative take-home toys. Client-side, no accounts.',
    featuredSlugs: [
      'day-rate-from-salary',
      'hourly-to-project-fee',
      'vacation-buffer-day-rate',
      'monthly-to-hourly-rate',
      'platform-fee-cut',
      'listed-rate-after-platform-fee',
      'effective-hourly-after-unpaid-admin',
      'payment-terms-cash-gap',
      'net-30-cash-cost',
      'invoice-late-fee',
      'runway-months',
      'client-concentration-risk',
      'retainer-to-hourly-equivalent',
      'discount-hit-on-fee',
    ],
  },
  {
    slug: 'side-hustlers',
    path: '/for/side-hustlers',
    title: 'For side hustlers',
    headline: 'Side-hustle money math without the fluff',
    description:
      'Is the evening gig worth it? Net hourly value, profit margin, hours to hit a goal, and simple savings rate — all in your browser.',
    seoTitle: 'Side Hustle Calculators — Hourly Value & Profit',
    seoDescription:
      'Free side-hustle calculators for hourly value, job profit margin, weekly hours to income goal, and savings rate. No sign-up.',
    featuredSlugs: [
      'side-hustle-hourly-value',
      'profit-margin-on-job',
      'weekly-hours-to-hit-income-goal',
      'annual-income-from-weekly-hours',
      'hours-freed-by-rate-raise',
      'savings-rate',
      'break-even-hourly',
      'take-home-simple-percent',
      'tax-set-aside-percent',
      'platform-fee-cut',
      'runway-months',
    ],
  },
  {
    slug: 'consultants',
    path: '/for/consultants',
    title: 'For consultants',
    headline: 'Consulting rate & retainer math',
    description:
      'Convert salary targets to day rates, price retainers, buffer vacation, and check concentration risk when one client dominates the book.',
    seoTitle: 'Consultant Calculators — Day Rate, Retainer & Risk',
    seoDescription:
      'Free consultant calculators for day rates, retainers, vacation buffers, payment terms, and client concentration risk.',
    featuredSlugs: [
      'day-rate-from-salary',
      'retainer-to-hourly-equivalent',
      'vacation-buffer-day-rate',
      'contractor-vs-employee-gross-rough',
      'currency-markup-on-quote',
      'payment-terms-cash-gap',
      'net-30-cash-cost',
      'client-concentration-risk',
      'invoice-tax-set-aside',
      'raise-needed-to-keep-net',
      'hours-freed-by-rate-raise',
      'discount-hit-on-fee',
    ],
  },
];

export const auHub = {
  path: '/au/freelance-calculators',
  title: 'AU freelance calculators',
  headline: 'Freelance calculators with an Australia-friendly lens',
  description:
      'GST add/remove at 10%, rate and cashflow tools freelancers in Australia search for — still illustrative estimates, not tax advice. Currency fields are generic; GST helper is AU-specific.',
  seoTitle: 'Australia Freelance Calculators — GST, Rates & Cashflow',
  seoDescription:
      'Free Australia-oriented freelance calculators including 10% GST add/remove, day rates, tax set-aside toys, and cashflow helpers.',
  featuredSlugs: [
    'gst-add-remove',
    'day-rate-from-salary',
    'monthly-to-hourly-rate',
    'invoice-tax-set-aside',
    'tax-set-aside-percent',
    'take-home-simple-percent',
    'contractor-vs-employee-gross-rough',
    'invoice-late-fee',
    'payment-terms-cash-gap',
    'net-30-cash-cost',
    'runway-months',
    'savings-rate',
    'currency-markup-on-quote',
  ],
} as const;

export function resolveFeatured(slugs: readonly string[]): Calculator[] {
  return slugs
    .map((slug) => getCalculator(slug))
    .filter((c): c is Calculator => Boolean(c));
}

export function allHubLinks() {
  return [
    ...audienceHubs.map((h) => ({ href: h.path, label: h.title, blurb: h.headline })),
    { href: auHub.path, label: auHub.title, blurb: auHub.headline },
  ];
}

/** Sanity: every featured slug exists in the calculator registry */
export function missingFeaturedSlugs(): string[] {
  const missing: string[] = [];
  for (const hub of audienceHubs) {
    for (const slug of hub.featuredSlugs) {
      if (!getCalculator(slug)) missing.push(`${hub.slug}:${slug}`);
    }
  }
  for (const slug of auHub.featuredSlugs) {
    if (!getCalculator(slug)) missing.push(`au:${slug}`);
  }
  return missing;
}

// Keep tree-shaking happy in case a page imports calculators length for meta
export const calculatorCount = calculators.length;
