import { EmptyState } from "@/shared/ui/EmptyState";
import { Container } from "@/shared/ui/Container";
import { ListingCardView } from "@/features/listings/ListingCardView";

import getCurrentUser from "@/features/auth/actions/dbUser";
import getListings from "@/features/listings/actions/getListings";

import { HomeProps } from "@/features/listings/types/home.interface";

export const dynamic = "force-dynamic";

export default async function Home({ searchParams }: HomeProps) {
  const resolvedSearchParams = await searchParams;
  const listings = await getListings(resolvedSearchParams);
  const currentUser = await getCurrentUser();

  return (
    <>
      {listings.length ? (
        <Container>
          <div
            className="
              pt-2
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              md:grid-cols-3 
              lg:grid-cols-4
              xl:grid-cols-5
              2xl:grid-cols-6
              gap-x-6
              gap-y-8
            "
          >
            {listings.map((listing) => (
              <ListingCardView
                currentUser={currentUser}
                key={listing.id}
                data={listing}
              />
            ))}
          </div>
        </Container>
      ) : (
        <EmptyState showReset />
      )}
    </>
  );
}
