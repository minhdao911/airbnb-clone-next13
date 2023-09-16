import ClientOnly from "../components/client-only";
import Container from "../components/container";
import ListingCard from "../components/listings/listing-card";
import getListings from "../actions/getListings";
import getCurrentUser from "../actions/getCurrentUser";

export default async function HomePage() {
  const listings = await getListings();
  const currentUser = await getCurrentUser();

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
            2xl:grid-cols-6
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
