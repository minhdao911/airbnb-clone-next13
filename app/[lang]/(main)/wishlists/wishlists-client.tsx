"use client";

import Container from "@/app/components/container";
import ListingCard from "@/app/components/listings/listing-card";
import useLocale from "@/app/hooks/use-locale";
import { SafeListing, SafeUser } from "@/app/types";
import { useTranslation } from "@/i18n/client";
import { useRouter } from "next/navigation";
import { FunctionComponent } from "react";

interface WishlistsClientProps {
  listings: SafeListing[];
  currentUser: SafeUser | null;
}

const WishlistsClient: FunctionComponent<WishlistsClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const { locale } = useLocale();
  const { t } = useTranslation(locale, "wishlists");

  if (!currentUser) {
    router.push(`${locale}/home`);
    return null;
  }

  return (
    <Container>
      <h1 className="text-3xl">{t("title")}</h1>
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
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default WishlistsClient;
