"use client";

import { FunctionComponent } from "react";
import Heading from "../heading";
import TextArea from "../inputs/textarea";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

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
  return (
    <div className="w-full h-screen flex flex-col justify-center gap-8">
      <Heading
        title="Next, let's describe your apartment"
        subtitle="Share what makes your place special."
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
