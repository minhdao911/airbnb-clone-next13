"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { SafeListing } from "@/app/types";

interface ListingCardProps {
  data: SafeListing;
}

const ListingCard: React.FC<ListingCardProps> = ({ data }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          <Image
            fill
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={data.images[0].url}
            alt="Listing"
          />
        </div>
        <div>
          <div className="font-medium">{data.location.shortAddress}</div>
          <div className="font-light text-neutral-500 -mt-1">
            {data.category}
          </div>
        </div>
        <div className="flex flex-row items-center gap-1 -mt-1">
          <div className="font-semibold">€{data.price}</div>
          <div className="font-light">night</div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
