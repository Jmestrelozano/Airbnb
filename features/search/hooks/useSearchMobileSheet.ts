"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";

import { searchMobileTabs } from "@/features/search/utils/searchMobileTabs";
import {
  SearchMobileSheetInput,
  SearchMobileTabId,
} from "@/features/search/types/searchMobileSheet.interface";
import { SuggestedDestination } from "@/features/search/utils/suggestedDestinations";

function filterDestinations(
  destinations: SuggestedDestination[],
  query: string
) {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) {
    return destinations;
  }

  return destinations.filter(
    (destination) =>
      destination.label.toLowerCase().includes(trimmed) ||
      destination.subtitle.toLowerCase().includes(trimmed)
  );
}

export const useSearchMobileSheet = ({
  activePanel,
  locationLabel,
  durationLabel,
  guestLabel,
  hasLocation,
  hasDates,
  hasGuests,
  destinations,
  dateRange,
  adults,
  childrenCount,
  infants,
  pets,
  openPanel,
  closeSearch,
  onSelectDestination,
  clearAll,
  setDateRange,
  setAdults,
  setChildrenCount,
  setInfants,
  setPets,
  onSubmit,
}: SearchMobileSheetInput) => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<SearchMobileTabId>("stays");
  const [months, setMonths] = useState(1);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 480px)");
    const update = () => setMonths(mediaQuery.matches ? 2 : 1);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const filteredDestinations = useMemo(
    () => filterDestinations(destinations, query),
    [destinations, query]
  );

  const onNext = useCallback(() => {
    if (activePanel === "where") {
      openPanel("dates");
      return;
    }
    if (activePanel === "dates") {
      openPanel("who");
      return;
    }
    onSubmit();
  }, [activePanel, openPanel, onSubmit]);

  const onDateRangeChange = useCallback(
    (value: Range) => {
      setDateRange(value);
    },
    [setDateRange]
  );

  const calendarValue: Range = {
    startDate: dateRange.startDate ?? new Date(),
    endDate: dateRange.endDate ?? new Date(),
    key: "selection",
  };

  return {
    tabs: searchMobileTabs,
    activeTab,
    onTabChange: setActiveTab,
    closeSearch,
    activePanel,
    query,
    onQueryChange: setQuery,
    filteredDestinations,
    onSelectDestination,
    whereCollapsed: {
      panel: "where" as const,
      label: "¿Dónde?",
      value: hasLocation ? locationLabel : "Explora destinos",
      muted: !hasLocation,
    },
    datesCollapsed: {
      panel: "dates" as const,
      label: "¿Cuándo?",
      value: hasDates ? durationLabel : "Agrega fechas",
      muted: !hasDates,
    },
    whoCollapsed: {
      panel: "who" as const,
      label: "Quién",
      value: hasGuests ? guestLabel : "Agrega huéspedes",
      muted: !hasGuests,
    },
    openPanel,
    calendarValue,
    months,
    onDateRangeChange,
    adults,
    childrenCount,
    infants,
    pets,
    setAdults,
    setChildrenCount,
    setInfants,
    setPets,
    clearAll,
    onNext,
    nextLabel: activePanel === "who" ? "Buscar" : "Siguiente",
  };
};
