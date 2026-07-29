"use client";

import { Container } from "@/shared/ui/Container";
import { Heading } from "@/shared/ui/Heading";
import { ListingCardView } from "@/features/listings/ListingCardView";
import { useTrips } from "@/features/trips/hooks/useTrips";
import { TripsViewProps } from "@/features/trips/types/tripsView.interface";

const TripsView: React.FC<TripsViewProps> = ({
  reservations,
  currentUser,
}) => {
  const { deletingId, onCancel } = useTrips();

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
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
        {reservations.map((reservation) => (
          <ListingCardView
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsView;
