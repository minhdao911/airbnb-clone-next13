import { createInstance, use } from "i18next";
import { LocaleTypes, getOptions } from "./settings";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

const initI18next = async (lang: LocaleTypes, ns: string) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: typeof ns) =>
          import(`./locales/${language}/${namespace}.json`)
      )
    )
    .init(getOptions(lang, ns));
  return i18nInstance;
};

export async function createTranslation(lang: LocaleTypes, ns: string) {
  const i18nextInstance = await initI18next(lang, ns);

  return {
    // This is the translation function will be used in components
    // e.g. t('greeting')
    t: i18nextInstance.getFixedT(lang, Array.isArray(ns) ? ns[0] : ns),
  };
}
