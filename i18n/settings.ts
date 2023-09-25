import { InitOptions } from "i18next";

export const fallbackLng = "en";
export const locales = [fallbackLng, "vn"];
export const defaultNS = "common";

export type LocaleTypes = (typeof locales)[number];

export function getOptions(
  lang: string = fallbackLng,
  ns: string = defaultNS
): InitOptions {
  return {
    supportedLngs: locales,
    fallbackLng,
    lng: lang,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
