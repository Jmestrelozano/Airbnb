import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/dbUser";
import prismadb from "@/app/api/db/prismadb";

export async function POST(request: Request, res: Response) {
  res.headers.set(
    'Cache-Control',
    'public, s-maxage=31536000, stale-while-revalidate=59'
  )
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const listing = await prismadb.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
