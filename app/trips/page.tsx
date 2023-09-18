import TripsClient from "./TripsClient";

import getReservations from "@/app/actions/getReservations";
import { EmptyState } from "../components/alerts/EmptyState";

import getCurrentUser from "../actions/dbUser";

export const fetchCache = "force-cache"

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const reservations = await getReservations({ userId: currentUser.id });

  return (
    <>
      {reservations.length ? (
        <TripsClient reservations={reservations} currentUser={currentUser} />
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
