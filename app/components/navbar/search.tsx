"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { BiSearch, BiSliderAlt } from "react-icons/bi";
import DatePicker from "../inputs/date-picker";
import Counter from "../inputs/counter";
import Button from "../button";
import { format } from "date-fns";

const Search = () => {
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState(0);
  const [selected, setSelected] = useState("");
  const [destination, setDestination] = useState("");

  const formattedStartDate = startDate ? format(startDate, "MMM d") : "";
  const formattedEndDate = endDate ? format(endDate, "MMM d") : "";
  const guestString = `${guests} guest${guests > 1 ? "s" : ""}`;

  useEffect(() => {
    if (!show) {
      setSelected("");
    }
  }, [show]);

  const DatePickerPopup = memo(() => {
    return (
      <div className="absolute top-20 left-[193px] border border-gray-100 rounded-xl p-4 shadow-lg bg-white">
        <DatePicker
          value={{
            startDate,
            endDate,
          }}
          onChange={(range) => {
            setStartDate(range.selection.startDate);
            setEndDate(range.selection.endDate);
          }}
        />
      </div>
    );
  });
  DatePickerPopup.displayName = "DatePickerPopup";

  const GuestCounterPopup = memo(() => {
    return (
      <div className="absolute top-20 right-0 p-4 bg-white border border-gray-100 rounded-xl shadow-lg w-[300px]">
        <Counter
          title="Guests"
          value={guests}
          onChange={(value) => setGuests(value)}
        />
      </div>
    );
  });
  GuestCounterPopup.displayName = "GuestCounterPopup";

  const searchFields = [
    {
      id: "destination",
      title: "Where",
      placeholder: "Search destinations",
      text: destination,
      type: "input",
      onInputChange: (value: string) => setDestination(value),
    },
    {
      id: "checkin",
      title: "Check in",
      placeholder: "Add dates",
      text: formattedStartDate,
      popupComp: <DatePickerPopup />,
    },
    {
      id: "checkout",
      title: "Check out",
      placeholder: "Add dates",
      text: formattedEndDate,
      popupComp: <DatePickerPopup />,
    },
    {
      id: "guest",
      title: "Who",
      placeholder: "Add guests",
      text: guestString,
      popupComp: <GuestCounterPopup />,
    },
  ];

  const onSearch = useCallback(() => {
    console.log({
      destination,
      startDate,
      endDate,
      guests,
    });
  }, [startDate, endDate, destination, guests]);

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
                {destination || "Anywhere"}
              </div>
              <div className="flex flex-row gap-1 text-xs text-gray-500">
                <span>
                  {startDate && endDate
                    ? `${formattedStartDate} - ${formattedEndDate}`
                    : "Any week"}
                </span>
                <span>·</span>
                <span>{guests ? guestString : "Add guests"}</span>
              </div>
            </div>
          </div>
          <div className="p-2 rounded-full border-[1px]">
            <BiSliderAlt size={18} />
          </div>
        </div>
        <div className="hidden md:flex flex-row items-center justify-between transition">
          <div className="text-sm font-semibold pl-6 px-4">
            {destination || "Anywhere"}
          </div>
          <div className="text-sm font-semibold px-4 border-x-[1px]">
            {startDate && endDate
              ? `${formattedStartDate} - ${formattedEndDate}`
              : "Any week"}
          </div>
          <div className="flex flex-row items-center gap-3 text-sm font-light pl-4 pr-2">
            <div className="text-gray-500">
              {guests ? guestString : "Add guests"}
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
                <SearchItem
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

interface SearchItemProps {
  type?: "default" | "input";
  title: string;
  placeholder: string;
  text: string;
  popupComp?: React.ReactElement;
  isFirst?: boolean;
  isLast?: boolean;
  selected?: boolean;
  onClick: () => void;
  onInputChange?: (value: string) => void;
  onSearch: () => void;
}

const SearchItem = ({
  type = "default",
  title,
  placeholder,
  text,
  popupComp,
  isFirst = false,
  isLast = false,
  selected,
  onClick,
  onInputChange,
  onSearch,
}: SearchItemProps) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!selected) {
      setShowPopup(false);
    }
  }, [selected]);

  return (
    <>
      <div
        className="relative py-4 cursor-pointer group"
        onClick={() => {
          type === "default" && setShowPopup(!showPopup);
          onClick();
        }}
      >
        <div
          className={`flex flex-col gap-1 px-8 ${isLast ? "w-[230px]" : ""}`}
        >
          <Content
            type={type}
            title={title}
            placeholder={placeholder}
            text={text}
            isLast={isLast}
            onInputChange={onInputChange}
            onSearch={onSearch}
          />
        </div>
        <div
          className={`absolute top-0 ${isFirst ? "left-0" : "-left-1"} ${
            isLast ? "right-0" : "-right-1"
          } bottom-0 rounded-full group-hover:block ${
            selected ? "block bg-white shadow-lg" : "hidden bg-gray-100"
          }`}
        >
          <div
            className={`relative flex flex-col gap-1 px-8 py-4 ${
              !isFirst ? "pl-[36px]" : ""
            } ${isLast ? "w-[230px]" : ""}`}
          >
            <Content
              type={type}
              title={title}
              placeholder={placeholder}
              text={text}
              isLast={isLast}
              onInputChange={onInputChange}
              onSearch={onSearch}
            />
          </div>
        </div>
      </div>
      {type === "default" && showPopup && <>{popupComp}</>}
      {!isLast && <Separator />}
    </>
  );
};

interface ContentProps {
  type: "default" | "input";
  title: string;
  placeholder: string;
  text: string;
  isLast: boolean;
  onInputChange?: (value: string) => void;
  onSearch: () => void;
}

const Content = ({
  type,
  title,
  placeholder,
  text,
  isLast,
  onInputChange,
  onSearch,
}: ContentProps) => {
  if (type === "default") {
    return (
      <>
        <p className="text-xs font-bold">{title}</p>
        <p className="text-sm text-gray-500 font-light min-w-[65px]">
          {text || placeholder}
        </p>
        {isLast && (
          <div className="absolute top-2.5 ml-[74px]">
            <Button
              label="Search"
              icon={BiSearch}
              className="rounded-full w-fit"
              onClick={onSearch}
            />
          </div>
        )}
      </>
    );
  } else {
    return (
      <>
        <p className="text-xs font-bold">{title}</p>
        <input
          className="text-sm placeholder:text-gray-500 placeholder:font-light bg-transparent focus:outline-none"
          type="text"
          placeholder={placeholder}
          value={text}
          onChange={(e) => {
            onInputChange && onInputChange(e.target.value);
          }}
        />
      </>
    );
  }
};

const Separator = () => <div className="border-l border-gray-300 h-7" />;
