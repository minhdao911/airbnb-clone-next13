import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingsByUser from "@/app/actions/getListingsByUser";
import ClientOnly from "@/app/components/client-only";
import { SafeListing, SafeUser } from "@/app/types";
import HostingClient from "./hosting-client";

const HostingPage = async () => {
  const currentUser = (await getCurrentUser()) as SafeUser | null;
  const listings = (await getListingsByUser(currentUser?.id)) as SafeListing[];

  return (
    <ClientOnly>
      <HostingClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default HostingPage;
