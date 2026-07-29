import { IconType } from "react-icons";
import { Range } from "react-date-range";

import { SuggestedDestination } from "@/features/search/utils/suggestedDestinations";
import { SearchPanel } from "@/features/search/types/searchPanel.type";

export type SearchMobileTabId = "stays" | "experiences" | "services";

export interface SearchMobileSheetInput {
  activePanel: Exclude<SearchPanel, null>;
  locationLabel: string;
  durationLabel: string;
  guestLabel: string;
  hasLocation: boolean;
  hasDates: boolean;
  hasGuests: boolean;
  destinations: SuggestedDestination[];
  dateRange: Range;
  adults: number;
  childrenCount: number;
  infants: number;
  pets: number;
  openPanel: (panel: Exclude<SearchPanel, null>) => void;
  closeSearch: () => void;
  onSelectDestination: (destination: SuggestedDestination) => void;
  clearAll: () => void;
  setDateRange: (value: Range) => void;
  setAdults: (value: number) => void;
  setChildrenCount: (value: number) => void;
  setInfants: (value: number) => void;
  setPets: (value: number) => void;
  onSubmit: () => void;
}

export interface SearchMobileTab {
  id: SearchMobileTabId;
  label: string;
  Icon: IconType;
}

export interface SearchMobileCollapsedRow {
  panel: Exclude<SearchPanel, null>;
  label: string;
  value: string;
  muted: boolean;
}

export interface SearchMobileCollapsedRowProps extends SearchMobileCollapsedRow {
  onOpen: (panel: Exclude<SearchPanel, null>) => void;
}

export interface SearchMobileSheetProps {
  tabs: SearchMobileTab[];
  activeTab: SearchMobileTabId;
  onTabChange: (tab: SearchMobileTabId) => void;
  closeSearch: () => void;
  activePanel: Exclude<SearchPanel, null>;
  query: string;
  onQueryChange: (value: string) => void;
  filteredDestinations: SuggestedDestination[];
  onSelectDestination: (destination: SuggestedDestination) => void;
  whereCollapsed: SearchMobileCollapsedRow;
  datesCollapsed: SearchMobileCollapsedRow;
  whoCollapsed: SearchMobileCollapsedRow;
  openPanel: (panel: Exclude<SearchPanel, null>) => void;
  calendarValue: Range;
  months: number;
  onDateRangeChange: (value: Range) => void;
  adults: number;
  childrenCount: number;
  infants: number;
  pets: number;
  setAdults: (value: number) => void;
  setChildrenCount: (value: number) => void;
  setInfants: (value: number) => void;
  setPets: (value: number) => void;
  clearAll: () => void;
  onNext: () => void;
  nextLabel: string;
}
