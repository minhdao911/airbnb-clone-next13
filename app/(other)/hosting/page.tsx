import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingsByUser from "@/app/actions/getListingsByUser";
import ClientOnly from "@/app/components/client-only";
import Container from "@/app/components/container";
import { SafeUser } from "@/app/types";
import ListingCard from "@/app/components/listings/listing-card";
import HostingMenu from "@/app/components/hosting-menu";

const HostingPage = async () => {
  const currentUser = (await getCurrentUser()) as SafeUser | null;
  const listings = await getListingsByUser(currentUser?.id);

  return (
    <ClientOnly>
      <HostingMenu currentUser={currentUser} />
      <Container>
        <h1 className="text-3xl font-medium mt-10">
          Welcome back, {currentUser?.name}
        </h1>
        <h3 className="text-2xl font-medium mt-10">Your listings</h3>
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
          {listings && listings.length > 0 ? (
            <>
              {listings.map((listing: any) => (
                <ListingCard
                  key={listing.id}
                  data={listing}
                  currentUser={currentUser}
                  withFavorite={false}
                />
              ))}
            </>
          ) : (
            <p>You don&apos;t have any listings</p>
          )}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default HostingPage;
