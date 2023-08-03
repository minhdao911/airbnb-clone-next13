"use client";

import React, { FunctionComponent, useCallback, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Button from "@/app/components/button";
import Heading from "@/app/components/heading";
import CategoryStep from "@/app/components/listing-steps/category";
import { FaAirbnb } from "react-icons/fa";
import LocationStep from "@/app/components/listing-steps/location";
import InfoStep from "@/app/components/listing-steps/info";
import ImagesStep from "@/app/components/listing-steps/images";
import TitleStep from "@/app/components/listing-steps/title";
import DescriptionStep from "@/app/components/listing-steps/description";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  TITLE = 4,
  DESCRIPTION = 5,
  PRICE = 6,
}

interface BecomeAHostProps {}

const BecomeAHost: FunctionComponent<BecomeAHostProps> = () => {
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [started, setStarted] = useState(false);
  const [nextStepDisabled, setNextStepDisabled] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      bedroomCount: 1,
      bedCount: 1,
      bathroomCount: 1,
      images: [],
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const bedroomCount = watch("bedroomCount");
  const bedCount = watch("bedCount");
  const bathroomCount = watch("bathroomCount");
  const images = watch("images");
  const title = watch("title");
  const desc = watch("description");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((value) => (value - 1 < 0 ? 0 : value - 1));
    setNextStepDisabled(false);
  };

  const onNext = useCallback(() => {
    switch (step + 1) {
      case STEPS.LOCATION: {
        if (location === null) setNextStepDisabled(true);
        break;
      }
      case STEPS.IMAGES: {
        if (images.length < 3) setNextStepDisabled(true);
        break;
      }
      default:
        break;
    }
    setStep((value) => value + 1);
  }, [step, location, images]);

  const bodyContent = () => {
    if (!started) {
      return (
        <div
          className="
            flex
            flex-row
            gap-10
            items-center
            justify-center
            m-auto
          "
          style={{ height: "calc(100vh - 198px)", maxWidth: "60rem" }}
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
    } else {
      let Component;
      switch (step) {
        case STEPS.CATEGORY: {
          Component = (
            <CategoryStep
              selected={category}
              setValue={(category) => {
                setCustomValue("category", category);
                setNextStepDisabled(false);
              }}
            />
          );
          break;
        }
        case STEPS.LOCATION: {
          Component = (
            <LocationStep
              location={location}
              setValue={(location) => {
                setCustomValue("location", location);
                setNextStepDisabled(false);
              }}
            />
          );
          break;
        }
        case STEPS.INFO: {
          Component = (
            <InfoStep
              guestCount={guestCount}
              bedroomCount={bedroomCount}
              bedCount={bedCount}
              bathroomCount={bathroomCount}
              setValue={(id, value) => {
                setCustomValue(id, value);
                setNextStepDisabled(false);
              }}
            />
          );
          break;
        }
        case STEPS.IMAGES: {
          Component = (
            <ImagesStep
              files={images}
              setValue={(sources) => {
                setCustomValue("images", sources);
                if (sources.length > 2) {
                  setNextStepDisabled(false);
                } else {
                  setNextStepDisabled(true);
                }
              }}
            />
          );
          break;
        }
        case STEPS.TITLE: {
          Component = (
            <TitleStep
              title={title}
              setValue={(value) => {
                setCustomValue("title", value);
                setNextStepDisabled(false);
              }}
            />
          );
          break;
        }
        case STEPS.DESCRIPTION: {
          Component = (
            <DescriptionStep
              text={desc}
              setValue={(value) => {
                setCustomValue("description", value);
                setNextStepDisabled(false);
              }}
            />
          );
          break;
        }
        default:
          return null;
      }

      return (
        <div
          className="
            h-fit
            flex
            flex-col
            gap-8
            overflow-auto
            no-scrollbar
            p-3
            px-5
            m-auto
          "
          style={{ maxHeight: "calc(100vh - 218px)", maxWidth: "40rem" }}
        >
          {Component}
        </div>
      );
    }
  };

  return (
    <div
      className="
        w-full
        h-full
        relative
        bg-white
      "
    >
      <div className="flex justify-between p-8 px-10">
        <FaAirbnb size={35} />
        <div className="p-2 px-4 border rounded-full text-sm cursor-pointer hover:border-black transition">
          Save & exit
        </div>
      </div>
      {/* <div className="flex-1 m-auto">{bodyContent()}</div> */}
      {bodyContent()}
      <div className="absolute bottom-0 left-0 w-full p-5 px-10 border-t-4 bg-white">
        {started ? (
          <div
            className="
              flex 
              flex-row 
              justify-between
            "
          >
            <Button
              type="ghost"
              label="Back"
              width="fit"
              onClick={() => {
                if (step === STEPS.CATEGORY) setStarted(false);
                else onBack();
              }}
            />
            <Button
              type="secondary"
              label="Next"
              width="fit"
              disabled={nextStepDisabled}
              onClick={onNext}
            />
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
