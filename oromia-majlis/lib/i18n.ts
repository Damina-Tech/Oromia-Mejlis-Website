export const LOCALE_COOKIE_NAME = "om_locale";

export const SUPPORTED_LOCALES = ["en", "om", "am", "ar"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: SupportedLocale = "en";

export function normalizeLocale(value: string | null | undefined): SupportedLocale {
  if (!value) return DEFAULT_LOCALE;
  const lowered = value.toLowerCase();
  return (SUPPORTED_LOCALES as readonly string[]).includes(lowered)
    ? (lowered as SupportedLocale)
    : DEFAULT_LOCALE;
}

export function localeToDir(locale: SupportedLocale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

