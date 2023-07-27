"use client";

import useAuthModal from "@/app/hooks/use-auth-modal";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import { useCallback, useState } from "react";
import { BiGlobe, BiMenu } from "react-icons/bi";
import Avatar from "../../avatar";
import MenuItem from "./menu-item";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const router = useRouter();

  const authModal = useAuthModal();
  const [isOpen, setIsOpen] = useState(false);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return authModal.onOpen("login");
    }

    router.push("/become-a-host");
  }, [currentUser, authModal, router]);

  return (
    <div className="relative hidden md:flex flex-row items-center justify-center transition">
      <div
        className="text-sm font-semibold px-4 py-3 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        onClick={onRent}
      >
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
          <Avatar src={currentUser?.image} />
        </div>
      </div>

      {isOpen && (
        <div className="absolute right-0 top-12 py-2 text-sm w-[40vw] md:w-4/5 rounded-xl bg-white shadow-md border-t-[1px] cursor-pointer">
          {currentUser ? (
            <>
              <MenuItem highlighted text="Trips" onClick={() => {}} />
              <MenuItem highlighted text="Wishlists" onClick={() => {}} />
              <hr className="my-2" />
              <MenuItem text="Airbnb your home" onClick={onRent} />
              <MenuItem text="Log out" onClick={() => signOut()} />
            </>
          ) : (
            <>
              <MenuItem
                highlighted
                text="Sign up"
                onClick={() => {
                  authModal.onOpen("register");
                  setIsOpen(false);
                }}
              />
              <MenuItem
                text="Log in"
                onClick={() => {
                  authModal.onOpen("login");
                  setIsOpen(false);
                }}
              />
              <hr className="my-2" />
              <MenuItem text="Airbnb your home" onClick={onRent} />
              <MenuItem text="Help" onClick={() => {}} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
