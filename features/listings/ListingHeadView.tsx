"use client";

import { ListingHead } from "@/features/listings/components/ListingHead";
import { HeartButtonView } from "@/features/favorites/HeartButtonView";
import { useListingHead } from "@/features/listings/hooks/useListingHead";
import { ListingHeadProps } from "@/features/listings/types/listingHead.interface";

export const ListingHeadView: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser,
}) => {
  const { subtitle } = useListingHead({ locationValue });

  return (
    <ListingHead
      title={title}
      subtitle={subtitle}
      imageSrc={imageSrc}
      heart={
        <HeartButtonView listingId={id} currentUser={currentUser} />
      }
    />
  );
};
