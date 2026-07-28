import TripsView from "@/features/trips/TripsView";

import getReservations from "@/features/reservations/actions/getReservations";
import { EmptyState } from "@/shared/ui/EmptyState";

import getCurrentUser from "@/features/auth/actions/dbUser";

export const dynamic = "force-dynamic";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const reservations = await getReservations({ userId: currentUser.id });

  return (
    <>
      {reservations.length ? (
        <TripsView reservations={reservations} currentUser={currentUser} />
      ) : (
        <EmptyState
          title="No trips found"
          subtitle="Looks like you havent reserved any trips."
        />
      )}
    </>
  );
};

export default TripsPage;
