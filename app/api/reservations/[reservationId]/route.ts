import { NextResponse } from "next/server";

import prismadb from "@/app/api/db/prismadb";
import getCurrentUser from "@/app/actions/dbUser";

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }, res: Response
) {
  res.headers.set(
    'Cache-Control',
    'public, s-maxage=31536000, stale-while-revalidate=59'
  )
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Invalid ID");
  }

  const reservation = await prismadb.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  });

  return NextResponse.json(reservation);
}
