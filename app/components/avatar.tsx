"use client";

import Image from "next/image";

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
      src={src || "/images/placeholder.jpg"}
    />
  );
};

export default Avatar;
