import prisma from "@/app/libs/prismadb";
import { transformImages, transformLocation } from "../types";

export default async function getListingsByUser(userId?: string) {
  try {
    if (!userId) {
      return null;
    }

    const listings = await prisma.listing.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return listings.map((listing) => ({
      ...listing,
      images: transformImages(listing.images),
      location: transformLocation(listing.location),
      createdAt: listing.createdAt.toISOString(),
    }));
  } catch (error: any) {
    throw new Error(error);
  }
}
