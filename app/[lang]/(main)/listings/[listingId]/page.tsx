import getListingById from "@/app/actions/getListingsById";
import ClientOnly from "@/app/components/client-only";
import EmptyState from "@/app/components/empty-state";
import ListingClient from "./listing-client";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservationsByListing from "@/app/actions/getReservationsByListing";
import { createTranslation } from "@/i18n/server";

interface IParams {
  listingId?: string;
  locale: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();
  const listing = await getListingById(params.listingId);
  const reservations = await getReservationsByListing(params.listingId);
  const { t } = await createTranslation(params.locale, "listing");

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState
          title={t("noListing.title")}
          actionLabel={t("noListing.actionLabel")}
        />
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
