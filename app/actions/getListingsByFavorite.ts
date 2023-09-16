import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";
import { transformLocation, transformImages } from "../types";

export default async function getListingsByFavorite() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return [];
    }

    const listings = await prisma.listing.findMany({
      where: {
        id: {
          in: [...currentUser.favoriteIds],
        },
      },
    });

    return listings.map((listing) => ({
      ...listing,
      location: transformLocation(listing.location),
      images: transformImages(listing.images),
      createdAt: listing.createdAt.toISOString(),
    }));
  } catch (error: any) {
    throw new Error(error);
  }
}
