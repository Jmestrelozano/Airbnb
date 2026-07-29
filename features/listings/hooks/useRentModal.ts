"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useStore } from "@/shared/lib/store";
import { Store } from "@/shared/lib/types/store";
import { useAsyncAction } from "@/shared/hooks/useAsyncAction";
import { RENT_STEPS } from "@/features/listings/types/rentSteps.type";
import { useListingApi } from "@/features/listings/hooks/useListingApi";

export const useRentModal = () => {
  const router = useRouter();
  const { onCloseRentModal, isOpenRentModal } = useStore(
    (store: Store) => store
  );
  const { createListing } = useListingApi();
  const { isLoading, run } = useAsyncAction();
  const [step, setStep] = useState(RENT_STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const location = watch("location");
  const category = watch("category");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const setCustomValue = (id: string, value: unknown) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== RENT_STEPS.PRICE) {
      return onNext();
    }

    void run(() => createListing(data), {
      successMessage: "Listing created!",
      onSuccess: () => {
        router.refresh();
        reset();
        setStep(RENT_STEPS.CATEGORY);
        onCloseRentModal();
      },
    });
  };

  const actionLabel = useMemo(() => {
    if (step === RENT_STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === RENT_STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  return {
    isOpen: isOpenRentModal,
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
    onClose: onCloseRentModal,
    onSubmit: handleSubmit(onSubmit),
  };
};
