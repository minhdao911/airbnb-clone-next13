"use client";

import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Button from "../../../button";
import { IoClose } from "react-icons/io5";

interface SearchFieldProps {
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
  onClear: () => void;
}

const SearchField = ({
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
  onClear,
}: SearchFieldProps) => {
  const [showPopup, setShowPopup] = useState(false);

  const hasValue = text && text !== "0 guest";

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
          className={`flex flex-col gap-1 px-8 ${isLast ? "w-[245px]" : ""}`}
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
            } ${isLast ? "w-[245px]" : ""}`}
          >
            {selected && hasValue && (
              <div
                className={`absolute top-1/2 ${
                  isLast ? "left-[96px]" : "right-3"
                } -translate-y-1/2 bg-gray-200 rounded-full p-1 z-20 hover:bg-gray-300`}
                onClick={(e) => {
                  e.stopPropagation();
                  onClear();
                }}
              >
                <IoClose size={14} />
              </div>
            )}
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

export default SearchField;

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
        <p className="text-sm text-gray-500 font-light min-w-[75px]">
          {text || placeholder}
        </p>
        {isLast && (
          <div className="absolute top-2.5 ml-[92px] z-10">
            <Button
              label="Search"
              icon={BiSearch}
              className="rounded-full w-fit"
              onClick={(e: any) => {
                e.stopPropagation();
                onSearch();
              }}
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
