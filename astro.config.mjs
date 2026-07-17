// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages project site: https://leandroszikora.github.io/lszp-portfolio
export default defineConfig({
  site: 'https://leandroszikora.github.io',
  base: '/lszp-portfolio',
  integrations: [sitemap()],
});
