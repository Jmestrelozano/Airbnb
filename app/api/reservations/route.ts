import { NextResponse } from "next/server";

import prismadb from "@/app/api/db/prismadb";
import getCurrentUser from "@/app/actions/dbUser";

export async function POST(request: Request, res: Response) {
  const response = NextResponse.next();
  response.headers.set(
    "Cache-Control",
    "public, s-maxage=31536000, stale-while-revalidate=59"
  );
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { listingId, startDate, endDate, totalPrice } = body;

  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  const listingAndReservation = await prismadb.listing.update({
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

  return NextResponse.json(listingAndReservation);
}
