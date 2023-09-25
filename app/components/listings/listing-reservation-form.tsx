import React from "react";
import { FunctionComponent, useState } from "react";
import Button from "../button";
import Counter from "../inputs/counter";
import DatePicker from "../inputs/date-picker";
import { RangeKeyDict } from "react-date-range";
import useLocale from "@/app/hooks/use-locale";
import { useTranslation } from "@/i18n/client";

interface ListingReservationFormProps {
  startDate?: Date;
  endDate?: Date;
  guests: number;
  disabledDates: Date[];
  errorMessage?: string;
  disabled?: boolean;
  onDateChange: (range: RangeKeyDict) => void;
  onGuestChange: (value: number) => void;
  onReserve: () => void;
}

const ListingReservationForm: FunctionComponent<
  ListingReservationFormProps
> = ({
  startDate,
  endDate,
  guests,
  disabledDates,
  disabled,
  errorMessage,
  onDateChange,
  onGuestChange,
  onReserve,
}) => {
  const { locale } = useLocale();
  const { t } = useTranslation(locale, "listing");

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full flex flex-col border border-gray-400 rounded-lg">
        <ReservationInput
          popupComp={
            <DatePicker
              value={{
                startDate,
                endDate,
              }}
              disabledDates={disabledDates}
              onChange={onDateChange}
            />
          }
        >
          <div className="w-full flex">
            <ReservationInputContent
              label={t("reservation.labels.checkin")}
              value={startDate?.toLocaleDateString() || ""}
              borderPosition="right"
            />
            <ReservationInputContent
              label={t("reservation.labels.checkout")}
              value={endDate?.toLocaleDateString() || ""}
            />
          </div>
        </ReservationInput>
        <ReservationInput
          popupComp={
            <Counter
              title={t("reservation.labels.guestCount")}
              value={guests}
              onChange={onGuestChange}
            />
          }
        >
          <div>
            <ReservationInputContent
              label={t("reservation.labels.guestCount")}
              value={t("reservation.guests", { count: guests })}
              borderPosition="top"
            />
          </div>
        </ReservationInput>
      </div>
      <Button
        type="primary"
        label={t("reservation.buttons.reserve")}
        disabled={disabled}
        onClick={onReserve}
      />
      <p className="font-light text-sm">
        {errorMessage || t("reservation.info.noCharge")}
      </p>
    </div>
  );
};

export default ListingReservationForm;

interface ReservationInputProps {
  children: React.ReactElement;
  popupComp: React.ReactNode;
}

const ReservationInput = ({ children, popupComp }: ReservationInputProps) => {
  const [openPopup, setOpenPopup] = useState(false);
  return (
    <div className="w-full relative">
      {React.cloneElement(children, {
        onClick: () => setOpenPopup(!openPopup),
      })}
      {openPopup && (
        <div className="w-full absolute transition bg-white border border-gray-200 p-3 top-15 left-0 rounded-lg shadow-md z-10">
          {popupComp}
        </div>
      )}
    </div>
  );
};

interface ReservationInputContentProps {
  label: string;
  value: string;
  borderPosition?: "left" | "right" | "top" | "bottom";
}

const ReservationInputContent = ({
  label,
  value,
  borderPosition,
}: ReservationInputContentProps) => (
  <div
    className={`w-full p-3 ${
      borderPosition
        ? `${
            borderPosition === "top"
              ? "border-t"
              : borderPosition === "bottom"
              ? "border-b"
              : borderPosition === "left"
              ? "border-l"
              : "border-r"
          } border-gray-400`
        : ""
    } cursor-pointer`}
  >
    <p className="uppercase text-xxs font-bold">{label}</p>
    <p className="mt-1 text-sm font-light">{value}</p>
  </div>
);
