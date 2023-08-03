"use client";

import { FunctionComponent } from "react";
import Heading from "../heading";
import TextArea from "../inputs/textarea";

interface TitleStepProps {
  title: string;
  setValue: (value: any) => void;
}

const TitleStep: FunctionComponent<TitleStepProps> = ({ title, setValue }) => {
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
          value={title}
          wordLimit={32}
          onChange={(value) => setValue(value)}
        />
      </div>
    </div>
  );
};

export default TitleStep;
