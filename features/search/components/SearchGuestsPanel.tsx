"use client";

import { Counter } from "@/shared/ui/Counter";
import { SearchGuestsPanelProps } from "@/features/search/types/searchGuestsPanel.interface";

export const SearchGuestsPanel: React.FC<SearchGuestsPanelProps> = ({
  adults,
  childrenCount,
  infants,
  pets,
  setAdults,
  setChildrenCount,
  setInfants,
  setPets,
}) => {
  return (
    <div className="absolute left-0 right-0 sm:left-auto sm:right-0 top-[calc(100%+12px)] w-full sm:w-[380px] max-w-[calc(100vw-2rem)] mx-auto sm:mx-0 bg-white rounded-[24px] sm:rounded-[32px] shadow-[0_6px_20px_rgba(0,0,0,0.2)] border border-neutral-100 px-4 sm:px-6 py-3 sm:py-4 z-50 search-panel-enter">
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
  );
};
