"use client";

import { ListingInfo } from "@/features/listings/components/ListingInfo";
import { useListingInfo } from "@/features/listings/hooks/useListingInfo";
import { ListingInfoProps } from "@/features/listings/types/listingInfo.interface";

export const ListingInfoView: React.FC<ListingInfoProps> = (props) => {
  const { coordinates } = useListingInfo(props.locationValue);
  const { locationValue: _locationValue, ...rest } = props;

  return <ListingInfo {...rest} coordinates={coordinates} />;
};