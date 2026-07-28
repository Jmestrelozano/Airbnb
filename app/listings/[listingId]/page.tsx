import { EmptyState } from "@/shared/ui/EmptyState";

import ListingClient from "@/features/listings/ListingClient";

import getCurrentUser from "@/features/auth/actions/dbUser";
import getListingById from "@/features/listings/actions/getListingById";
import getReservations from "@/features/reservations/actions/getReservations";

interface IParams {
  listingId?: string;
}

export const dynamic = "force-dynamic";
const ListingPage = async ({ params }: { params: Promise<IParams> }) => {
  const resolvedParams = await params;
  const listing = await getListingById(resolvedParams);
  const reservations = await getReservations(resolvedParams);
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
