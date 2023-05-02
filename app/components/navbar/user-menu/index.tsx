"use client";

import { useState } from "react";
import { BiGlobe, BiMenu } from "react-icons/bi";
import Avatar from "../../avatar";
import MenuItem from "./menu-item";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative hidden md:flex flex-row items-center justify-center transition">
      <div className="text-sm font-semibold px-4 py-3 rounded-full hover:bg-neutral-100 transition cursor-pointer">
        Airbnb your home
      </div>
      <div className="p-3 mr-2 rounded-full hover:bg-neutral-100 transition cursor-pointer">
        <BiGlobe size={18} />
      </div>
      <div
        className="p-3 py-2.5 pr-12 relative flex flex-row items-center rounded-full border-[1px] hover:shadow-md transition cursor-pointer"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <BiMenu size={20} />
        <div className="absolute right-1.5">
          <Avatar />
        </div>
      </div>

      {isOpen && (
        <div className="absolute right-0 top-12 py-2 text-sm w-[40vw] md:w-4/5 rounded-xl bg-white shadow-md border-t-[1px] cursor-pointer">
          <MenuItem text="Sign up" onClick={() => {}} />
          <MenuItem text="Log in" onClick={() => {}} />
          <hr className="my-2" />
          <MenuItem text="Airbnb your home" onClick={() => {}} />
          <MenuItem text="Help" onClick={() => {}} />
        </div>
      )}
    </div>
  );
};

export default UserMenu;
