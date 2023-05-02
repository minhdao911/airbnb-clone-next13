"use client";

import Container from "../container";
import Logo from "./logo";
import Search from "./search";
import UserMenu from "./user-menu";

const Navbar = () => {
  return (
    <div className="fixed w-full bg-white z-10">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-1">
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;