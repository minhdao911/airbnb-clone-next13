"use client";

import Container from "@/app/components/container";
import ListingHead from "@/app/components/listings/listing-head";
import ListingInfo from "@/app/components/listings/listing-info";
import ListingReservation from "@/app/components/listings/listing-reservation";
import Map from "@/app/components/map/map";
import useAuthModal from "@/app/hooks/use-auth-modal";
import { SafeListing, SafeSimpleReservation, SafeUser } from "@/app/types";
import { SERVICE_FEE } from "@/constants";
import axios from "axios";
import { addDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { FunctionComponent, useCallback, useMemo, useState } from "react";
import { RangeKeyDict } from "react-date-range";
import toast from "react-hot-toast";

interface ListingClientProps {
  listing: SafeListing & {
    user: SafeUser;
  };
  reservations: SafeSimpleReservation[] | null;
  currentUser: SafeUser | null;
}

const ListingClient: FunctionComponent<ListingClientProps> = ({
  listing,
  reservations,
  currentUser,
}) => {
  const authModal = useAuthModal();
  const router = useRouter();

  const today = new Date();

  const [startDate, setStartDate] = useState<Date | undefined>(today);
  const [endDate, setEndDate] = useState<Date | undefined>(addDays(today, 1));
  const [isLoading, setIsLoading] = useState(false);

  const numOfDates =
    startDate && endDate ? endDate?.getDate() - startDate?.getDate() : 0;
  const totalPrice = listing.price * numOfDates + SERVICE_FEE;

  const disabledDates = useMemo(() => {
    if (!reservations) return [];

    let dates: Date[] = [];
    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const onDateChange = (range: RangeKeyDict) => {
    setStartDate(range.selection.startDate);
    setEndDate(range.selection.endDate);
  };

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return authModal.onOpen("login");
    }
    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate,
        endDate,
        listingId: listing.id,
      })
      .then(() => {
        toast.success("Listing reserved!");
        router.push("/trips");
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [
    listing.id,
    startDate,
    endDate,
    totalPrice,
    currentUser,
    authModal,
    router,
  ]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-5">
          <ListingHead
            title={listing.title}
            images={listing.images}
            location={listing.location.shortAddress}
          />
          <div className="grid grid-cols-[1.5fr_minmax(0,_1fr)] gap-20">
            <ListingInfo
              guestCount={listing.guestCount}
              bedroomCount={listing.bedroomCount}
              bedCount={listing.bedCount}
              bathroomCount={listing.bathroomCount}
              description={listing.description}
              category={listing.category}
              user={listing.user}
              startDate={startDate}
              endDate={endDate}
              disabledDates={disabledDates}
              onDateChange={onDateChange}
            />

            <div className="pt-7">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                startDate={startDate}
                endDate={endDate}
                disabledDates={disabledDates}
                disabled={isLoading}
                onDateChange={onDateChange}
                onCreateReservation={onCreateReservation}
              />
            </div>
          </div>
        </div>
        <div className="pt-10 border-t border-gray-300">
          <p className="text-2xl">Where you will be</p>
          <p className="font-light my-6 tracking-wide">
            {listing.location.address}
          </p>
          <Map location={listing.location} hasSearchBox={false} />
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
