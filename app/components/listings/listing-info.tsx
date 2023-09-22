"use client";

import { SafeUser } from "@/app/types";
import { FunctionComponent, useMemo } from "react";
import { BsDot } from "react-icons/bs";
import { RangeKeyDict } from "react-date-range";
import Avatar from "../avatar";
import ListingCategory from "./listing-category";
import { categories } from "../navbar/categories";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import DatePicker from "../inputs/date-picker";

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
  const categoryData = useMemo(() => {
    const data = categories.find((c) => c.label === category);
    return data;
  }, [category]);

  return (
    <div className="w-full">
      <InfoBlock>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1.5">
            <p className="text-2xl font-medium">Hosted by {user.name}</p>
            <div className="flex items-center gap-1.5">
              <p>{guestCount} guests</p>
              <BsDot size={7} />
              <p>{bedroomCount} bedrooms</p>
              <BsDot size={7} />
              <p>{bedCount} beds</p>
              <BsDot size={7} />
              <p>{bathroomCount} baths</p>
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
            <p className="text-2xl">Select check-in date</p>
            <p className="text-sm text-gray-500 mt-1">
              Add your travel dates for exact pricing
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
