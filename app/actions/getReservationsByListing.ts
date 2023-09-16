import prisma from "@/app/libs/prismadb";

export default async function getReservationsByListing(listingId?: string) {
  try {
    if (!listingId) {
      return null;
    }

    const reservations = await prisma.reservation.findMany({
      where: {
        listingId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
