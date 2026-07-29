"use client";

import { Counter } from "@/shared/ui/Counter";

type SearchGuestsPanelProps = {
  adults: number;
  childrenCount: number;
  infants: number;
  pets: number;
  setAdults: (value: number) => void;
  setChildrenCount: (value: number) => void;
  setInfants: (value: number) => void;
  setPets: (value: number) => void;
};

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
    <div className="absolute right-0 top-[calc(100%+12px)] w-[380px] max-w-[90vw] bg-white rounded-[32px] shadow-[0_6px_20px_rgba(0,0,0,0.2)] border border-neutral-100 px-6 py-4 z-50 search-panel-enter">
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
