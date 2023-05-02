"use client";

import { BiSearch, BiSliderAlt } from "react-icons/bi";

const Search = () => {
  return (
    <div className="border-[1px] border-gray-100 md:border-gray-200 w-full md:w-auto py-2 rounded-full shadow-md md:shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="pl-6 pr-2 flex md:hidden flex-row justify-between transition">
        <div className="flex flex-row items-center gap-4">
          <div className="flex flex-col items-center justify-center">
            <BiSearch size={20} />
          </div>
          <div className="flex flex-col">
            <div className="text-sm font-semibold">Anywhere</div>
            <div className="flex flex-row gap-1 text-xs text-gray-500">
              <span>Any week</span>
              <span>·</span>
              <span>Add guests</span>
            </div>
          </div>
        </div>
        <div className="p-2 rounded-full border-[1px]">
          <BiSliderAlt size={18} />
        </div>
      </div>
      <div className="hidden md:flex flex-row items-center justify-between transition">
        <div className="text-sm font-semibold pl-6 px-4">Anywhere</div>
        <div className="text-sm font-semibold px-4 border-x-[1px]">
          Any week
        </div>
        <div className="flex flex-row items-center gap-3 text-sm font-light pl-4 pr-2">
          <div className="text-gray-500">Add guests</div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch size={14} className="stroke-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
