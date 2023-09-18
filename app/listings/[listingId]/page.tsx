import { EmptyState } from "@/app/components/alerts/EmptyState";

import ListingClient from "./ListingClient";

import getCurrentUser from "@/app/actions/dbUser";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";

interface IParams {
  listingId?: string;
}

export const dynamic = "force-dynamic";
const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <ListingClient
      listing={listing}
      reservations={reservations}
      currentUser={currentUser}
    />
  );
};

export default ListingPage;
