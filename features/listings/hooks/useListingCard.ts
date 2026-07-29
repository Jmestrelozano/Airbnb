"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

import { useCountries } from "@/shared/hooks/useCountries";
import { getListingPrice } from "@/features/listings/utils/getListingPrice";
import { formatReservationDate } from "@/features/listings/utils/formatReservationDate";
import { getCategoryDisplayLabel } from "@/features/navigation/utils/categories";
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

  const categoryLabel = getCategoryDisplayLabel(data.category);
  const idSeed = data.id
    .split("")
    .reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
  const rating = (4.7 + (idSeed % 30) / 100).toFixed(2);
  const isGuestFavorite = idSeed % 3 !== 0;

  return {
    imageSrc: data.imageSrc,
    locationLabel: location?.label
      ? `${categoryLabel} en ${location.label}`
      : categoryLabel,
    subtitle: reservationDate || location?.region || categoryLabel,
    price,
    showNightLabel: !reservation,
    disabled,
    actionLabel: onAction && actionLabel ? actionLabel : undefined,
    heart,
    onNavigate,
    onActionClick,
    isGuestFavorite,
    rating,
  };
};
