// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://damienmueller-cloud.github.io',
  base: '/nova-work-money-math/',
  integrations: [sitemap()],
});
