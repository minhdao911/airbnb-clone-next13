"use client";

import { FunctionComponent } from "react";
import Heading from "../heading";
import { DEFAULT_CURRENCY } from "@/constants";
import useLocale from "@/app/hooks/use-locale";
import { useTranslation } from "@/i18n/client";

interface PriceStepProps {
  price: string;
  setValue: (value: any) => void;
}

const PriceStep: FunctionComponent<PriceStepProps> = ({ price, setValue }) => {
  const id = "price";

  const { locale } = useLocale();
  const { t } = useTranslation(locale, "become-a-host");

  return (
    <div className="w-full h-screen flex flex-col justify-center gap-8">
      <Heading
        title={t("steps.price.title")}
        subtitle={t("steps.price.subtitle")}
        titleStyle={{
          fontSize: "2rem",
          lineHeight: "2rem",
        }}
      />
      <div className="flex items-center justify-center p-10 border border-neutral-500 rounded-lg text-3xl">
        <input
          id={id}
          className={`w-full focus:outline-none text-center font-semibold`}
          style={{ fontSize: "2.5rem" }}
          type="text"
          inputMode="numeric"
          onChange={(e: any) => {
            const { value } = e.target;
            const number = value.replace(/\D+/g, "");
            setValue(Number(number));
          }}
          value={`${DEFAULT_CURRENCY}${price}`}
        />
      </div>
    </div>
  );
};

export default PriceStep;
