import PropertiesClient from "@/features/properties/PropertiesClient";
import { EmptyState } from "@/shared/ui/EmptyState";

import getCurrentUser from "@/features/auth/actions/dbUser";
import getListings from "@/features/listings/actions/getListings";

export const dynamic = "force-dynamic";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const listings = await getListings({ userId: currentUser.id });

  return (
    <>
      {listings.length ? (
        <PropertiesClient listings={listings} currentUser={currentUser} />
      ) : (
        <EmptyState
          title="No properties found"
          subtitle="Looks like you have no properties."
        />
      )}
    </>
  );
};

export default PropertiesPage;
