"use client";

import { FunctionComponent, useState } from "react";
import Button from "@/app/components/button";
import Heading from "@/app/components/heading";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

interface BecomeAHostProps {}

const BecomeAHost: FunctionComponent<BecomeAHostProps> = () => {
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [started, setStarted] = useState(false);

  const onBack = () => {
    setStep((value) => (value - 1 < 0 ? 0 : value - 1));
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const bodyContent = () => {
    if (!started) {
      return (
        <div
          className="
            h-full
            flex
            flex-row
            gap-10
            items-center
            justify-center
          "
        >
          <Heading
            title="It’s easy to get started on Airbnb"
            titleStyle={{
              fontSize: "3rem",
              lineHeight: "3.5rem",
            }}
          />
          <div className="flex flex-col">
            <div className="p-5 pb-10">
              <Heading
                title="Tell us about your place"
                subtitle="Share some basic info, like where it is and how many guests can stay."
              />
            </div>
            <hr />
            <div className="p-5 pb-10">
              <Heading
                title="Make it stand out"
                subtitle="Add photos plus a title and description—we’ll help you out."
              />
            </div>
            <hr />
            <div className="p-5 pb-10">
              <Heading
                title="Finish up and publish"
                subtitle="Choose if you'd like to start with an experienced guest, set a starting price, and publish your listing."
              />
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div
      className="
        w-full
        h-full
        flex
        flex-col
        bg-white
      "
    >
      <div className="flex-1 m-auto" style={{ maxWidth: "60rem" }}>
        {bodyContent()}
      </div>
      <div className="w-full p-5">
        {started ? (
          <div
            className="
              flex 
              flex-row 
              justify-between
            "
          >
            <Button type="ghost" label="Back" width="fit" />
            <Button type="secondary" label="Next" width="fit" />
          </div>
        ) : (
          <div
            className="
              flex
              flex-row
              justify-end
            "
          >
            <Button
              label="Get started"
              width="fit"
              onClick={() => setStarted(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BecomeAHost;
