"use client";

import { Heading } from "@/shared/ui/Heading";
import { Container } from "@/shared/ui/Container";
import { ListingCardView } from "@/features/listings/ListingCardView";
import { useReservations } from "@/features/reservations/hooks/useReservations";
import { ReservationsViewProps } from "@/features/reservations/types/reservationsView.interface";

const ReservationsView: React.FC<ReservationsViewProps> = ({
  reservations,
  currentUser,
}) => {
  const { deletingId, onCancel } = useReservations();

  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />
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
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsView;
