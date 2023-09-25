"use client";

import { useCallback, useEffect, useState } from "react";
import { BiSearch, BiSliderAlt } from "react-icons/bi";
import { useSearchParams } from "next/navigation";
import { format, formatISO } from "date-fns";
import qs from "query-string";
import Counter from "../../../inputs/counter";
import DatePicker from "../../../inputs/date-picker";
import SearchField from "./search-field";
import { RangeKeyDict } from "react-date-range";
import { useTranslation } from "@/i18n/client";
import useLocale from "@/app/hooks/use-locale";
import { useRouter } from "next-nprogress-bar";

const Search = () => {
  const router = useRouter();
  const params = useSearchParams();

  const { locale } = useLocale();
  const { t } = useTranslation(locale, "common");

  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [guestCount, setGuestCount] = useState(0);
  const [selected, setSelected] = useState("");
  const [location, setLocation] = useState("");

  const formattedStartDate = startDate ? format(startDate, "MMM d") : "";
  const formattedEndDate = endDate ? format(endDate, "MMM d") : "";
  const guestString = t("navbar.searchBar.guest", { count: guestCount });

  useEffect(() => {
    if (!show) {
      setSelected("");
    }
  }, [show]);

  useEffect(() => {
    if (params?.toString()) {
      const query = qs.parse(params.toString());
      if (query.location) {
        setLocation(query.location as string);
      }
      if (query.startDate) {
        setStartDate(new Date(query.startDate as string));
      }
      if (query.endDate) {
        setEndDate(new Date(query.endDate as string));
      }
      if (query.guestCount) {
        setGuestCount(+query.guestCount);
      }
    } else {
      setLocation("");
      setStartDate(undefined);
      setEndDate(undefined);
      setGuestCount(0);
    }
  }, [params]);

  const onDateChange = (range: RangeKeyDict) => {
    setStartDate(range.selection.startDate);
    setEndDate(range.selection.endDate);
  };

  const onSearch = useCallback(() => {
    const query = {
      location: location || null,
      startDate: startDate ? formatISO(startDate) : null,
      endDate: endDate ? formatISO(endDate) : null,
      guestCount: guestCount > 0 ? guestCount : null,
    };

    const url = qs.stringifyUrl(
      {
        url: `/${locale}/`,
        query,
      },
      { skipNull: true }
    );
    router.push(url);
    setShow(false);
  }, [startDate, endDate, location, guestCount, router, locale]);

  const searchFields = [
    {
      id: "location",
      title: t("navbar.searchBar.location.title"),
      placeholder: t("navbar.searchBar.location.placeholder"),
      text: location,
      type: "input",
      onInputChange: (value: string) => setLocation(value),
      onClear: () => setLocation(""),
    },
    {
      id: "checkin",
      title: t("navbar.searchBar.startDate.title"),
      placeholder: t("navbar.searchBar.startDate.placeholder"),
      text: formattedStartDate,
      popupComp: (
        <DatePickerPopup
          startDate={startDate}
          endDate={endDate}
          onDateChange={onDateChange}
        />
      ),
      onClear: () => setStartDate(undefined),
    },
    {
      id: "checkout",
      title: t("navbar.searchBar.endDate.title"),
      placeholder: t("navbar.searchBar.endDate.placeholder"),
      text: formattedEndDate,
      popupComp: (
        <DatePickerPopup
          startDate={startDate}
          endDate={endDate}
          onDateChange={onDateChange}
        />
      ),
      onClear: () => setEndDate(undefined),
    },
    {
      id: "guest",
      title: t("navbar.searchBar.guestCount.title"),
      placeholder: t("navbar.searchBar.guestCount.placeholder"),
      text: guestString,
      popupComp: (
        <GuestCounterPopup
          guestCount={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
      ),
      onClear: () => setGuestCount(0),
    },
  ];

  return (
    <>
      <div
        className="border-[1px] border-gray-100 md:border-gray-200 w-full md:w-auto py-2 rounded-full shadow-md md:shadow-sm hover:shadow-md transition cursor-pointer"
        onClick={() => setShow(true)}
      >
        <div className="pl-6 pr-2 flex md:hidden flex-row justify-between transition">
          <div className="flex flex-row items-center gap-4">
            <div className="flex flex-col items-center justify-center">
              <BiSearch size={20} />
            </div>
            <div className="flex flex-col">
              <div className="text-sm font-semibold">
                {location || t("navbar.searchBar.anywhere")}
              </div>
              <div className="flex flex-row gap-1 text-xs text-gray-500">
                <span>
                  {startDate && endDate
                    ? `${formattedStartDate} - ${formattedEndDate}`
                    : t("navbar.searchBar.anyWeek")}
                </span>
                <span>·</span>
                <span>
                  {guestCount ? guestString : t("navbar.searchBar.addGuests")}
                </span>
              </div>
            </div>
          </div>
          <div className="p-2 rounded-full border-[1px]">
            <BiSliderAlt size={18} />
          </div>
        </div>
        <div className="hidden md:flex flex-row items-center justify-between transition">
          <div className="text-sm font-semibold pl-6 px-4">
            {location || t("navbar.searchBar.anywhere")}
          </div>
          <div className="text-sm font-semibold px-4 border-x-[1px]">
            {startDate && endDate
              ? `${formattedStartDate} - ${formattedEndDate}`
              : t("navbar.searchBar.anyWeek")}
          </div>
          <div className="flex flex-row items-center gap-3 text-sm font-light pl-4 pr-2">
            <div className="text-gray-500">
              {guestCount ? guestString : t("navbar.searchBar.addGuests")}
            </div>
            <div className="p-2 bg-rose-500 rounded-full text-white">
              <BiSearch size={14} className="stroke-1" />
            </div>
          </div>
        </div>
      </div>
      {show && (
        <>
          <div
            className="fixed left-0 bottom-0 top-0 right-0 bg-slate-800/30"
            onClick={() => setShow(false)}
          />
          <div className="absolute left-0 top-0 w-full flex items-center justify-center bg-white pt-5 md:pt-16 pb-5 transition">
            <div
              className={`relative flex items-center border border-gray-300 rounded-full ${
                selected ? "bg-gray-200" : "bg-white"
              }`}
            >
              {searchFields.map((field, index) => (
                <SearchField
                  key={field.id}
                  title={field.title}
                  placeholder={field.placeholder}
                  text={field.text}
                  type={field.type as "default" | "input" | undefined}
                  isFirst={index === 0}
                  isLast={index === searchFields.length - 1}
                  selected={selected === field.id}
                  popupComp={field.popupComp}
                  onClick={() => setSelected(field.id)}
                  onInputChange={field.onInputChange}
                  onClear={field.onClear}
                  onSearch={onSearch}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Search;

interface DatePickerPopupProps {
  startDate?: Date;
  endDate?: Date;
  onDateChange: (range: any) => void;
}

const DatePickerPopup = ({
  startDate,
  endDate,
  onDateChange,
}: DatePickerPopupProps) => {
  return (
    <div className="absolute top-20 left-0 w-full border border-gray-100 rounded-xl p-4 shadow-lg bg-white">
      <DatePicker
        value={{
          startDate,
          endDate,
        }}
        months={2}
        onChange={onDateChange}
      />
    </div>
  );
};

interface GuestCounterPopupProps {
  guestCount: number;
  onChange: (value: number) => void;
}

const GuestCounterPopup = ({
  guestCount,
  onChange,
}: GuestCounterPopupProps) => {
  return (
    <div className="absolute top-20 right-0 p-4 bg-white border border-gray-100 rounded-xl shadow-lg w-[300px]">
      <Counter title="Guests" value={guestCount} onChange={onChange} />
    </div>
  );
};
