"use client";

import Image from "next/image";
import { Heading } from "@/shared/ui/Heading";
import { ListingHeadPresentationalProps } from "@/features/listings/types/listingHead.interface";

export const ListingHead: React.FC<ListingHeadPresentationalProps> = ({
  title,
  subtitle,
  imageSrc,
  heart,
}) => {
  return (
    <>
      <Heading title={title} subtitle={subtitle} />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          loading="lazy"
          src={imageSrc}
          fill
          className="object-cover w-full"
          alt="Image"
        />
        <div className="absolute top-5 right-5">{heart}</div>
      </div>
    </>
  );
};
