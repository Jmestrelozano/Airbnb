import { EmptyState } from "../components/alerts/EmptyState";
import FavoritesClient from "./FavoritesClient";

import getCurrentUser from "../actions/dbUser";
import getFavoriteListings from "../actions/getFavoriteListings";

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

  return <FavoritesClient listings={listings} currentUser={currentUser} />;
};

export default ListingPage;
