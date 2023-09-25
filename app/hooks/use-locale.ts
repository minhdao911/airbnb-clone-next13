import { LocaleTypes, fallbackLng, locales } from "@/i18n/settings";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { create } from "zustand";

interface LocaleStore {
  locale: LocaleTypes;
  onChange: (value: string) => void;
}

export const useLocaleStore = create<LocaleStore>((set) => ({
  locale: "en",
  onChange: (value) => set({ locale: value }),
}));

const useLocale = () => {
  const { locale, onChange } = useLocaleStore();

  const pathname = usePathname();

  const getLocaleFromPathName = (pathname: string) =>
    locales.find((l) => l === pathname.split("/")[1]);

  useEffect(() => {
    if (pathname) {
      const localeFromPathname = getLocaleFromPathName(pathname);
      if (localeFromPathname) {
        if (locale !== localeFromPathname) {
          onChange(localeFromPathname);
        }
      } else {
        if (locale !== fallbackLng) {
          onChange(fallbackLng);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return { locale, onChange };
};

export default useLocale;
