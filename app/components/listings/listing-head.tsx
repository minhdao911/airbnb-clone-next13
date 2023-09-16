"use client";

import { ImageData } from "@/app/types";
import Image from "next/image";
import { FunctionComponent } from "react";
import { AiFillStar } from "react-icons/ai";
import { BsDot } from "react-icons/bs";

interface ListingHeadProps {
  title: string;
  images: ImageData[];
  location: string;
}

const ListingHead: FunctionComponent<ListingHeadProps> = ({
  title,
  images,
  location,
}) => {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-medium">{title}</h1>
      <div className="flex items-center gap-1.5 mt-2">
        <div className="flex items-center gap-1">
          <AiFillStar size={15} />
          <p className="text-sm font-light">New</p>
        </div>
        <BsDot size={7} />
        <p className="text-sm underline font-medium">{location}</p>
      </div>
      <div className="w-full h-[484px] flex gap-3 mt-5">
        <Image
          className="w-1/2 object-cover"
          src={images[0].url}
          alt="listing photos"
          width={300}
          height={300}
        />
        <div className="w-1/2 grid grid-cols-2 grid-rows-2 gap-3">
          {images.slice(1).map((image, index) => (
            <Image
              key={index}
              className="w-full h-full object-cover"
              src={image.url}
              alt="listing photos"
              width={300}
              height={300}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListingHead;
