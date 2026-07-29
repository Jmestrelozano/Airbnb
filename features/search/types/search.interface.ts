export interface SearchProps {
  isScrolled: boolean;
  isExpanded: boolean;
  activePanel: "where" | "dates" | "who" | null;
  locationLabel: string;
  durationLabel: string;
  guestLabel: string;
  dateRange: import("react-date-range").Range;
  adults: number;
  childrenCount: number;
  infants: number;
  pets: number;
  hasLocation: boolean;
  hasDates: boolean;
  hasGuests: boolean;
  destinations: import("@/features/search/utils/suggestedDestinations").SuggestedDestination[];
  openPanel: (panel: "where" | "dates" | "who" | null) => void;
  closeSearch: () => void;
  onSelectDestination: (
    destination: import("@/features/search/utils/suggestedDestinations").SuggestedDestination
  ) => void;
  clearLocation: () => void;
  clearDates: () => void;
  clearGuests: () => void;
  clearAll: () => void;
  setDateRange: (value: import("react-date-range").Range) => void;
  setAdults: (value: number) => void;
  setChildrenCount: (value: number) => void;
  setInfants: (value: number) => void;
  setPets: (value: number) => void;
  onSubmit: () => void;
}
