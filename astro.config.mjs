// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Served from the apex custom domain on GitHub Pages, so the site lives at
// the root: no `base` subpath. `public/CNAME` is what pins the domain on
// every Actions deploy.
export default defineConfig({
  site: 'https://leandroszikora.dev',
  // i18n options make the sitemap emit <xhtml:link rel="alternate"> for every
  // locale of each page. Keep in sync with src/i18n/locales.ts.
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', es: 'es', ca: 'ca' },
      },
    }),
  ],
});
