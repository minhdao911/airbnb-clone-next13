"use client";

import { FunctionComponent } from "react";
import Container from "@/app/components/container";
import EmptyState from "@/app/components/empty-state";
import ListingCard from "@/app/components/listings/listing-card";
import useLocale from "@/app/hooks/use-locale";
import { SafeListing, SafeUser } from "@/app/types";
import { useTranslation } from "@/i18n/client";
import { useRouter } from "next-nprogress-bar";

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
    router.push(`/${locale}`);
    return null;
  }

  return (
    <Container>
      <h1 className="text-3xl">{t("title")}</h1>
      {listings && listings.length > 0 ? (
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
      ) : (
        <EmptyState
          title={t("noFavorites.title")}
          actionLabel={t("noFavorites.actionLabel")}
        />
      )}
    </Container>
  );
};

export default WishlistsClient;
