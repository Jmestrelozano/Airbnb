"use client";

import { SearchWherePanelProps } from "@/features/search/types/searchWherePanel.interface";

export const SearchWherePanel: React.FC<SearchWherePanelProps> = ({
  destinations,
  onSelect,
}) => {
  return (
    <div className="absolute left-0 sm:left-0 top-[calc(100%+12px)] w-[min(100vw-2rem,420px)] sm:w-[420px] max-w-[calc(100vw-2rem)] bg-white rounded-[24px] sm:rounded-[32px] shadow-[0_6px_20px_rgba(0,0,0,0.2)] border border-neutral-100 p-4 sm:p-6 z-50 search-panel-enter">
      <div className="text-xs font-semibold text-neutral-500 mb-4 px-2">
        Destinos sugeridos
      </div>
      <div className="flex flex-col">
        {destinations.map((destination) => {
          const Icon = destination.icon;

          return (
            <button
              key={destination.id}
              type="button"
              onClick={() => onSelect(destination)}
              className="flex flex-row items-center gap-4 px-3 py-3 rounded-2xl hover:bg-neutral-100 transition text-left"
            >
              <div
                className={`
                  w-12 h-12 rounded-xl flex items-center justify-center shrink-0
                  ${destination.iconBg} ${destination.iconColor}
                `}
              >
                <Icon size={22} />
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-[15px] text-neutral-800 truncate">
                  {destination.label}
                </div>
                <div className="text-sm text-neutral-500 truncate">
                  {destination.subtitle}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
