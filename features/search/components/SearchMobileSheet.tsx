"use client";

import { BiSearch } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { es } from "date-fns/locale";

import { InputCalendar } from "@/shared/ui/Calendar";
import { Counter } from "@/shared/ui/Counter";
import {
  SearchMobileCollapsedRowProps,
  SearchMobileSheetProps,
} from "@/features/search/types/searchMobileSheet.interface";

const CollapsedRow: React.FC<SearchMobileCollapsedRowProps> = ({
  label,
  value,
  muted,
  panel,
  onOpen,
}) => (
  <button
    type="button"
    onClick={() => onOpen(panel)}
    className="
      w-full flex items-center justify-between
      bg-white rounded-2xl
      px-5 py-4
      shadow-[0_1px_2px_rgba(0,0,0,0.06)]
      border border-neutral-200/80
      text-left
    "
  >
    <span className="text-[15px] font-semibold text-neutral-800">{label}</span>
    <span
      className={`text-[15px] ${
        muted ? "text-neutral-500" : "text-neutral-800 font-medium"
      }`}
    >
      {value}
    </span>
  </button>
);

export const SearchMobileSheet: React.FC<SearchMobileSheetProps> = ({
  tabs,
  activeTab,
  onTabChange,
  closeSearch,
  activePanel,
  query,
  onQueryChange,
  filteredDestinations,
  onSelectDestination,
  whereCollapsed,
  datesCollapsed,
  whoCollapsed,
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
  nextLabel,
}) => {
  return (
    <div className="fixed inset-0 z-[60] sm:hidden flex flex-col bg-[#EBEBEB] search-mobile-sheet-enter">
      <div className="relative flex items-end justify-center gap-6 px-4 pt-3 pb-2 bg-[#EBEBEB]">
        {tabs.map(({ id, label, Icon }) => {
          const selected = activeTab === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onTabChange(id)}
              className={`
                flex flex-col items-center gap-1.5 pb-2 px-1
                border-b-2 transition
                ${selected ? "border-neutral-800" : "border-transparent"}
              `}
            >
              <Icon
                size={22}
                className={selected ? "text-neutral-800" : "text-neutral-500"}
              />
              <span
                className={`text-xs ${
                  selected
                    ? "font-semibold text-neutral-800"
                    : "font-medium text-neutral-500"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
        <button
          type="button"
          aria-label="Cerrar"
          onClick={closeSearch}
          className="
            absolute right-4 top-3
            w-8 h-8 rounded-full
            bg-white border border-neutral-300
            inline-flex items-center justify-center
            shadow-sm
          "
        >
          <IoClose size={18} className="text-neutral-800" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pt-2 pb-28 space-y-3">
        {activePanel === "where" ? (
          <div className="bg-white rounded-[28px] shadow-[0_6px_16px_rgba(0,0,0,0.12)] p-5">
            <h2 className="text-[26px] font-bold text-neutral-800 tracking-tight mb-4">
              ¿Dónde?
            </h2>
            <div className="flex items-center gap-3 border border-neutral-300 rounded-2xl px-4 py-3.5 mb-5">
              <BiSearch size={20} className="text-neutral-800 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Explora destinos"
                className="flex-1 min-w-0 bg-transparent outline-none text-[15px] text-neutral-800 placeholder:text-neutral-500"
              />
            </div>

            <div className="text-xs font-semibold text-neutral-500 mb-2 px-1">
              Destinos sugeridos
            </div>
            <div className="flex flex-col">
              {filteredDestinations.map((destination) => {
                const Icon = destination.icon;
                return (
                  <button
                    key={destination.id}
                    type="button"
                    onClick={() => onSelectDestination(destination)}
                    className="flex flex-row items-center gap-4 px-1 py-3 rounded-2xl hover:bg-neutral-50 transition text-left"
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
        ) : (
          <CollapsedRow {...whereCollapsed} onOpen={openPanel} />
        )}

        {activePanel === "dates" ? (
          <div className="bg-white rounded-[28px] shadow-[0_6px_16px_rgba(0,0,0,0.12)] p-5">
            <h2 className="text-[26px] font-bold text-neutral-800 tracking-tight mb-4">
              ¿Cuándo?
            </h2>
            <div className="flex justify-center airbnb-calendar overflow-x-auto">
              <InputCalendar
                value={calendarValue}
                onChange={(value) => onDateRangeChange(value.selection)}
                months={months}
                direction="horizontal"
                locale={es}
                rangeColors={["#ebebeb"]}
              />
            </div>
          </div>
        ) : (
          <CollapsedRow {...datesCollapsed} onOpen={openPanel} />
        )}

        {activePanel === "who" ? (
          <div className="bg-white rounded-[28px] shadow-[0_6px_16px_rgba(0,0,0,0.12)] px-5 py-2">
            <h2 className="text-[26px] font-bold text-neutral-800 tracking-tight mb-2 pt-3">
              ¿Quién?
            </h2>
            <div className="py-4 border-b border-neutral-200">
              <Counter
                title="Adultos"
                subtitle="Edad: 13 años o más"
                value={adults}
                onChange={setAdults}
                min={0}
              />
            </div>
            <div className="py-4 border-b border-neutral-200">
              <Counter
                title="Niños"
                subtitle="Edades 2 – 12"
                value={childrenCount}
                onChange={setChildrenCount}
                min={0}
              />
            </div>
            <div className="py-4 border-b border-neutral-200">
              <Counter
                title="Bebés"
                subtitle="Menos de 2 años"
                value={infants}
                onChange={setInfants}
                min={0}
              />
            </div>
            <div className="py-4">
              <Counter
                title="Mascotas"
                subtitle="¿Traes un animal de servicio?"
                value={pets}
                onChange={setPets}
                min={0}
              />
            </div>
          </div>
        ) : (
          <CollapsedRow {...whoCollapsed} onOpen={openPanel} />
        )}
      </div>

      <div className="absolute bottom-0 inset-x-0 bg-white border-t border-neutral-200 px-5 py-4 flex items-center justify-between safe-pb">
        <button
          type="button"
          onClick={clearAll}
          className="text-[15px] font-semibold text-neutral-800 underline underline-offset-2"
        >
          Limpiar todo
        </button>
        <button
          type="button"
          onClick={onNext}
          className="
            bg-neutral-900 hover:bg-neutral-800
            text-white font-semibold text-[15px]
            px-8 py-3.5 rounded-xl
            transition
          "
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
};
