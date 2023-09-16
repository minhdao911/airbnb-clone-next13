"use client";

import React, {
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "@/app/components/button";
import Heading from "@/app/components/heading";
import CategoryStep from "@/app/components/listing-steps/category";
import { FaAirbnb } from "react-icons/fa";
import LocationStep from "@/app/components/listing-steps/location";
import InfoStep from "@/app/components/listing-steps/info";
import ImagesStep, {
  UploadedFile,
} from "@/app/components/listing-steps/images";
import TitleStep from "@/app/components/listing-steps/title";
import DescriptionStep from "@/app/components/listing-steps/description";
import PriceStep from "@/app/components/listing-steps/price";
import FinalStep from "@/app/components/listing-steps/final";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/loader";
import { ImageData } from "@/app/types";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  TITLE = 4,
  DESCRIPTION = 5,
  PRICE = 6,
  FINAL = 7,
}

interface BecomeAHostProps {}

const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

const BecomeAHostPage: FunctionComponent<BecomeAHostProps> = () => {
  const router = useRouter();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [started, setStarted] = useState(false);
  const [nextStepDisabled, setNextStepDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
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
  const price = watch("price");

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
        if (images.length < 2) setNextStepDisabled(true);
        break;
      }
      default:
        break;
    }
    setStep((value) => value + 1);
  }, [step, location, images]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.FINAL) {
      return onNext();
    }

    setIsLoading(true);

    const imagesData = await uploadImages(images);
    if (!imagesData) return;

    axios
      .post("/api/listings", {
        ...data,
        images: imagesData,
      })
      .then(() => {
        toast.success("Listing created!");
        router.push("/home");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error while creating listing");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const uploadImages = async (files: UploadedFile[]) => {
    const formData = new FormData();
    const imagesData: ImageData[] = [];
    const requests = files.map((file) => {
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME as string
      );
      return axios.post(cloudinaryUrl, formData);
    });
    try {
      const responses = await Promise.all(requests);
      responses.forEach(({ data }) => {
        imagesData.push({
          asset_id: data.asset_id,
          url: data.secure_url,
          width: data.width,
          height: data.height,
        });
      });
      return imagesData;
    } catch (error) {
      console.log(error);
      toast.error("Error while uploading images");
    }
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.FINAL) {
      if (isLoading) return "";
      return "Submit";
    }
    return "Next";
  }, [step, isLoading]);

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
              numOfImages={5}
              files={images}
              setValue={(sources) => {
                setCustomValue("images", sources);
                if (sources.length < 5) {
                  setNextStepDisabled(true);
                } else {
                  setNextStepDisabled(false);
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
              errors={errors}
              register={register}
              onChange={() => {
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
              errors={errors}
              register={register}
              onChange={() => {
                setNextStepDisabled(false);
              }}
            />
          );
          break;
        }
        case STEPS.PRICE: {
          Component = (
            <PriceStep
              price={price}
              setValue={(value) => {
                setCustomValue("price", value);
                setNextStepDisabled(false);
              }}
            />
          );
          break;
        }
        case STEPS.FINAL: {
          Component = (
            <FinalStep
              title={title}
              price={price}
              imageSrc={images[0].preview}
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
          style={{ maxHeight: "calc(100vh - 218px)", maxWidth: "50rem" }}
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
      <div className="flex p-8 px-10">
        <FaAirbnb
          size={35}
          className="cursor-pointer"
          onClick={() => router.push("/home")}
        />
      </div>
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
              type={step === STEPS.FINAL ? "primary" : "secondary"}
              label={actionLabel}
              iconComp={isLoading && <Loader />}
              width="fit"
              disabled={nextStepDisabled || isLoading}
              onClick={handleSubmit(onSubmit)}
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

export default BecomeAHostPage;
