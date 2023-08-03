"use client";

import { FunctionComponent } from "react";

interface TextAreaProps {
  value: string;
  wordLimit?: number;
  rows?: number;
  fontSize?: "xs" | "sm" | "base" | "lg" | "xl";
  onChange: (value: string) => void;
}

const TextArea: FunctionComponent<TextAreaProps> = ({
  value,
  wordLimit,
  rows = 4,
  fontSize = "lg",
  onChange,
}) => {
  return (
    <div className="w-full">
      <textarea
        className={`w-full border border-black rounded-lg p-4 resize-none focus:outline-none focus:border-2 text-${fontSize}`}
        rows={rows}
        value={value}
        onChange={(e: any) => {
          onChange(e.target.value);
        }}
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
