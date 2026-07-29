"use client";

import { BiSearch } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

import { SearchProps } from "@/features/search/types/search.interface";
import { ClearButtonProps } from "@/features/search/types/clearButton.interface";
import { SearchWherePanel } from "@/features/search/components/SearchWherePanel";
import { SearchGuestsPanel } from "@/features/search/components/SearchGuestsPanel";
import { SearchDatesPanelView } from "@/features/search/SearchDatesPanelView";
import { SearchMobileSheetView } from "@/features/search/SearchMobileSheetView";
import { useSearchBarUI } from "@/features/search/hooks/useSearchBarUI";

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
  destinations,
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
    isCompact,
    animateFullIn,
    compactLocation,
    compactDates,
    compactGuests,
    mobileTriggerLabel,
  } = useSearchBarUI({
    isScrolled,
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
          className="hidden sm:block fixed inset-0 bg-black/25 z-[5] search-overlay-enter"
          aria-hidden
        />
      )}

      {isExpanded && activePanel && (
        <SearchMobileSheetView
          activePanel={activePanel}
          locationLabel={locationLabel}
          durationLabel={durationLabel}
          guestLabel={guestLabel}
          hasLocation={hasLocation}
          hasDates={hasDates}
          hasGuests={hasGuests}
          destinations={destinations}
          dateRange={dateRange}
          adults={adults}
          childrenCount={childrenCount}
          infants={infants}
          pets={pets}
          openPanel={(panel) => openPanel(panel)}
          closeSearch={closeSearch}
          onSelectDestination={onSelectDestination}
          clearAll={clearAll}
          setDateRange={setDateRange}
          setAdults={setAdults}
          setChildrenCount={setChildrenCount}
          setInfants={setInfants}
          setPets={setPets}
          onSubmit={onSubmit}
        />
      )}

      <div
        ref={containerRef}
        className={`relative z-10 w-full md:w-auto ${isExpanded ? "md:w-auto" : ""}`}
      >
        <button
          type="button"
          onClick={() => openPanel("where")}
          className="
            sm:hidden
            w-full
            flex flex-row items-center gap-3
            border border-neutral-200
            bg-white shadow-search
            rounded-full
            pl-5 pr-5 py-3.5
            cursor-pointer
          "
        >
          <BiSearch size={20} className="text-neutral-700 shrink-0" />
          <span className="flex flex-col min-w-0 text-left">
            <span className="text-[15px] font-semibold text-neutral-800 truncate leading-tight">
              {mobileTriggerLabel}
            </span>
            {(hasDates || hasGuests) && (
              <span className="text-xs text-neutral-500 truncate">
                {hasDates ? durationLabel : "Cualquier semana"}
                {" · "}
                {hasGuests ? guestLabel : "Añade huéspedes"}
              </span>
            )}
          </span>
        </button>

        <div className="hidden sm:block w-full md:w-auto">
          {isCompact ? (
            <button
              type="button"
              onClick={() => openPanel("where")}
              className="
                search-compact-enter
                w-full md:w-auto
                flex flex-row items-center
                border border-neutral-200
                bg-white shadow-search hover:shadow-search-hover
                rounded-full
                pl-6 pr-2 py-2
                cursor-pointer
                transition-shadow duration-200
                max-w-full
              "
            >
              <span className="flex flex-row items-center min-w-0">
                <span className="text-sm font-semibold text-neutral-800 truncate max-w-[100px] md:max-w-[140px]">
                  {compactLocation}
                </span>
                <span className="mx-2 md:mx-3 h-6 w-px bg-neutral-300 shrink-0" />
                <span className="text-sm font-semibold text-neutral-800 truncate max-w-[100px] md:max-w-[140px]">
                  {compactDates}
                </span>
                <span className="mx-2 md:mx-3 h-6 w-px bg-neutral-300 shrink-0 hidden md:block" />
                <span
                  className={`hidden md:inline text-sm truncate max-w-[140px] ${
                    hasGuests
                      ? "font-semibold text-neutral-800"
                      : "font-normal text-neutral-500"
                  }`}
                >
                  {compactGuests}
                </span>
              </span>
              <span
                className="
                  ml-3 shrink-0
                  flex items-center justify-center
                  bg-airbnb hover:bg-airbnb-hover
                  text-white p-2.5 rounded-full
                  transition
                "
              >
                <BiSearch size={16} />
              </span>
            </button>
          ) : (
            <div
              className={`w-full md:w-auto ${animateFullIn ? "search-full-enter" : ""}`}
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

                  <div
                    ref={whereRef}
                    className={`${segmentClass("where")} flex min-w-[160px] md:min-w-[200px] pl-6 md:pl-8 pr-4 py-3.5`}
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
                        className={`text-sm truncate max-w-[120px] md:max-w-[170px] ${
                          hasLocation
                            ? "text-neutral-800 font-medium"
                            : "text-neutral-500"
                        }`}
                      >
                        {locationLabel}
                      </span>
                    </button>
                    {activePanel === "where" && hasLocation && (
                      <ClearButton
                        label="Quitar destino"
                        onClear={clearLocation}
                      />
                    )}
                  </div>

                  {showAfterWhereDivider && (
                    <div className="h-8 w-px bg-neutral-300 self-center relative z-[1]" />
                  )}

                  <div
                    ref={datesRef}
                    className={`${segmentClass("dates")} flex min-w-[140px] md:min-w-[180px] px-6 md:px-8 py-3.5`}
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
                    <div className="h-8 w-px bg-neutral-300 self-center relative z-[1]" />
                  )}

                  <div className="flex flex-row items-center pl-1 pr-2 gap-2 relative z-[1] shrink-0 flex-1">
                    <div
                      ref={whoRef}
                      className={`${segmentClass("who")} flex min-w-[100px] md:min-w-[160px] flex-1 px-4 md:px-8 py-3.5`}
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
                          className={`text-sm truncate max-w-[90px] md:max-w-[150px] ${
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
            </div>
          )}

          {isExpanded && activePanel === "where" && (
            <SearchWherePanel
              destinations={destinations}
              onSelect={onSelectDestination}
            />
          )}
          {isExpanded && activePanel === "dates" && (
            <SearchDatesPanelView
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
      </div>
    </>
  );
};
