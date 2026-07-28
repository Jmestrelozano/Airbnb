"use client";

import dynamic from "next/dynamic";

import { Heading } from "@/shared/ui/Heading";
import { CountrySelect } from "@/shared/ui/CountrySelect";
import { CountrySelectValue } from "@/shared/lib/types/global";
import { InputCalendar } from "@/shared/ui/Calendar";
import { Counter } from "@/shared/ui/Counter";
import { Modal } from "@/shared/ui/Modal";
import { SEARCH_STEPS } from "@/features/search/types/searchSteps.type";
import { SearchModalProps } from "@/features/search/types/searchModal.interface";

const Map = dynamic(
  () => import("@/shared/ui/MapBasic").then(({ MapBasic }) => MapBasic),
  { ssr: false }
);

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  step,
  location,
  guestCount,
  roomCount,
  bathroomCount,
  dateRange,
  actionLabel,
  secondaryActionLabel,
  setLocation,
  setGuestCount,
  setRoomCount,
  setBathroomCount,
  setDateRange,
  onBack,
  onSubmit,
  onClose,
}) => {
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna go?"
        subtitle="Find the perfect location!"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === SEARCH_STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go?"
          subtitle="Make sure everyone is free!"
        />
        <InputCalendar
          onChange={(value) => setDateRange(value.selection)}
          value={dateRange}
        />
      </div>
    );
  }

  if (step === SEARCH_STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More information" subtitle="Find your perfect place!" />
        <Counter
          onChange={setGuestCount}
          value={guestCount}
          title="Guests"
          subtitle="How many guests are coming?"
        />
        <hr />
        <Counter
          onChange={setRoomCount}
          value={roomCount}
          title="Rooms"
          subtitle="How many rooms do you need?"
        />
        <hr />
        <Counter
          onChange={setBathroomCount}
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bahtrooms do you need?"
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      title="Filters"
      actionLabel={actionLabel}
      onSubmit={onSubmit}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === SEARCH_STEPS.LOCATION ? undefined : onBack}
      onClose={onClose}
      body={bodyContent}
    />
  );
};
