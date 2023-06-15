import { Suspense } from "react";
import Loading from "../loading";
import { EmptyState } from "../components/alerts/EmptyState";
import FavoritesClient from "./FavoritesClient";

import getCurrentUser from "../actions/dbUser";
import getFavoriteListings from "../actions/getFavoriteListings";

export const dynamic = "force-dynamic";

const ListingPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listings."
      />
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <FavoritesClient listings={listings} currentUser={currentUser} />
    </Suspense>
  );
};

export default ListingPage;
