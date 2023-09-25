"use client";

import { FunctionComponent } from "react";
import Heading from "../heading";
import Map from "../map/map";
import { LocationData } from "@/app/types";
import useLocale from "@/app/hooks/use-locale";
import { useTranslation } from "@/i18n/client";

interface LocationStepProps {
  location: LocationData;
  setValue: (value: any) => void;
}

const LocationStep: FunctionComponent<LocationStepProps> = ({
  location,
  setValue,
}) => {
  const { locale } = useLocale();
  const { t } = useTranslation(locale, "become-a-host");

  return (
    <>
      <Heading
        title={t("steps.location.title")}
        subtitle={t("steps.location.subtitle")}
        titleStyle={{
          fontSize: "2rem",
          lineHeight: "2rem",
        }}
      />
      <Map location={location} setValue={setValue} />
    </>
  );
};

export default LocationStep;
