"use client";

import Image from "next/image";
import { SafeListing, SafeSimpleReservation, SafeUser } from "@/app/types";
import HeartButton from "../heart-button";
import Carousel from "../carousel";
import { useMemo } from "react";
import { format } from "date-fns";
import Button from "../button";
import { DEFAULT_CURRENCY, categories } from "@/constants";
import useLocale from "@/app/hooks/use-locale";
import { useTranslation } from "@/i18n/client";
import { useRouter } from "next-nprogress-bar";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeSimpleReservation;
  currentUser?: SafeUser | null;
  withFavorite?: boolean;
  actionDisabled?: boolean;
  onCancelReservation?: (id: string) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  currentUser,
  withFavorite = true,
  actionDisabled,
  onCancelReservation,
}) => {
  const router = useRouter();
  const { locale } = useLocale();
  const { t } = useTranslation(locale, "listing");
  const commonT = useTranslation(locale, "common");

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  const getCategoryByLocale = () =>
    categories(commonT.t).find((c) => data.category === c.id)?.label;

  return (
    <div
      onClick={() =>
        !reservation && router.push(`${locale}/listings/${data.id}`)
      }
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
          {reservation ? (
            <Image
              width={500}
              height={500}
              className="
              h-full
              w-full
              object-cover
              transition
            "
              src={data.images[0].url}
              alt="Listing"
            />
          ) : (
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
          )}
          {withFavorite && (
            <div
              className="
            absolute
            top-3
            right-3
          "
            >
              <HeartButton listingId={data.id} currentUser={currentUser} />
            </div>
          )}
          {reservation && (
            <div className="absolute-center hidden group-hover:flex flex-col gap-3 transition">
              <Button
                type="transparent"
                label={t("card.buttons.viewListing")}
                onClick={() => router.push(`/listings/${data.id}`)}
              />
              <Button
                className="bg-rose-500/80 text-white hover:bg-rose-500"
                type="transparent"
                label={t("card.buttons.cancelReservation")}
                disabled={actionDisabled}
                onClick={() => {
                  onCancelReservation && onCancelReservation(reservation.id);
                }}
              />
            </div>
          )}
        </div>
        <div>
          <div className="font-medium">{data.location.shortAddress}</div>
          <div className="font-light text-neutral-500 -mt-1">
            {reservation ? reservationDate : getCategoryByLocale()}
          </div>
        </div>
        <div className="flex flex-row items-center gap-1 -mt-1">
          <div className="font-semibold">
            {DEFAULT_CURRENCY}
            {reservation ? reservation.totalPrice : data.price}
          </div>
          {!reservation && <div className="font-light">{t("card.night")}</div>}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
