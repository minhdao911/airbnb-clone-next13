"use client";

import { FunctionComponent } from "react";
import Heading from "../heading";

interface PriceStepProps {
  price: string;
  setValue: (value: any) => void;
}

const PriceStep: FunctionComponent<PriceStepProps> = ({ price, setValue }) => {
  const id = "price";

  return (
    <div className="w-full h-screen flex flex-col justify-center gap-8">
      <Heading
        title="Set your price"
        subtitle="You can change it anytime."
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
          value={`€${price}`}
        />
      </div>
    </div>
  );
};

export default PriceStep;
