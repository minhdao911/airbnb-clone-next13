import getListingById from "@/app/actions/getListingsById";
import ClientOnly from "@/app/components/client-only";
import EmptyState from "@/app/components/empty-state";
import ListingClient from "./listing-client";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservationsByListing from "@/app/actions/getReservationsByListing";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();
  const listing = await getListingById(params.listingId);
  const reservations = await getReservationsByListing(params.listingId);

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </ClientOnly>
  );
};

export default ListingPage;
