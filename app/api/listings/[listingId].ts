import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/dbUser";
import prismadb from "@/app/api/db/prismadb";

interface IParams {
  listingId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams },
  res: Response
) {
  const response = NextResponse.next();
  response.headers.set(
    "Cache-Control",
    "public, s-maxage=31536000, stale-while-revalidate=59"
  );
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

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
