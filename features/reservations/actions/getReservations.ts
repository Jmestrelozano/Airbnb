import type { Listing, Prisma, Reservation } from "@prisma/client";

import prismadb from "@/shared/lib/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

type ReservationWithListing = Reservation & {
  listing: Listing;
};

export default async function getReservations(params: IParams) {
  try {
    const { listingId, userId, authorId } = params;

    const where: Prisma.ReservationWhereInput = {};

    if (listingId) {
      where.listingId = listingId;
    }

    if (userId) {
      where.userId = userId;
    }

    if (authorId) {
      where.listing = { userId: authorId };
    }

    const reservations = (await prismadb.reservation.findMany({
      where,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })) as ReservationWithListing[];

    return reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
