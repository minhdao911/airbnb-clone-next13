"use client";

import useAuthModal from "@/app/hooks/use-auth-modal";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import { useCallback, useState } from "react";
import { BiGlobe, BiMenu } from "react-icons/bi";
import Avatar from "../../avatar";
import MenuItem from "./menu-item";
import useLanguageModal from "@/app/hooks/use-language-modal";
import { useTranslation } from "@/i18n/client";
import useLocale from "@/app/hooks/use-locale";
import { useRouter } from "next-nprogress-bar";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const router = useRouter();

  const authModal = useAuthModal();
  const langModal = useLanguageModal();

  const { locale } = useLocale();
  const { t } = useTranslation(locale, "common");

  const [isOpen, setIsOpen] = useState(false);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return authModal.onOpen("login");
    }

    router.push(`${locale}/become-a-host`);
  }, [currentUser, authModal, router, locale]);

  return (
    <div className="relative hidden md:flex flex-row items-center justify-center transition">
      <div
        className="text-sm font-semibold px-4 py-3 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        onClick={onRent}
      >
        {t("navbar.userMenu.becomeAHost")}
      </div>
      <div
        className="p-3 mr-2 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        onClick={langModal.onOpen}
      >
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
        <>
          <div
            className="fixed top-0 left-0 right-0 bottom-0"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-12 py-2 text-sm w-[40vw] md:w-4/5 rounded-xl bg-white shadow-md border-t-[1px] cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  highlighted
                  text={t("navbar.userMenu.trips")}
                  onClick={() => {
                    router.push(`${locale}/trips`);
                    setIsOpen(false);
                  }}
                />
                <MenuItem
                  highlighted
                  text={t("navbar.userMenu.wishlists")}
                  onClick={() => {
                    router.push(`${locale}/wishlists`);
                    setIsOpen(false);
                  }}
                />
                <hr className="my-2" />
                <MenuItem
                  text={t("navbar.userMenu.listings")}
                  onClick={() => {
                    router.push(`${locale}/hosting`);
                  }}
                />
                <MenuItem
                  text={t("navbar.userMenu.logOut")}
                  onClick={() => signOut()}
                />
              </>
            ) : (
              <>
                <MenuItem
                  highlighted
                  text={t("navbar.userMenu.signUp")}
                  onClick={() => {
                    authModal.onOpen("register");
                    setIsOpen(false);
                  }}
                />
                <MenuItem
                  text={t("navbar.userMenu.logIn")}
                  onClick={() => {
                    authModal.onOpen("login");
                    setIsOpen(false);
                  }}
                />
                <hr className="my-2" />
                <MenuItem
                  text={t("navbar.userMenu.becomeAHost")}
                  onClick={onRent}
                />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserMenu;
