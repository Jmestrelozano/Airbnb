import { EmptyState } from "@/shared/ui/EmptyState";

import getReservations from "@/features/reservations/actions/getReservations";
import getCurrentUser from "@/features/auth/actions/dbUser";
import ReservationsView from "@/features/reservations/ReservationsView";

export const dynamic = "force-dynamic";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  return (
    <>
      {reservations.length ? (
        <ReservationsView
          reservations={reservations}
          currentUser={currentUser}
        />
      ) : (
        <EmptyState
          title="No reservations found"
          subtitle="Looks like you have no reservations on your properties."
        />
      )}
    </>
  );
};

export default ReservationsPage;
