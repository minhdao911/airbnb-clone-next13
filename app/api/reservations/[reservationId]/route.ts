import getCurrentUser from "@/app/actions/getCurrentUser";
import { SafeUser } from "@/app/types";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
  reservationId?: string;
}

export async function DELETE(_: Request, { params }: { params: IParams }) {
  const currentUser = (await getCurrentUser()) as SafeUser | null;

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Invalid reservation id");
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  });

  return NextResponse.json(reservation);
}
