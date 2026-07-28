import { NextResponse } from "next/server";

import prismadb from "@/app/api/db/prismadb";
import getCurrentUser from "@/app/actions/dbUser";

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<IParams> }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = await params;

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
