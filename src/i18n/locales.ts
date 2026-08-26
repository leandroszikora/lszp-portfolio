/* ============================================================
   Locale table — the single source of truth for "which languages
   does this site ship". Adding a locale means: one row here, one
   `src/data/<code>/` folder, one `src/pages/<code>/index.astro`,
   one entry in the sitemap i18n config. Nothing else hardcodes N.

   `label` / `title` live here on purpose and NOT in `ui.json`: the
   name of a language is always written in that language (a11y
   convention), so it is the same string on every page and is never
   translated per-locale. Only the *group* label of the switcher
   ("Language" / "Idioma") is localized, and that one is in ui.json.
   ============================================================ */

export const LOCALES = {
  en: { path: "/", ogLocale: "en_US", label: "EN", title: "English version" },
  es: { path: "/es/", ogLocale: "es_ES", label: "ES", title: "Versión en español" },
  ca: { path: "/ca/", ogLocale: "ca_ES", label: "CA", title: "Versió en català" },
} as const;

export type Locale = keyof typeof LOCALES;

export const DEFAULT_LOCALE: Locale = "en";

/** Declaration order of the table: EN, ES, CA. */
export const LOCALE_CODES = Object.keys(LOCALES) as Locale[];

/* ------------------------------------------------------------
   URL helpers. `import.meta.env.BASE_URL` may or may not carry a
   trailing slash depending on config; normalize once here so joins
   never produce "//" or a missing "/". The site is served from the
   apex domain today (base === ""), but going through these keeps a
   subpath deploy a one-line config change.
   ------------------------------------------------------------ */

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

/** Site-relative URL for a file in `public/` (e.g. "og-image.png"). */
export const asset = (path: string): string =>
  `${base}/${path.replace(/^\//, "")}`;

/** Site-relative href for a locale's home page. */
export const localeHref = (locale: Locale): string =>
  `${base}${LOCALES[locale].path}`;

/** Absolute URL for a locale — canonical, hreflang, Open Graph. */
export const localeAbsUrl = (
  locale: Locale,
  site: URL | string | undefined
): string => `${site?.toString().replace(/\/$/, "") ?? ""}${localeHref(locale)}`;

/** Absolute URL for a `public/` asset — Open Graph image, etc. */
export const absAsset = (path: string, site: URL | string | undefined): string =>
  `${site?.toString().replace(/\/$/, "") ?? ""}${asset(path)}`;

export interface LocaleLink {
  code: Locale;
  href: string;
  label: string;
  title: string;
  current: boolean;
}

/** One entry per locale, in declaration order, for the nav switcher. */
export const localeLinks = (current: Locale): LocaleLink[] =>
  LOCALE_CODES.map((code) => ({
    code,
    href: localeHref(code),
    label: LOCALES[code].label,
    title: LOCALES[code].title,
    current: code === current,
  }));
