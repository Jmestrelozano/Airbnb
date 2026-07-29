"use client";

import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { useRouter, useSearchParams } from "next/navigation";

import { CountrySelectValue } from "@/shared/lib/types/global";
import { Store } from "@/shared/lib/types/store";
import { useStore } from "@/shared/lib/store";
import { buildSearchQueryUrl } from "@/features/search/utils/buildSearchQueryUrl";
import { SEARCH_STEPS } from "@/features/search/types/searchSteps.type";

export const useSearchModal = () => {
  const router = useRouter();
  const { onCloseSearchModal, isOpenSearchModal } = useStore(
    (store: Store) => store
  );
  const params = useSearchParams();

  const [step, setStep] = useState(SEARCH_STEPS.LOCATION);
  const [location, setLocation] = useState<CountrySelectValue>();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== SEARCH_STEPS.INFO) {
      return onNext();
    }

    const url = buildSearchQueryUrl({
      paramsString: params?.toString(),
      location,
      guestCount,
      roomCount,
      bathroomCount,
      dateRange,
    });

    setStep(SEARCH_STEPS.LOCATION);
    onCloseSearchModal();
    router.push(url);
  }, [
    step,
    onCloseSearchModal,
    location,
    router,
    guestCount,
    roomCount,
    dateRange,
    onNext,
    bathroomCount,
    params,
  ]);

  const actionLabel = useMemo(() => {
    if (step === SEARCH_STEPS.INFO) {
      return "Search";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === SEARCH_STEPS.LOCATION) {
      return undefined;
    }

    return "Back";
  }, [step]);

  return {
    isOpen: isOpenSearchModal,
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
    onClose: onCloseSearchModal,
  };
};
