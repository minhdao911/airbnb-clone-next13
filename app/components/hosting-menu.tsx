"use client";

import { useRouter } from "next/navigation";
import { FaAirbnb } from "react-icons/fa";
import { SafeUser } from "../types";
import Avatar from "./avatar";

interface HostingMenuProps {
  currentUser: SafeUser | null;
}

const HostingMenu = ({ currentUser }: HostingMenuProps) => {
  const router = useRouter();

  return (
    <div className="flex p-4 px-10 border-b justify-between items-center">
      <FaAirbnb
        size={35}
        className="cursor-pointer text-red-500"
        onClick={() => router.push("/home")}
      />
      <div className="p-1 rounded-full border">
        <Avatar src={currentUser?.image} />
      </div>
    </div>
  );
};

export default HostingMenu;