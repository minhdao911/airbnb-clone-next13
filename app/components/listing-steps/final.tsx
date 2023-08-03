"use client";

import { FunctionComponent } from "react";
import { TfiCalendar, TfiPencil } from "react-icons/tfi";
import { AiFillStar } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import Heading from "../heading";
import Image from "next/image";

interface FinalStepProps {
  title: string;
  price: number;
  imageSrc: string;
}

const content = [
  {
    title: "Set up your calendar",
    subtitle:
      "Choose which dates are available. Guests can start booking 24 hours after you publish.",
    icon: TfiCalendar,
  },
  {
    title: "Adjust your settings",
    subtitle:
      "Set house rules, select a cancellation policy, choose how guests can book, and more.",
    icon: TfiPencil,
  },
  {
    title: "Prepare for your first guest",
    subtitle:
      "Find tips in our Resource Center or get one-to-one guidance from a Superhost.",
    icon: BsPeople,
  },
];

const FinalStep: FunctionComponent<FinalStepProps> = ({
  title,
  price,
  imageSrc,
}) => {
  return (
    <div className="w-full h-screen flex flex-col justify-center gap-8">
      <Heading
        title="Yay! It’s time to publish."
        subtitle="Here's what we'll show to guests. Before you publish, make sure to review the details."
        titleStyle={{
          fontSize: "3rem",
          lineHeight: "3rem",
        }}
        subtitleStyle={{ fontSize: "1.25rem" }}
      />
      <div className="flex w-full gap-[4rem] items-center">
        <PreviewCard title={title} price={price} imageSrc={imageSrc} />
        <div className="flex flex-col gap-8 w-full">
          <p className="text-2xl">What&apos;s next?</p>
          {content.map(({ title, subtitle, icon: Icon }, index) => (
            <div key={index} className="flex justify-start gap-6">
              <Icon className="h-fit" size={50} />
              <Heading
                title={title}
                titleStyle={{
                  fontSize: "1.25rem",
                  lineHeight: "1.75rem",
                  fontWeight: 500,
                }}
                subtitleStyle={{
                  fontSize: "0.9rem",
                  marginTop: "-0px",
                }}
                subtitle={subtitle}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinalStep;

interface PreviewCardProps {
  title: string;
  price: number;
  imageSrc: string;
}

const PreviewCard = ({ title, price, imageSrc }: PreviewCardProps) => {
  return (
    <div className="p-4 rounded-lg shadow-lg bg-white w-full">
      <Image
        className="rounded-lg object-cover w-full h-[300px]"
        src={imageSrc}
        alt="accommondation cover"
        width={300}
        height={300}
      />
      <div className="flex items-start justify-between mt-4">
        <div>
          <p className="font-semibold">{title}</p>
          <p>
            <span className="font-bold">€{price}</span> night
          </p>
        </div>
        <div className="flex items-center gap-1">
          <p>New</p>
          <AiFillStar size={15} />
        </div>
      </div>
    </div>
  );
};
