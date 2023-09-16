import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getReservations() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return null;
    }

    const reservations = await prisma.reservation.findMany({
      where: {
        userId: currentUser.id,
      },
      include: {
        listing: true,
        user: true,
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
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
      user: {
        ...reservation.user,
        createdAt: reservation.user.createdAt.toISOString(),
        updatedAt: reservation.user.updatedAt.toISOString(),
        emailVerified: reservation.user.emailVerified?.toISOString() || null,
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
