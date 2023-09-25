"use client";

import { FunctionComponent } from "react";
import Heading from "../heading";
import TextArea from "../inputs/textarea";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import useLocale from "@/app/hooks/use-locale";
import { useTranslation } from "@/i18n/client";

interface DescriptionStepProps {
  text: string;
  errors: FieldErrors;
  register: UseFormRegister<FieldValues>;
  onChange: () => void;
}

const DescriptionStep: FunctionComponent<DescriptionStepProps> = ({
  text,
  errors,
  register,
  onChange,
}) => {
  const { locale } = useLocale();
  const { t } = useTranslation(locale, "become-a-host");

  return (
    <div className="w-full h-screen flex flex-col justify-center gap-8">
      <Heading
        title={t("steps.description.title")}
        subtitle={t("steps.description.subtitle")}
        titleStyle={{
          fontSize: "2rem",
          lineHeight: "2rem",
        }}
      />
      <div>
        <TextArea
          id="description"
          value={text}
          wordLimit={500}
          rows={7}
          errors={errors}
          register={register}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
};

export default DescriptionStep;
