"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { SearchPanel } from "@/features/search/types/searchPanel.type";

type PillStyle = {
  left: number;
  width: number;
  opacity: number;
};

type UseSearchBarUIParams = {
  isExpanded: boolean;
  activePanel: SearchPanel;
  closeSearch: () => void;
  locationLabel: string;
  durationLabel: string;
  guestLabel: string;
  hasLocation: boolean;
  hasDates: boolean;
  hasGuests: boolean;
};

export const useSearchBarUI = ({
  isExpanded,
  activePanel,
  closeSearch,
  locationLabel,
  durationLabel,
  guestLabel,
  hasLocation,
  hasDates,
  hasGuests,
}: UseSearchBarUIParams) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const whereRef = useRef<HTMLDivElement>(null);
  const datesRef = useRef<HTMLDivElement>(null);
  const whoRef = useRef<HTMLDivElement>(null);
  const prevPanelRef = useRef<SearchPanel>(null);

  const [pillStyle, setPillStyle] = useState<PillStyle>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [pillReady, setPillReady] = useState(false);

  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        closeSearch();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [isExpanded, closeSearch]);

  useLayoutEffect(() => {
    if (!isExpanded || !activePanel) {
      setPillStyle((prev) => ({ ...prev, opacity: 0 }));
      setPillReady(false);
      prevPanelRef.current = null;
      return;
    }

    const segmentRefs: Record<
      Exclude<SearchPanel, null>,
      React.RefObject<HTMLDivElement | null>
    > = {
      where: whereRef,
      dates: datesRef,
      who: whoRef,
    };

    const updatePill = () => {
      const bar = barRef.current;
      const segment = segmentRefs[activePanel].current;

      if (!bar || !segment) {
        return;
      }

      const barRect = bar.getBoundingClientRect();
      const segmentRect = segment.getBoundingClientRect();

      setPillStyle({
        left: segmentRect.left - barRect.left,
        width: segmentRect.width,
        opacity: 1,
      });
    };

    updatePill();

    const isFirstOpen = prevPanelRef.current === null;
    prevPanelRef.current = activePanel;

    if (isFirstOpen) {
      // Primer frame sin transición para que no salte desde left:0
      requestAnimationFrame(() => setPillReady(true));
    } else {
      setPillReady(true);
    }

    window.addEventListener("resize", updatePill);
    return () => window.removeEventListener("resize", updatePill);
  }, [
    activePanel,
    isExpanded,
    locationLabel,
    durationLabel,
    guestLabel,
    hasLocation,
    hasDates,
    hasGuests,
  ]);

  const segmentClass = (panel: Exclude<SearchPanel, null>) =>
    `
      relative z-[1] flex flex-row items-center
      rounded-full transition-colors duration-200
      ${
        activePanel === panel
          ? ""
          : isExpanded
            ? "hover:bg-neutral-200/70"
            : ""
      }
    `;

  const showAfterWhereDivider =
    !isExpanded || (activePanel !== "where" && activePanel !== "dates");
  const showAfterDatesDivider =
    !isExpanded || (activePanel !== "dates" && activePanel !== "who");

  return {
    containerRef,
    barRef,
    whereRef,
    datesRef,
    whoRef,
    pillStyle,
    pillReady,
    segmentClass,
    showAfterWhereDivider,
    showAfterDatesDivider,
  };
};
