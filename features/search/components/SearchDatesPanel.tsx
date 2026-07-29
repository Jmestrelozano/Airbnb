"use client";

import { useState } from "react";
import { Range } from "react-date-range";
import { es } from "date-fns/locale";
import { IoClose } from "react-icons/io5";

import { InputCalendar } from "@/shared/ui/Calendar";

const FLEX_OPTIONS = [
  { label: "Fechas exactas", value: 0 },
  { label: "± 1 día", value: 1 },
  { label: "± 2 días", value: 2 },
  { label: "± 3 días", value: 3 },
  { label: "± 7 días", value: 7 },
  { label: "± 14 días", value: 14 },
];

type SearchDatesPanelProps = {
  dateRange: Range;
  onChange: (value: Range) => void;
};

export const SearchDatesPanel: React.FC<SearchDatesPanelProps> = ({
  dateRange,
  onChange,
}) => {
  const [mode, setMode] = useState<"dates" | "flexible">("dates");
  const [flexDays, setFlexDays] = useState<number | null>(0);

  const clearFlexFilter = (e: React.MouseEvent, value: number) => {
    e.stopPropagation();
    if (flexDays === value) {
      setFlexDays(null);
    }
  };

  return (
    <div className="absolute left-1/2 top-[calc(100%+12px)] w-[780px] max-w-[95vw] bg-white rounded-[32px] shadow-[0_6px_20px_rgba(0,0,0,0.2)] border border-neutral-100 p-6 z-50 search-panel-enter-center">
      <div className="flex justify-center mb-6">
        <div className="inline-flex bg-neutral-100 rounded-full p-1">
          <button
            type="button"
            onClick={() => setMode("dates")}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition ${
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
            className={`px-6 py-2 rounded-full text-sm font-semibold transition ${
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
              months={2}
              direction="horizontal"
              locale={es}
              rangeColors={["#ebebeb"]}
            />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 pt-2">
            {FLEX_OPTIONS.map((option) => {
              const isSelected = flexDays === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFlexDays(option.value)}
                  className={`
                    inline-flex items-center gap-1.5
                    px-4 py-2 rounded-full text-sm font-medium transition
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
                          clearFlexFilter(
                            e as unknown as React.MouseEvent,
                            option.value
                          );
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
