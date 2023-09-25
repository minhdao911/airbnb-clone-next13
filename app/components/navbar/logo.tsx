"use client";

import useLocale from "@/app/hooks/use-locale";
import Image from "next/image";
import LogoImg from "@/public/images/logo.png";
import { useRouter } from "next-nprogress-bar";

const Logo = () => {
  const router = useRouter();
  const { locale } = useLocale();

  return (
    <Image
      alt="Logo"
      className="hidden md:block cursor-pointer z-10"
      height="35"
      width="100"
      src={LogoImg}
      loading="lazy"
      onClick={() => router.push(`/${locale}`)}
    />
  );
};

export default Logo;
