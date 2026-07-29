"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Range } from "react-date-range";
import { useRouter, useSearchParams } from "next/navigation";
import { format, differenceInDays } from "date-fns";
import { es } from "date-fns/locale";

import { useCountries } from "@/shared/hooks/useCountries";
import { buildSearchQueryUrl } from "@/features/search/utils/buildSearchQueryUrl";
import {
  suggestedDestinations,
  SuggestedDestination,
} from "@/features/search/utils/suggestedDestinations";
import { SearchPanel } from "@/features/search/types/searchPanel.type";
import { CountrySelectValue } from "@/shared/lib/types/global";

function getInitialFromParams(
  params: URLSearchParams | null,
  getByValue: (value: string) => CountrySelectValue | undefined
) {
  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const country = locationValue ? getByValue(locationValue) : undefined;

  return {
    location: country,
    locationLabel: country?.label ?? "Explora destinos",
    dateRange: {
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      key: "selection",
    } as Range,
    adults: guestCount ? Number(guestCount) : 0,
  };
}

export const useSearch = (isScrolled = false) => {
  const router = useRouter();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const initial = useMemo(
    () => getInitialFromParams(params, getByValue),
    // Solo al montar / cambiar query string
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [params?.toString()]
  );

  const [isExpanded, setIsExpanded] = useState(false);
  const [activePanel, setActivePanel] = useState<SearchPanel>(null);
  const wasScrolledRef = useRef(isScrolled);
  const [locationLabel, setLocationLabel] = useState(initial.locationLabel);
  const [location, setLocation] = useState<CountrySelectValue | undefined>(
    initial.location
  );
  const [dateRange, setDateRange] = useState<Range>(initial.dateRange);
  const [adults, setAdults] = useState(initial.adults);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);

  const durationLabel = useMemo(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const sameDay =
        differenceInDays(dateRange.endDate, dateRange.startDate) === 0;

      if (sameDay) {
        return format(dateRange.startDate, "d MMM", { locale: es });
      }

      return `${format(dateRange.startDate, "d MMM", { locale: es })} - ${format(
        dateRange.endDate,
        "d MMM",
        { locale: es }
      )}`;
    }

    return "Agrega fechas";
  }, [dateRange]);

  const guestLabel = useMemo(() => {
    const total = adults + childrenCount;
    if (total === 0) {
      return "¿Cuántos?";
    }

    const parts = [`${total} ${total === 1 ? "huésped" : "huéspedes"}`];
    if (infants > 0) {
      parts.push(`${infants} ${infants === 1 ? "bebé" : "bebés"}`);
    }
    if (pets > 0) {
      parts.push(`${pets} ${pets === 1 ? "mascota" : "mascotas"}`);
    }

    return parts.join(", ");
  }, [adults, childrenCount, infants, pets]);

  const openPanel = useCallback((panel: SearchPanel) => {
    setIsExpanded(true);
    setActivePanel(panel);
  }, []);

  const closeSearch = useCallback(() => {
    setIsExpanded(false);
    setActivePanel(null);
  }, []);

  // Al bajar (estilo Airbnb): cierra paneles y colapsa a la barra compacta
  useEffect(() => {
    const justScrolledDown = isScrolled && !wasScrolledRef.current;
    wasScrolledRef.current = isScrolled;

    if (justScrolledDown && isExpanded) {
      closeSearch();
    }
  }, [isScrolled, isExpanded, closeSearch]);

  const onSelectDestination = useCallback(
    (destination: SuggestedDestination) => {
      setLocationLabel(destination.label);

      if (destination.locationValue) {
        const country = getByValue(destination.locationValue);
        setLocation(country);
      } else {
        setLocation(undefined);
      }

      openPanel("dates");
    },
    [getByValue, openPanel]
  );

  const hasLocation =
    locationLabel !== "Explora destinos" && Boolean(locationLabel);
  const hasDates = Boolean(dateRange.startDate && dateRange.endDate);
  const hasGuests = adults + childrenCount + infants + pets > 0;

  const clearLocation = useCallback(() => {
    setLocation(undefined);
    setLocationLabel("Explora destinos");
  }, []);

  const clearDates = useCallback(() => {
    setDateRange({
      startDate: undefined,
      endDate: undefined,
      key: "selection",
    });
  }, []);

  const clearGuests = useCallback(() => {
    setAdults(0);
    setChildrenCount(0);
    setInfants(0);
    setPets(0);
  }, []);

  const clearAll = useCallback(() => {
    clearLocation();
    clearDates();
    clearGuests();
  }, [clearLocation, clearDates, clearGuests]);

  const onSubmit = useCallback(() => {
    const guestCount = Math.max(1, adults + childrenCount);

    const url = buildSearchQueryUrl({
      paramsString: params?.toString(),
      location,
      guestCount,
      roomCount: 1,
      bathroomCount: 1,
      dateRange,
    });

    closeSearch();
    router.push(url);
  }, [
    adults,
    childrenCount,
    params,
    location,
    dateRange,
    closeSearch,
    router,
  ]);

  return {
    isScrolled,
    isExpanded,
    activePanel,
    locationLabel,
    durationLabel,
    guestLabel,
    dateRange,
    adults,
    childrenCount,
    infants,
    pets,
    hasLocation,
    hasDates,
    hasGuests,
    destinations: suggestedDestinations,
    openPanel,
    closeSearch,
    onSelectDestination,
    clearLocation,
    clearDates,
    clearGuests,
    clearAll,
    setDateRange,
    setAdults,
    setChildrenCount,
    setInfants,
    setPets,
    onSubmit,
  };
};
