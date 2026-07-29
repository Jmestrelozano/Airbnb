export interface SearchGuestsPanelProps {
  adults: number;
  childrenCount: number;
  infants: number;
  pets: number;
  setAdults: (value: number) => void;
  setChildrenCount: (value: number) => void;
  setInfants: (value: number) => void;
  setPets: (value: number) => void;
}
