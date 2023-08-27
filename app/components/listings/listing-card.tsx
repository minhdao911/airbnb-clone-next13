"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { SafeListing, SafeUser } from "@/app/types";
import HeartButton from "../heart-button";
import Carousel from "../carousel";

interface ListingCardProps {
  data: SafeListing;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({ data, currentUser }) => {
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
          <Carousel>
            {data.images.map(({ asset_id, url }) => (
              <Image
                key={asset_id}
                width={500}
                height={500}
                className="
                  h-full
                  w-full
                  object-cover
                  transition
                "
                src={url}
                alt="Listing"
              />
            ))}
          </Carousel>
          <div
            className="
            absolute
            top-3
            right-3
          "
          >
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
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
