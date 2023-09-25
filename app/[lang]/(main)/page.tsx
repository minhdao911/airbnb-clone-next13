import ClientOnly from "../../components/client-only";
import Container from "../../components/container";
import ListingCard from "../../components/listings/listing-card";
import getListings, { IListingParams } from "../../actions/getListings";
import getCurrentUser from "../../actions/getCurrentUser";
import EmptyState from "../../components/empty-state";
import { createTranslation } from "@/i18n/server";

export default async function HomePage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: IListingParams;
}) {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();
  const { t } = await createTranslation(params.locale, "common");

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title={t("emptyState.defaultTitle")}
          subtitle={t("emptyState.defaultSubtitle")}
          actionLabel={t("emptyState.defaultActionLabel")}
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div
          className="
            pt-24
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            gap-8
          "
        >
          {listings.map((listing: any) => (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
}
