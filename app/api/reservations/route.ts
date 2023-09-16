import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { SafeUser } from "@/app/types";

export async function POST(request: Request) {
  const currentUser = (await getCurrentUser()) as SafeUser | null;

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { startDate, endDate, totalPrice, listingId } = body;

  if (!startDate || !endDate || !totalPrice || !listingId) {
    return NextResponse.error();
  }

  const listingReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });

  return NextResponse.json(listingReservation);
}
