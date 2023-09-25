"use client";

import React, { FunctionComponent, useState } from "react";
import { RangeKeyDict } from "react-date-range";
import ListingReservationForm from "./listing-reservation-form";
import { DEFAULT_CURRENCY, SERVICE_FEE } from "@/constants";
import { isSameDay } from "date-fns";
import useLocale from "@/app/hooks/use-locale";
import { useTranslation } from "@/i18n/client";

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  startDate?: Date;
  endDate?: Date;
  disabledDates: Date[];
  disabled?: boolean;
  onDateChange: (range: RangeKeyDict) => void;
  onCreateReservation: () => void;
}

const ListingReservation: FunctionComponent<ListingReservationProps> = ({
  price,
  totalPrice,
  startDate,
  endDate,
  disabledDates,
  disabled,
  onDateChange,
  onCreateReservation,
}) => {
  const [guests, setGuests] = useState(1);

  const { locale } = useLocale();
  const { t } = useTranslation(locale, "listing");

  const numOfDates =
    startDate && endDate ? endDate?.getDate() - startDate?.getDate() : 0;
  const isDateRangeValid =
    startDate &&
    endDate &&
    disabledDates.filter(
      (date) => isSameDay(date, startDate) || isSameDay(date, endDate)
    ).length === 0 &&
    !isSameDay(startDate, endDate);
  const isFormValid =
    isDateRangeValid && guests > 0 && totalPrice > 0 ? true : false;

  return (
    <div className="w-full flex flex-col gap-5 bg-white p-5 rounded-lg shadow-lg border border-gray-200">
      <div className="flex items-end gap-1 text-lg font-light">
        <p className="text-xl font-bold">{DEFAULT_CURRENCY}</p>
        <p className="text-xl font-bold">{price}</p>
        {t("reservation.night")}
      </div>
      <ListingReservationForm
        startDate={startDate}
        endDate={endDate}
        guests={guests}
        disabledDates={disabledDates}
        errorMessage={
          !isDateRangeValid ? t("reservation.errors.invalidDates") : ""
        }
        disabled={!isFormValid || disabled}
        onDateChange={onDateChange}
        onGuestChange={(value) => setGuests(value)}
        onReserve={onCreateReservation}
      />
      <div className="mt-1">
        <div className="flex flex-col gap-2 mb-5 font-light">
          <div className="flex items-center justify-between">
            <p className="underline">
              {t("reservation.pricePerNight", {
                currency: DEFAULT_CURRENCY,
                price: price,
                count: numOfDates,
              })}
            </p>
            <p>
              {DEFAULT_CURRENCY} {price * numOfDates}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="underline">{t("reservation.serviceFee")}</p>
            <p>
              {DEFAULT_CURRENCY} {SERVICE_FEE}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between pt-5 border-t border-gray-200 font-semibold">
          <p>{t("reservation.total")}</p>
          <p>
            {DEFAULT_CURRENCY} {totalPrice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListingReservation;
