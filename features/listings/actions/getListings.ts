import type { Listing, Prisma } from "@prisma/client";

import prismadb from "@/shared/lib/prismadb";
import { IListingsParams } from "@/shared/lib/types/global";

export default async function getListings(params: IListingsParams) {
  try {
    const {
      userId,
      roomCount,
      guestCount,
      bathroomCount,
      locationValue,
      startDate,
      endDate,
      category,
    } = params;

    const where: Prisma.ListingWhereInput = {};

    if (userId) {
      where.userId = userId;
    }

    if (category) {
      where.category = category;
    }

    if (roomCount) {
      where.roomCount = {
        gte: +roomCount,
      };
    }

    if (guestCount) {
      where.guestCount = {
        gte: +guestCount,
      };
    }

    if (bathroomCount) {
      where.bathroomCount = {
        gte: +bathroomCount,
      };
    }

    if (locationValue) {
      where.locationValue = locationValue;
    }

    if (startDate && endDate) {
      where.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    const listings = await prismadb.listing.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    return listings.map((listing: Listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
