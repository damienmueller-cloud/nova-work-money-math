# Work & Money Math

Free calculator hub for freelancers and side hustlers. Client-side only — no accounts, no paid APIs.

**Tone:** clean, calm, practical. Tax / take-home tools are labelled **illustrative estimates, not advice**.

## Local development

Requires **Node.js ≥ 22.12**.

```bash
cd nova-work-money-math
npm install
npm run dev
```

Preview production build:

```bash
npm run build
npm run preview
```

## Live site (GitHub Pages)

**URL:** https://damienmueller-cloud.github.io/nova-work-money-math/

| Item | Value |
|------|--------|
| Code branch | `main` |
| Site branch | `gh-pages` (contents of `dist/`) |
| `site` / `base` | set in `astro.config.mjs` for project Pages |

Redeploy: `npm run build`, then publish `dist/` to the `gh-pages` branch (see vault `plan.md`). Custom domain later is optional — not required for the free site to work.

## Project layout

- `src/data/calculators.ts` — single source of truth (metadata + inputs)
- `src/lib/compute.ts` — pure compute functions keyed by slug
- `src/lib/format.ts` — number formatting helpers
- `src/pages/c/[slug].astro` — calculator pages (SSG)
- `src/components/CalculatorWidget.astro` — instant recalc UI
- `public/robots.txt` — robots + sitemap pointer
- `@astrojs/sitemap` — generates sitemap at build time

## How to add a calculator

1. Add an entry to `calculators` in `src/data/calculators.ts` (`slug`, `title`, `description`, `category`, `inputs`, `resultLabel`, `resultFormat`, `explainer`, `relatedSlugs`, `seoTitle`, `seoDescription`, optional `illustrative: true`).
2. Add a matching function in `src/lib/compute.ts` under `computeMap[slug]`.
3. Run `npm run build` and open `/c/your-slug`.

Keep formulas documented in the explainer. Mark anything tax-like with `illustrative: true`.

## Content rules

- No financial, tax, or legal advice claims.
- Label take-home / GST / contractor comparisons as illustrative.
- Disclose affiliates when added.
- Prefer privacy-friendly analytics if/when analytics are added.
- Do not mix this project with other Damien brand repos.

## Stack

- Astro SSG (static `dist/`)
- TypeScript
- Vanilla CSS (light/dark via CSS + optional toggle)
