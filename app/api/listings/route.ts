import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

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
      category: category.label,
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
