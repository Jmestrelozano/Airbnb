"use client";

import { Container } from "@/shared/ui/Container";
import { Heading } from "@/shared/ui/Heading";
import { ListingCardView } from "@/features/listings/ListingCardView";
import { FavoritesViewProps } from "@/features/favorites/types/favoritesView.interface";

const FavoritesView: React.FC<FavoritesViewProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <Container>
      <Heading title="Favorites" subtitle="List of places you favorited!" />
      <div
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {listings.map((listing) => (
          <ListingCardView
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesView;
