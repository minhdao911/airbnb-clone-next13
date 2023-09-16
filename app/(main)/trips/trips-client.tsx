"use client";

import Container from "@/app/components/container";
import ListingCard from "@/app/components/listings/listing-card";
import { SafeReservation, SafeUser } from "@/app/types";
import { FunctionComponent, useCallback, useState } from "react";
import Button from "@/app/components/button";
import { useRouter } from "next/navigation";
import { MdOutlineWavingHand } from "react-icons/md";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-hot-toast";

interface TripsClientProps {
  reservations: SafeReservation[] | null;
  currentUser: SafeUser | null;
}

const TripsClient: FunctionComponent<TripsClientProps> = ({
  reservations,
  currentUser,
}: TripsClientProps) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

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
    router.push("/home");
    return null;
  }

  return (
    <Container>
      <h1 className="text-3xl">Trips</h1>
      {reservations && reservations.length > 0 ? (
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
          <>
            {reservations.map((reservation: any) => (
              <ListingCard
                key={reservation.id}
                data={reservation.listing}
                reservation={reservation}
                currentUser={currentUser}
                actionDisabled={isLoading}
                onCancelReservation={onCancelReservation}
              />
            ))}
          </>
        </div>
      ) : (
        <div className="w-full grid grid-cols-[400px_minmax(0,_1fr)] border border-gray-200 rounded-xl h-[300px] mt-5">
          <div className="p-10 flex flex-col gap-5">
            <MdOutlineWavingHand className="text-rose-500" size={50} />
            <div>
              <p className="text-lg font-semibold">No trips booked...yet!</p>
              <p className="text-sm text-gray-500 font-light">
                Time to dust off your bags and start planning your next
                adventure
              </p>
            </div>
            <Button
              label="Start searching"
              onClick={() => router.push("/home")}
            />
          </div>
          <Image
            className="h-[300px] object-cover rounded-r-xl"
            src="/images/family.avif"
            width={1000}
            height={300}
            alt="Trips image"
          />
        </div>
      )}
    </Container>
  );
};

export default TripsClient;
