"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      alt="Logo"
      className="hidden md:block cursor-pointer z-10"
      height="100"
      width="100"
      src="/images/logo.png"
      onClick={() => router.push("/home")}
    />
  );
};

export default Logo;
