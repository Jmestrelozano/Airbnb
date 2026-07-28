import { NextResponse } from "next/server";

import getCurrentUser from "@/features/auth/actions/dbUser";
import prismadb from "@/shared/lib/prismadb";

interface IParams {
  listingId?: string;
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<IParams> }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = await params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  const listing = await prismadb.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
