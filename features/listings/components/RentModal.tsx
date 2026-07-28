"use client";

import dynamic from "next/dynamic";

import { categories } from "@/features/navigation/utils/categories";
import { Heading } from "@/shared/ui/Heading";
import { Input } from "@/shared/ui/Input";
import { Modal } from "@/shared/ui/Modal";
import { CategoryInput } from "@/shared/ui/CategoryInput";
import { CountrySelect } from "@/shared/ui/CountrySelect";
import { Counter } from "@/shared/ui/Counter";
import { ImageUpload } from "@/shared/ui/ImageUpload";
import { RENT_STEPS } from "@/features/listings/types/rentSteps.type";
import { RentModalProps } from "@/features/listings/types/rentModal.interface";

const Map = dynamic(
  () => import("@/shared/ui/MapBasic").then((component) => component.MapBasic),
  { ssr: false }
);

export const RentModal: React.FC<RentModalProps> = ({
  isOpen,
  isLoading,
  step,
  location,
  category,
  guestCount,
  roomCount,
  bathroomCount,
  imageSrc,
  register,
  errors,
  actionLabel,
  secondaryActionLabel,
  setCustomValue,
  onBack,
  onClose,
  onSubmit,
}) => {
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(value) => setCustomValue("category", value)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === RENT_STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === RENT_STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenitis do you have?"
        />
        <Counter
          onChange={(value) => setCustomValue("guestCount", value)}
          value={guestCount}
          title="Guests"
          subtitle="How many guests do you allow?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue("roomCount", value)}
          value={roomCount}
          title="Rooms"
          subtitle="How many rooms do you have?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue("bathroomCount", value)}
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
        />
      </div>
    );
  }

  if (step === RENT_STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          onChange={(value) => setCustomValue("imageSrc", value)}
          value={imageSrc}
        />
      </div>
    );
  }

  if (step === RENT_STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === RENT_STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title="Airbnb your home!"
      actionLabel={actionLabel}
      onSubmit={onSubmit}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === RENT_STEPS.CATEGORY ? undefined : onBack}
      onClose={onClose}
      body={bodyContent}
    />
  );
};
