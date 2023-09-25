"use client";

import Image from "next/image";
import PlaceholderImg from "@/public/images/placeholder.jpg";

interface AvatarProps {
  src?: string | null;
  size?: number;
}

const Avatar = ({ src, size = 30 }: AvatarProps) => {
  return (
    <Image
      alt="Avatar"
      className="rounded-full"
      height={size}
      width={size}
      src={src || PlaceholderImg}
      loading="lazy"
    />
  );
};

export default Avatar;
