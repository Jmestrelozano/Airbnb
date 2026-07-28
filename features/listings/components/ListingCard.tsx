"use client";

import Image from "next/image";

import { Button } from "@/shared/ui/Button";
import { ListingCardViewModel } from "@/features/listings/types/listingCard.interface";

export const ListingCard: React.FC<ListingCardViewModel> = ({
  imageSrc,
  locationLabel,
  subtitle,
  price,
  showNightLabel,
  disabled,
  actionLabel,
  heart,
  onNavigate,
  onActionClick,
}) => {
  return (
    <div onClick={onNavigate} className="col-span-1 cursor-pointer group">
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            loading="lazy"
            fill
            className="object-cover h-full w-full group-hover:scale-110 transition"
            src={imageSrc}
            alt="Listing"
          />
          <div className="absolute top-3 right-3">{heart}</div>
        </div>
        <div className="font-semibold text-lg">{locationLabel}</div>
        <div className="font-light text-neutral-500">{subtitle}</div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {showNightLabel && <div className="font-light">night</div>}
        </div>
        {onActionClick && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={onActionClick}
          />
        )}
      </div>
    </div>
  );
};
