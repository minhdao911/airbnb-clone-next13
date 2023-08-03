"use client";

import { FunctionComponent } from "react";
import Heading from "../heading";
import TextArea from "../inputs/textarea";

interface DescriptionStepProps {
  text: string;
  setValue: (value: any) => void;
}

const DescriptionStep: FunctionComponent<DescriptionStepProps> = ({
  text,
  setValue,
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
          value={text}
          wordLimit={500}
          rows={7}
          onChange={(value) => setValue(value)}
        />
      </div>
    </div>
  );
};

export default DescriptionStep;
