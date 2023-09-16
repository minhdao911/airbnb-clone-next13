import prisma from "@/app/libs/prismadb";

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
      createdAt: listing.createdAt.toISOString(),
    }));
  } catch (error: any) {
    throw new Error(error);
  }
}
