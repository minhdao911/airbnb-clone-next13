import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { SafeUser } from "@/app/types";

export async function POST(request: Request) {
  const currentUser = (await getCurrentUser()) as SafeUser | null;

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    category,
    location,
    guestCount,
    bedroomCount,
    bedCount,
    bathroomCount,
    images,
    price,
    title,
    description,
  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const listing = await prisma.listing.create({
    data: {
      category: category.id,
      location,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      images,
      price: parseInt(price),
      title,
      description,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
