"use client";

import dynamic from "next/dynamic";

import { ListingCategory } from "@/features/listings/components/ListingCategory";
import { Avatar } from "@/shared/ui/Avatar";
import { ListingInfoPresentationalProps } from "@/features/listings/types/listingInfo.interface";

const Map = dynamic(
  () => import("@/shared/ui/MapBasic").then((component) => component.MapBasic),
  {
    ssr: false,
  }
);

export const ListingInfo: React.FC<ListingInfoPresentationalProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  coordinates,
}) => {
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category?.label}
          description={category?.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};
