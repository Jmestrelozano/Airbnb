"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

import { useCountries } from "@/shared/hooks/useCountries";
import { getListingPrice } from "@/features/listings/utils/getListingPrice";
import { formatReservationDate } from "@/features/listings/utils/formatReservationDate";
import {
  ListingCardProps,
  ListingCardViewModel,
} from "@/features/listings/types/listingCard.interface";

type UseListingCardParams = Omit<ListingCardProps, "currentUser"> & {
  heart: React.ReactNode;
};

export const useListingCard = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  heart,
}: UseListingCardParams): ListingCardViewModel => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);
  const reservationDate = formatReservationDate(reservation);
  const price = getListingPrice(data.price, reservation);

  const onNavigate = useCallback(() => {
    router.push(`/listings/${data.id}`);
  }, [router, data.id]);

  const onActionClick = useMemo(() => {
    if (!onAction || !actionLabel) {
      return undefined;
    }

    return (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction(actionId);
    };
  }, [onAction, actionLabel, disabled, actionId]);

  return {
    imageSrc: data.imageSrc,
    locationLabel: `${location?.region}, ${location?.label}`,
    subtitle: reservationDate || data.category,
    price,
    showNightLabel: !reservation,
    disabled,
    actionLabel: onAction && actionLabel ? actionLabel : undefined,
    heart,
    onNavigate,
    onActionClick,
  };
};
