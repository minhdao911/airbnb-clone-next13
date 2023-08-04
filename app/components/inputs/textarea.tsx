"use client";

import { FunctionComponent } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface TextAreaProps {
  id: string;
  value: string;
  wordLimit?: number;
  rows?: number;
  fontSize?: "xs" | "sm" | "base" | "lg" | "xl";
  disabled?: boolean;
  required?: boolean;
  errors: FieldErrors;
  register: UseFormRegister<FieldValues>;
  onChange?: (value: string) => void;
}

const TextArea: FunctionComponent<TextAreaProps> = ({
  id,
  value,
  wordLimit,
  rows = 4,
  fontSize = "lg",
  disabled,
  required,
  errors,
  register,
  onChange,
}) => {
  const registerProps = register(id, { required });

  return (
    <div className="w-full">
      <textarea
        id={id}
        disabled={disabled}
        {...registerProps}
        onChange={(e: any) => {
          registerProps.onChange(e);
          onChange && onChange(e.target.value);
        }}
        className={`w-full rounded-lg p-4 border resize-none focus:outline-none focus:border-2 text-${fontSize} ${
          errors[id] ? "border-rose-500" : "border-black"
        }`}
        rows={rows}
        value={value}
      />
      {wordLimit && (
        <p className="text-sm font-semibold mt-2 text-neutral-800">
          {value.length}/{wordLimit}
        </p>
      )}
    </div>
  );
};

export default TextArea;
