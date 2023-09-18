import PropertiesClient from "./PropertiesClient";
import { EmptyState } from "../components/alerts/EmptyState";

import getCurrentUser from "../actions/dbUser";
import getListings from "@/app/actions/getListings";

export const fetchCache = "force-cache"

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
