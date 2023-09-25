import prisma from "@/app/libs/prismadb";
import { transformImages, transformLocation } from "../types";

export interface IListingParams {
  location?: string;
  startDate?: string;
  endDate?: string;
  guestCount?: number;
  category?: string;
}

export default async function getListings(params: IListingParams) {
  try {
    const { location, startDate, endDate, guestCount, category } = params;

    let query: any = {};

    if (guestCount) {
      query.guestCount = { gte: +guestCount };
    }
    if (category) {
      query.category = category;
    }
    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    let safeListings = listings.map((listing) => ({
      ...listing,
      images: transformImages(listing.images),
      location: transformLocation(listing.location),
      createdAt: listing.createdAt.toISOString(),
    }));

    if (location) {
      safeListings = safeListings.filter((listing) => {
        return listing.location.address
          .toLowerCase()
          .includes(location.toLowerCase());
      });
    }

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
