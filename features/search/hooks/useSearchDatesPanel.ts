"use client";

import { useCallback, useEffect, useState } from "react";

import { SearchDatesMode } from "@/features/search/types/searchDatesPanel.interface";
import { searchDatesFlexOptions } from "@/features/search/utils/searchDatesFlexOptions";

export const useSearchDatesPanel = () => {
  const [mode, setMode] = useState<SearchDatesMode>("dates");
  const [flexDays, setFlexDays] = useState<number | null>(0);
  const [months, setMonths] = useState(1);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px)");
    const update = () => setMonths(mediaQuery.matches ? 2 : 1);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const clearFlexFilter = useCallback(
    (event: React.MouseEvent | React.KeyboardEvent, value: number) => {
      event.stopPropagation();
      if (flexDays === value) {
        setFlexDays(null);
      }
    },
    [flexDays]
  );

  return {
    mode,
    setMode,
    flexDays,
    setFlexDays,
    months,
    flexOptions: searchDatesFlexOptions,
    clearFlexFilter,
  };
};
