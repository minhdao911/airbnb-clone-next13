"use client";

import Modal from "./modal";
import useLanguageModal from "@/app/hooks/use-language-modal";
import { LocaleTypes, locales } from "@/i18n/settings";
import useLocale from "@/app/hooks/use-locale";
import { usePathname } from "next/navigation";
import { useRouter } from "next-nprogress-bar";

type LangData = {
  locale: LocaleTypes;
  language: string;
  region: string;
};

const supportedLanguages: LangData[] = [
  { locale: "en", language: "English", region: "United States" },
  { locale: "vn", language: "Tiếng Việt", region: "Việt Nam" },
];

const LanguageModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const langModal = useLanguageModal();
  const { locale } = useLocale();

  const bodyContent = (
    <div>
      <h2 className="text-xl font-semibold mb-5">
        Choose a language and region
      </h2>
      <div className="flex gap-4">
        {supportedLanguages.map((item, index) => (
          <LanguageItem
            key={index}
            {...item}
            selected={item.locale === locale}
            onClick={(value: string) => {
              if (pathname) {
                let url = "";
                const regex = new RegExp(
                  locales.map((l) => `(${l})`).join("|"),
                  "g"
                );
                if (regex.test(pathname)) {
                  url = pathname.replace(regex, value);
                } else {
                  url = `/${value}${pathname}`;
                }
                router.push(url);
              }
              langModal.onClose();
            }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <Modal
      title="Language and region"
      isOpen={langModal.isOpen}
      body={bodyContent}
      onClose={langModal.onClose}
    />
  );
};

export default LanguageModal;

interface LanguageItemProps {
  locale: string;
  language: string;
  region: string;
  selected: boolean;
  onClick: (value: string) => void;
}

const LanguageItem = ({
  locale,
  language,
  region,
  selected,
  onClick,
}: LanguageItemProps) => {
  return (
    <div
      className={`flex flex-col gap-0.5 w-48 p-3 font-light text-sm border rounded-lg hover:bg-gray-200/50 cursor-pointer ${
        selected ? "border-black" : "border-transparent"
      }`}
      onClick={() => onClick(locale)}
    >
      <p>{language}</p>
      <p className="text-gray-500">{region}</p>
    </div>
  );
};
