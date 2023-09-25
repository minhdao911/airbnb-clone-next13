"use client";

import { FunctionComponent } from "react";
import { TfiCalendar, TfiPencil } from "react-icons/tfi";
import { AiFillStar } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import Heading from "../heading";
import Image from "next/image";
import { DEFAULT_CURRENCY } from "@/constants";
import useLocale from "@/app/hooks/use-locale";
import { useTranslation } from "@/i18n/client";

interface FinalStepProps {
  title: string;
  price: number;
  imageSrc: string;
}

const content = (t: any) => [
  {
    title: t("steps.final.previewCard.content1.title"),
    subtitle: t("steps.final.previewCard.content1.subtitle"),
    icon: TfiCalendar,
  },
  {
    title: t("steps.final.previewCard.content2.title"),
    subtitle: t("steps.final.previewCard.content2.subtitle"),
    icon: TfiPencil,
  },
  {
    title: t("steps.final.previewCard.content3.title"),
    subtitle: t("steps.final.previewCard.content3.subtitle"),
    icon: BsPeople,
  },
];

const FinalStep: FunctionComponent<FinalStepProps> = ({
  title,
  price,
  imageSrc,
}) => {
  const { locale } = useLocale();
  const { t } = useTranslation(locale, "become-a-host");

  return (
    <div className="w-full h-screen flex flex-col justify-center gap-8">
      <Heading
        title={t("steps.final.title")}
        subtitle={t("steps.final.subtitle")}
        titleStyle={{
          fontSize: "3rem",
          lineHeight: "3rem",
        }}
        subtitleStyle={{ fontSize: "1.25rem" }}
      />
      <div className="flex w-full gap-[4rem] items-center">
        <PreviewCard
          title={title}
          price={price}
          imageSrc={imageSrc}
          translator={t}
        />
        <div className="flex flex-col gap-8 w-full">
          <p className="text-2xl">{t("steps.final.previewCard.title")}</p>
          {content(t).map(({ title, subtitle, icon: Icon }, index) => (
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
  translator: any;
}

const PreviewCard = ({
  title,
  price,
  imageSrc,
  translator,
}: PreviewCardProps) => {
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
            <span className="font-bold">
              {DEFAULT_CURRENCY}
              {price}
            </span>{" "}
            {translator("steps.final.previewCard.night")}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <p>{translator("steps.final.previewCard.new")}</p>
          <AiFillStar size={15} />
        </div>
      </div>
    </div>
  );
};
