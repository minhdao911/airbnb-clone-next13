import getListingsByFavorite from "@/app/actions/getListingsByFavorite";
import ClientOnly from "@/app/components/client-only";
import WishlistsClient from "./wishlists-client";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { SafeListing, SafeUser } from "@/app/types";

interface WishlistsPageProps {}

const WishlistsPage = async () => {
  const listings = (await getListingsByFavorite()) as SafeListing[];
  const currentUser = (await getCurrentUser()) as SafeUser | null;

  return (
    <ClientOnly>
      <WishlistsClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default WishlistsPage;
