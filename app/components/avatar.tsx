"use client";

import Image from "next/image";

interface AvatarProps {
  src?: string | null;
}

const Avatar = ({ src }: AvatarProps) => {
  return (
    <Image
      alt="Avatar"
      className="rounded-full"
      height="30"
      width="30"
      src={src || "/images/placeholder.jpg"}
    />
  );
};

export default Avatar;
