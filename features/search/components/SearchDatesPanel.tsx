"use client";

import { es } from "date-fns/locale";
import { IoClose } from "react-icons/io5";

import { InputCalendar } from "@/shared/ui/Calendar";
import { SearchDatesPanelProps } from "@/features/search/types/searchDatesPanel.interface";

export const SearchDatesPanel: React.FC<SearchDatesPanelProps> = ({
  dateRange,
  onChange,
  mode,
  setMode,
  flexDays,
  setFlexDays,
  months,
  flexOptions,
  clearFlexFilter,
}) => {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+12px)] w-[min(100vw-1.5rem,780px)] max-w-[calc(100vw-1.5rem)] bg-white rounded-[24px] sm:rounded-[32px] shadow-[0_6px_20px_rgba(0,0,0,0.2)] border border-neutral-100 p-4 sm:p-6 z-50 search-panel-enter-center overflow-x-auto">
      <div className="flex justify-center mb-4 sm:mb-6">
        <div className="inline-flex bg-neutral-100 rounded-full p-1">
          <button
            type="button"
            onClick={() => setMode("dates")}
            className={`px-4 sm:px-6 py-2 rounded-full text-sm font-semibold transition ${
              mode === "dates"
                ? "bg-white shadow-sm text-neutral-800"
                : "text-neutral-600"
            }`}
          >
            Fechas
          </button>
          <button
            type="button"
            onClick={() => setMode("flexible")}
            className={`px-4 sm:px-6 py-2 rounded-full text-sm font-semibold transition ${
              mode === "flexible"
                ? "bg-white shadow-sm text-neutral-800"
                : "text-neutral-600"
            }`}
          >
            Flexible
          </button>
        </div>
      </div>

      {mode === "dates" ? (
        <>
          <div className="flex justify-center airbnb-calendar">
            <InputCalendar
              value={dateRange}
              onChange={(value) => onChange(value.selection)}
              months={months}
              direction="horizontal"
              locale={es}
              rangeColors={["#ebebeb"]}
            />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 pt-2">
            {flexOptions.map((option) => {
              const isSelected = flexDays === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFlexDays(option.value)}
                  className={`
                    inline-flex items-center gap-1.5
                    px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition
                    ${
                      isSelected
                        ? "bg-white border border-neutral-800 text-neutral-800"
                        : "bg-neutral-100 border border-transparent text-neutral-700 hover:border-neutral-300"
                    }
                  `}
                >
                  <span>{option.label}</span>
                  {isSelected && (
                    <span
                      role="button"
                      tabIndex={0}
                      aria-label={`Quitar ${option.label}`}
                      onClick={(e) => clearFlexFilter(e, option.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          clearFlexFilter(e, option.value);
                        }
                      }}
                      className="
                        ml-0.5
                        inline-flex items-center justify-center
                        w-4 h-4 rounded-full
                        hover:bg-neutral-200
                        transition
                      "
                    >
                      <IoClose size={14} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <div className="py-16 text-center text-neutral-500 text-sm">
          Elige fechas flexibles próximamente
        </div>
      )}
    </div>
  );
};
