"use client";

import { FunctionComponent } from "react";
import Heading from "../heading";
import TextArea from "../inputs/textarea";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface TitleStepProps {
  title: string;
  errors: FieldErrors;
  register: UseFormRegister<FieldValues>;
  onChange: () => void;
}

const TitleStep: FunctionComponent<TitleStepProps> = ({
  title,
  errors,
  register,
  onChange,
}) => {
  return (
    <div className="w-full h-screen flex flex-col justify-center gap-8">
      <Heading
        title="Now, let's give your apartment a title"
        subtitle="Short titles work best. Have fun with it—you can always change it later."
        titleStyle={{
          fontSize: "2rem",
          lineHeight: "2rem",
        }}
      />
      <div>
        <TextArea
          id="title"
          value={title}
          wordLimit={32}
          errors={errors}
          register={register}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
};

export default TitleStep;
