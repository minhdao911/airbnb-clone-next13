import i18next, { i18n } from "i18next";
import {
  initReactI18next,
  useTranslation as useTransAlias,
} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import { LocaleTypes, getOptions, locales } from "./settings";
import { useEffect, useState } from "react";

const runsOnServerSide = typeof window === "undefined";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: LocaleTypes, namespace: string) =>
        import(`./locales/${language}/${namespace}.json`)
    )
  )
  .init({
    ...getOptions(),
    lng: undefined,
    detection: {
      order: ["path", "htmlTag"],
    },
    preload: runsOnServerSide ? locales : [],
  });

export function useTranslation(lng: LocaleTypes, ns: string) {
  const translator = useTransAlias(ns);
  const { i18n } = translator;

  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng);
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCustomTranslationImplem(i18n, lng);
  }
  return translator;
}

function useCustomTranslationImplem(i18n: i18n, lng: LocaleTypes) {
  const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage);

  // update the active language state variable when the resolved language changes
  useEffect(() => {
    if (activeLng === i18n.resolvedLanguage) return;
    setActiveLng(i18n.resolvedLanguage);
  }, [activeLng, i18n.resolvedLanguage]);

  // change the language of the application when the lng prop changes
  useEffect(() => {
    if (!lng || i18n.resolvedLanguage === lng) return;
    i18n.changeLanguage(lng);
  }, [lng, i18n]);
}
