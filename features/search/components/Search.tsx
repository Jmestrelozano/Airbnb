"use client";

import { BiSearch } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

import { SearchProps } from "@/features/search/types/search.interface";
import { SearchWherePanel } from "@/features/search/components/SearchWherePanel";
import { SearchDatesPanel } from "@/features/search/components/SearchDatesPanel";
import { SearchGuestsPanel } from "@/features/search/components/SearchGuestsPanel";
import { useSearchBarUI } from "@/features/search/hooks/useSearchBarUI";

type ClearButtonProps = {
  label: string;
  onClear: () => void;
};

const ClearButton: React.FC<ClearButtonProps> = ({ label, onClear }) => (
  <button
    type="button"
    aria-label={label}
    onClick={(e) => {
      e.stopPropagation();
      onClear();
    }}
    className="
      ml-2 shrink-0
      w-6 h-6
      rounded-full
      bg-neutral-200 hover:bg-neutral-300
      inline-flex items-center justify-center
      transition
    "
  >
    <IoClose size={14} className="text-neutral-800" />
  </button>
);

export const Search: React.FC<SearchProps> = ({
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
  destinations,
  openPanel,
  closeSearch,
  onSelectDestination,
  clearLocation,
  clearDates,
  clearGuests,
  setDateRange,
  setAdults,
  setChildrenCount,
  setInfants,
  setPets,
  onSubmit,
}) => {
  const {
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
  } = useSearchBarUI({
    isExpanded,
    activePanel,
    closeSearch,
    locationLabel,
    durationLabel,
    guestLabel,
    hasLocation,
    hasDates,
    hasGuests,
  });

  return (
    <>
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/25 z-[5] search-overlay-enter"
          aria-hidden
        />
      )}

      <div
        ref={containerRef}
        className={`relative z-10 ${isExpanded ? "w-full md:w-auto" : ""}`}
      >
        <div
          className={`
            border border-neutral-200
            w-full md:w-auto
            rounded-full
            transition-[background-color,box-shadow] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
            ${
              isExpanded
                ? "bg-neutral-100 shadow-none"
                : "bg-white shadow-search hover:shadow-search-hover cursor-pointer"
            }
          `}
        >
          <div ref={barRef} className="relative flex flex-row items-center">
            {isExpanded && (
              <div
                aria-hidden
                className={`
                  absolute top-0 bottom-0 rounded-full bg-white
                  shadow-[0_2px_8px_rgba(0,0,0,0.12)]
                  pointer-events-none z-0
                  ${pillReady ? "search-pill" : "search-pill-instant"}
                `}
                style={{
                  left: pillStyle.left,
                  width: pillStyle.width,
                  opacity: pillStyle.opacity,
                }}
              />
            )}

            {/* Dónde */}
            <div
              ref={whereRef}
              className={`${segmentClass("where")} hidden sm:flex min-w-[200px] pl-8 pr-4 py-3.5`}
            >
              <button
                type="button"
                onClick={() => openPanel("where")}
                className="flex flex-col min-w-0 flex-1 text-left cursor-pointer"
              >
                <span className="text-xs font-semibold text-neutral-800 leading-tight">
                  Dónde
                </span>
                <span
                  className={`text-sm truncate max-w-[170px] ${
                    hasLocation
                      ? "text-neutral-800 font-medium"
                      : "text-neutral-500"
                  }`}
                >
                  {locationLabel}
                </span>
              </button>
              {activePanel === "where" && hasLocation && (
                <ClearButton label="Quitar destino" onClear={clearLocation} />
              )}
            </div>

            <button
              type="button"
              onClick={() => openPanel("where")}
              className="sm:hidden text-sm font-semibold px-6 py-3 text-neutral-800"
            >
              {locationLabel}
            </button>

            {showAfterWhereDivider && (
              <div className="hidden sm:block h-8 w-px bg-neutral-300 self-center relative z-[1]" />
            )}

            {/* Fechas */}
            <div
              ref={datesRef}
              className={`${segmentClass("dates")} hidden sm:flex min-w-[180px] px-8 py-3.5`}
            >
              <button
                type="button"
                onClick={() => openPanel("dates")}
                className="flex flex-col min-w-0 flex-1 text-left cursor-pointer"
              >
                <span className="text-xs font-semibold text-neutral-800 leading-tight">
                  Fechas
                </span>
                <span
                  className={`text-sm truncate ${
                    hasDates
                      ? "text-neutral-800 font-medium"
                      : "text-neutral-500"
                  }`}
                >
                  {durationLabel}
                </span>
              </button>
              {activePanel === "dates" && hasDates && (
                <ClearButton label="Quitar fechas" onClear={clearDates} />
              )}
            </div>

            {showAfterDatesDivider && (
              <div className="hidden sm:block h-8 w-px bg-neutral-300 self-center relative z-[1]" />
            )}

            {/* Quién + Buscar */}
            <div className="flex flex-row items-center pl-1 pr-2 gap-2 flex-1 relative z-[1]">
              <div
                ref={whoRef}
                className={`${segmentClass("who")} hidden sm:flex min-w-[160px] flex-1 px-8 py-3.5`}
              >
                <button
                  type="button"
                  onClick={() => openPanel("who")}
                  className="flex flex-col min-w-0 flex-1 text-left cursor-pointer"
                >
                  <span className="text-xs font-semibold text-neutral-800 leading-tight">
                    Quién
                  </span>
                  <span
                    className={`text-sm truncate max-w-[150px] ${
                      hasGuests
                        ? "text-neutral-800 font-medium"
                        : "text-neutral-500"
                    }`}
                  >
                    {guestLabel}
                  </span>
                </button>
                {activePanel === "who" && hasGuests && (
                  <ClearButton
                    label="Quitar huéspedes"
                    onClear={clearGuests}
                  />
                )}
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (isExpanded) {
                    onSubmit();
                  } else {
                    openPanel("where");
                  }
                }}
                className={`
                  flex items-center justify-center gap-2
                  text-white transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] shrink-0
                  ${
                    isExpanded
                      ? "bg-gradient-to-r from-[#E61E4D] to-[#D70466] hover:from-[#D90B63] hover:to-[#BD1E59] px-4 py-3 rounded-full"
                      : "bg-airbnb hover:bg-airbnb-hover p-2.5 rounded-full"
                  }
                `}
              >
                <BiSearch size={18} />
                {isExpanded && (
                  <span className="font-semibold text-sm pr-1 animate-[search-overlay-in_200ms_ease]">
                    Buscar
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {isExpanded && activePanel === "where" && (
          <SearchWherePanel
            destinations={destinations}
            onSelect={onSelectDestination}
          />
        )}
        {isExpanded && activePanel === "dates" && (
          <SearchDatesPanel
            dateRange={{
              startDate: dateRange.startDate ?? new Date(),
              endDate: dateRange.endDate ?? new Date(),
              key: "selection",
            }}
            onChange={setDateRange}
          />
        )}
        {isExpanded && activePanel === "who" && (
          <SearchGuestsPanel
            adults={adults}
            childrenCount={childrenCount}
            infants={infants}
            pets={pets}
            setAdults={setAdults}
            setChildrenCount={setChildrenCount}
            setInfants={setInfants}
            setPets={setPets}
          />
        )}
      </div>
    </>
  );
};
