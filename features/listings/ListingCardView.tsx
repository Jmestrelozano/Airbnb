"use client";

import { ListingCard } from "@/features/listings/components/ListingCard";
import { HeartButtonView } from "@/features/favorites/HeartButtonView";
import { useListingCard } from "@/features/listings/hooks/useListingCard";
import { ListingCardProps } from "@/features/listings/types/listingCard.interface";

export const ListingCardView: React.FC<ListingCardProps> = ({
  currentUser,
  ...props
}) => {
  const viewModel = useListingCard({
    ...props,
    heart: (
      <HeartButtonView listingId={props.data.id} currentUser={currentUser} />
    ),
  });

  return <ListingCard {...viewModel} />;
};
