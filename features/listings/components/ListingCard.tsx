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
  isGuestFavorite,
  rating,
}) => {
  return (
    <div onClick={onNavigate} className="col-span-1 cursor-pointer group">
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            loading="lazy"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
            className="object-cover h-full w-full group-hover:scale-105 transition duration-300"
            src={imageSrc}
            alt="Listing"
          />
          {isGuestFavorite && (
            <div className="absolute top-3 left-3 z-[1] bg-white text-neutral-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
              Favorito entre huéspedes
            </div>
          )}
          <div className="absolute top-3 right-3 z-[1]">{heart}</div>
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="flex flex-row items-start justify-between gap-2">
            <div className="font-semibold text-[15px] text-neutral-800 truncate">
              {locationLabel}
            </div>
            {rating && (
              <div className="flex items-center gap-1 text-[15px] text-neutral-800 shrink-0">
                <span aria-hidden>★</span>
                <span>{rating}</span>
              </div>
            )}
          </div>
          <div className="font-light text-[15px] text-neutral-500 truncate">
            {subtitle}
          </div>
          <div className="flex flex-row items-center gap-1 pt-0.5 text-[15px]">
            <span className="font-semibold text-neutral-800">
              ${price.toLocaleString("es-CO")}
            </span>
            {showNightLabel && (
              <span className="font-light text-neutral-800">noche</span>
            )}
          </div>
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
