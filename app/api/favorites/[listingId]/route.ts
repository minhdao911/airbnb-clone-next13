import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { SafeUser } from "@/app/types";
import { NextResponse } from "next/server";

interface IParams {
  listingId?: string;
}

export async function POST(_: Request, { params }: { params: IParams }) {
  const currentUser = (await getCurrentUser()) as SafeUser | null;

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid listing id");
  }

  const favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds.push(listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(_: Request, { params }: { params: IParams }) {
  const currentUser = (await getCurrentUser()) as SafeUser | null;

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid listing id");
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  const user = await prisma.user.update({
    where: { id: currentUser.id },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}
