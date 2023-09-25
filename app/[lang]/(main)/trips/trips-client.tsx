"use client";

import Container from "@/app/components/container";
import ListingCard from "@/app/components/listings/listing-card";
import { SafeReservation, SafeUser } from "@/app/types";
import { FunctionComponent, useCallback, useMemo, useState } from "react";
import Button from "@/app/components/button";
import { useRouter } from "next/navigation";
import { MdOutlineWavingHand } from "react-icons/md";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-hot-toast";
import { format, isFuture, isPast } from "date-fns";
import useLocale from "@/app/hooks/use-locale";
import { useTranslation } from "@/i18n/client";

interface TripsClientProps {
  reservations: SafeReservation[] | null;
  currentUser: SafeUser | null;
}

const TripsClient: FunctionComponent<TripsClientProps> = ({
  reservations,
  currentUser,
}: TripsClientProps) => {
  const router = useRouter();
  const { locale } = useLocale();
  const { t } = useTranslation(locale, "trips");

  const [isLoading, setIsLoading] = useState(false);

  const upcomingTrips = useMemo(() => {
    return reservations
      ? reservations.filter((reservation) =>
          isFuture(new Date(reservation.endDate))
        )
      : [];
  }, [reservations]);
  const previousTrips = useMemo(() => {
    return reservations
      ? reservations.filter((reservation) =>
          isPast(new Date(reservation.endDate))
        )
      : [];
  }, [reservations]);

  const onCancelReservation = useCallback(
    (id: string) => {
      setIsLoading(true);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled!");
          router.refresh();
        })
        .catch(() => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [router]
  );

  if (!currentUser) {
    router.push(`${locale}/home`);
    return null;
  }

  return (
    <Container>
      <h1 className="text-3xl">{t("title")}</h1>
      {upcomingTrips.length > 0 ? (
        <div
          className="
              pt-5
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              md:grid-cols-3 
              lg:grid-cols-4
              gap-8
            "
        >
          {upcomingTrips.map((reservation: any) => (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              currentUser={currentUser}
              actionDisabled={isLoading}
              onCancelReservation={onCancelReservation}
            />
          ))}
        </div>
      ) : (
        <div className="w-full grid grid-cols-[400px_minmax(0,_1fr)] border border-gray-200 rounded-xl h-[300px] mt-5">
          <div className="p-10 flex flex-col gap-5">
            <MdOutlineWavingHand className="text-rose-500" size={50} />
            <div>
              <p className="text-lg font-semibold">
                {t("noTripsBanner.title")}
              </p>
              <p className="text-sm text-gray-500 font-light">
                {t("noTripsBanner.subtitle")}
              </p>
            </div>
            <Button
              label={t("noTripsBanner.button")}
              onClick={() => router.push(`${locale}/home`)}
            />
          </div>
          <Image
            className="h-[300px] object-cover rounded-r-xl"
            src="/images/family.avif"
            width={1000}
            height={300}
            alt="Trips image"
            loading="lazy"
          />
        </div>
      )}
      {previousTrips.length > 0 && (
        <>
          <h2 className="text-xl mt-10">{t("previousTrips.title")}</h2>
          <div
            className="
              mt-5
              grid 
              grid-cols-1 
              md:grid-cols-2 
              lg:grid-cols-3
              gap-7
            "
          >
            {previousTrips.map((trip) => (
              <PastTripCard
                key={trip.id}
                imgSrc={trip.listing.images[0].url}
                location={trip.listing.location.shortAddress}
                host={trip.user.name || ""}
                startDate={new Date(trip.startDate)}
                endDate={new Date(trip.endDate)}
                translator={t}
                onClick={() =>
                  router.push(`${locale}/listings/${trip.listingId}`)
                }
              />
            ))}
          </div>
        </>
      )}
    </Container>
  );
};

export default TripsClient;

interface PastTripCardProps {
  imgSrc: string;
  location: string;
  host: string;
  startDate: Date;
  endDate: Date;
  translator: any;
  onClick: () => void;
}

const PastTripCard = ({
  imgSrc,
  location,
  host,
  startDate,
  endDate,
  translator,
  onClick,
}: PastTripCardProps) => {
  return (
    <div className="flex items-center gap-4 cursor-pointer" onClick={onClick}>
      <Image
        className="w-[80px] h-[80px] rounded object-cover"
        src={imgSrc}
        alt="listing image"
        width={100}
        height={100}
      />
      <div className="flex flex-col gap-1">
        <p className="font-semibold">{location}</p>
        <p className="text-sm text-gray-500 font-light">
          {translator("previousTrips.hostedBy", { name: host })}
        </p>
        <p className="text-sm text-gray-500 font-light">
          {format(startDate, "PP")} - {format(endDate, "PP")}
        </p>
      </div>
    </div>
  );
};
