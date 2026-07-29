"use client";

import { ListingHeadView } from "@/features/listings/ListingHeadView";
import { ListingInfoView } from "@/features/listings/ListingInfoView";
import { ListingReservation } from "@/features/listings/components/ListingReservation";
import { Container } from "@/shared/ui/Container";
import { useListing } from "@/features/listings/hooks/useListing";
import { ListingViewProps } from "@/features/listings/types/listingView.interface";

const ListingView: React.FC<ListingViewProps> = (props) => {
  const {
    listing,
    currentUser,
    category,
    disabledDates,
    dateRange,
    setDateRange,
    totalPrice,
    isLoading,
    onCreateReservation,
  } = useListing(props);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHeadView
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfoView
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingView;
