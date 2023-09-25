"use client";

import { FunctionComponent } from "react";
import Heading from "../heading";
import Counter from "../inputs/counter";
import useLocale from "@/app/hooks/use-locale";
import { useTranslation } from "@/i18n/client";

interface InfoStepProps {
  guestCount: number;
  bedroomCount: number;
  bedCount: number;
  bathroomCount: number;
  setValue: (id: string, value: any) => void;
}

const InfoStep: FunctionComponent<InfoStepProps> = ({
  guestCount,
  bedroomCount,
  bedCount,
  bathroomCount,
  setValue,
}) => {
  const { locale } = useLocale();
  const { t } = useTranslation(locale, "become-a-host");

  return (
    <>
      <Heading
        title={t("steps.info.title")}
        subtitle={t("steps.info.subtitle")}
        titleStyle={{
          fontSize: "2rem",
          lineHeight: "2rem",
        }}
      />
      <Counter
        value={guestCount}
        title={t("steps.info.fields.guests")}
        onChange={(value) => setValue("guestCount", value)}
      />
      <hr />
      <Counter
        value={bedroomCount}
        title={t("steps.info.fields.bedrooms")}
        onChange={(value) => setValue("bedroomCount", value)}
      />
      <hr />
      <Counter
        value={bedCount}
        title={t("steps.info.fields.beds")}
        onChange={(value) => setValue("bedCount", value)}
      />
      <hr />
      <Counter
        value={bathroomCount}
        title={t("steps.info.fields.bathrooms")}
        onChange={(value) => setValue("bathroomCount", value)}
      />
    </>
  );
};

export default InfoStep;
