import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import ClientOnly from "@/app/components/client-only";
import TripsClient from "./trips-client";
import { SafeReservationWithListing } from "@/app/types";

const TripsPage = async () => {
  const reservations = (await getReservations()) as
    | SafeReservationWithListing[]
    | null;
  const currentUser = await getCurrentUser();

  return (
    <ClientOnly>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default TripsPage;
