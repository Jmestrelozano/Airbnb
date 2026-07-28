"use client";

import { Container } from "@/shared/ui/Container";
import { Heading } from "@/shared/ui/Heading";
import { ListingCardView } from "@/features/listings/ListingCardView";
import { useProperties } from "@/features/properties/hooks/useProperties";
import { PropertiesViewProps } from "@/features/properties/types/propertiesView.interface";

const PropertiesView: React.FC<PropertiesViewProps> = ({
  listings,
  currentUser,
}) => {
  const { deletingId, onDelete } = useProperties();

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
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
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onDelete}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesView;
