"use client";

import { FaAirbnb } from "react-icons/fa";
import { SafeUser } from "../types";
import Avatar from "./avatar";
import useLocale from "../hooks/use-locale";
import { useRouter } from "next-nprogress-bar";

interface HostingMenuProps {
  currentUser: SafeUser | null;
}

const HostingMenu = ({ currentUser }: HostingMenuProps) => {
  const router = useRouter();
  const { locale } = useLocale();

  return (
    <div className="flex p-4 px-10 border-b justify-between items-center">
      <FaAirbnb
        size={35}
        className="cursor-pointer text-red-500"
        onClick={() => router.push(`/${locale}`)}
      />
      <div className="p-1 rounded-full border">
        <Avatar src={currentUser?.image} />
      </div>
    </div>
  );
};

export default HostingMenu;
