"use client";

import { SafeUser } from "@/app/types";
import { FunctionComponent, useMemo } from "react";
import { BsDot } from "react-icons/bs";
import { RangeKeyDict } from "react-date-range";
import Avatar from "../avatar";
import ListingCategory from "./listing-category";
import DatePicker from "../inputs/date-picker";
import { useTranslation } from "@/i18n/client";
import { categories } from "@/constants";
import useLocale from "@/app/hooks/use-locale";

interface ListingInfoProps {
  guestCount: number;
  bedroomCount: number;
  bedCount: number;
  bathroomCount: number;
  description: string;
  category: string;
  user: SafeUser;
  startDate?: Date;
  endDate?: Date;
  disabledDates: Date[];
  onDateChange: (range: RangeKeyDict) => void;
}

const ListingInfo: FunctionComponent<ListingInfoProps> = ({
  guestCount,
  bedroomCount,
  bedCount,
  bathroomCount,
  description,
  category,
  user,
  startDate,
  endDate,
  disabledDates,
  onDateChange,
}) => {
  const { locale } = useLocale();
  const { t } = useTranslation(locale, "listing");
  const commonT = useTranslation(locale, "common");

  const categoryData = useMemo(() => {
    const data = categories(commonT.t).find((c) => c.label === category);
    return data;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <div className="w-full">
      <InfoBlock>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1.5">
            <p className="text-2xl font-medium">
              {t("info.hostedBy", { name: user.name })}
            </p>
            <div className="flex items-center gap-1.5">
              <p>{t("info.guestCount", { count: guestCount })}</p>
              <BsDot size={7} />
              <p>{t("info.bedroomCount", { count: bedroomCount })}</p>
              <BsDot size={7} />
              <p>{t("info.bedCount", { count: bedCount })}</p>
              <BsDot size={7} />
              <p>{t("info.bathroomCount", { count: bathroomCount })}</p>
            </div>
          </div>
          <Avatar src={user.image} size={45} />
        </div>
      </InfoBlock>
      {categoryData && (
        <InfoBlock>
          <ListingCategory
            icon={categoryData.icon}
            label={categoryData.label}
            description={categoryData.description}
          />
        </InfoBlock>
      )}
      <InfoBlock>{description}</InfoBlock>
      <InfoBlock hasSeparator={false}>
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-2xl">{t("info.datePicker.title")}</p>
            <p className="text-sm text-gray-500 mt-1">
              {t("info.datePicker.subtitle")}
            </p>
          </div>
          <DatePicker
            value={{
              startDate,
              endDate,
            }}
            disabledDates={disabledDates}
            onChange={onDateChange}
          />
        </div>
      </InfoBlock>
    </div>
  );
};

export default ListingInfo;

interface InfoBlockProps {
  children: React.ReactNode;
  hasSeparator?: boolean;
}

const InfoBlock = ({ children, hasSeparator = true }: InfoBlockProps) => (
  <div className={`py-10 ${hasSeparator ? "border-b border-gray-300" : ""}`}>
    {children}
  </div>
);
