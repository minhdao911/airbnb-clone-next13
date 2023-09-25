"use client";

import { FunctionComponent } from "react";
import Container from "@/app/components/container";
import HostingMenu from "@/app/components/hosting-menu";
import ListingCard from "@/app/components/listings/listing-card";
import useLocale from "@/app/hooks/use-locale";
import { SafeListing, SafeUser } from "@/app/types";
import { useTranslation } from "@/i18n/client";
import { useRouter } from "next/navigation";
import EmptyState from "@/app/components/empty-state";

interface HostingClientProps {
  listings: SafeListing[];
  currentUser: SafeUser | null;
}

const HostingClient: FunctionComponent<HostingClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const { locale } = useLocale();
  const { t } = useTranslation(locale, "hosting");

  if (!currentUser) {
    router.push(`/${locale}`);
    return null;
  }

  return (
    <>
      <HostingMenu currentUser={currentUser} />
      <Container>
        <h1 className="text-3xl font-medium mt-10">
          {t("title", { name: currentUser.name })}
        </h1>
        <h3 className="text-2xl font-medium mt-10">{t("subtitle")}</h3>
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
                withFavorite={false}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title={t("noListings.title")}
            subtitle={t("noListings.subtitle")}
            actionLabel={t("noListings.actionLabel")}
            onButtonClick={() => router.push(`${locale}/become-a-host`)}
          />
        )}
      </Container>
    </>
  );
};

export default HostingClient;
