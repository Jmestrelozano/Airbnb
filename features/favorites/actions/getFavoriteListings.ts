import getCurrentUser from "@/features/auth/actions/dbUser";
import prismadb from "@/shared/lib/prismadb";

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favorites = await prismadb.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    return favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toString(),
    }));
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
