#!/usr/bin/env node
/**
 * Submit Work & Money Math URLs to IndexNow (Bing + partners).
 * Usage: node scripts/indexnow.mjs
 * Env override: INDEXNOW_KEY, SITE_ORIGIN
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const SITE = (process.env.SITE_ORIGIN || 'https://damienmueller-cloud.github.io/nova-work-money-math').replace(/\/$/, '');

function discoverKey() {
  if (process.env.INDEXNOW_KEY) return process.env.INDEXNOW_KEY;
  const pub = join(root, 'public');
  const files = readdirSync(pub).filter((f) => /^[a-f0-9]{8,128}\.txt$/i.test(f));
  if (!files.length) throw new Error('No IndexNow key file in public/');
  const name = files[0];
  const key = readFileSync(join(pub, name), 'utf8').trim();
  if (key !== name.replace(/\.txt$/i, '')) {
    console.warn('Warning: key file name does not match contents; using file contents');
  }
  return key;
}

function collectUrls() {
  const urls = new Set([`${SITE}/`, `${SITE}/about/`, `${SITE}/privacy/`]);
  // Prefer built sitemap if present
  const sm = join(root, 'dist', 'sitemap-0.xml');
  if (existsSync(sm)) {
    const xml = readFileSync(sm, 'utf8');
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) urls.add(m[1].replace(/\/?$/, '/') === m[1] + '/' || m[1].endsWith('/') ? m[1] : m[1].endsWith('.xml') ? m[1] : m[1] + (m[1].includes('.') ? '' : '/'));
    // normalize: keep as in sitemap
    urls.clear();
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) urls.add(m[1]);
  } else {
    // Fallback: parse calculators.ts
    const src = readFileSync(join(root, 'src/data/calculators.ts'), 'utf8');
    for (const m of src.matchAll(/slug:\s*'([^']+)'/g)) {
      urls.add(`${SITE}/c/${m[1]}/`);
    }
  }
  return [...urls];
}

async function main() {
  const key = discoverKey();
  const keyLocation = `${SITE}/${key}.txt`;
  const urlList = collectUrls();
  const host = new URL(SITE).host;

  const body = {
    host,
    key,
    keyLocation,
    urlList,
  };

  console.log(JSON.stringify({ host, keyLocation, urlCount: urlList.length, sample: urlList.slice(0, 5) }, null, 2));

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  console.log('IndexNow status:', res.status);
  console.log('IndexNow body:', text || '(empty)');
  // Also try Bing endpoint (same protocol)
  const res2 = await fetch('https://www.bing.com/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });
  const text2 = await res2.text();
  console.log('Bing IndexNow status:', res2.status);
  console.log('Bing IndexNow body:', text2 || '(empty)');

  if (res.status !== 200 && res.status !== 202) {
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
