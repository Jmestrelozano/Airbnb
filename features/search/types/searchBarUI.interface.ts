import { SearchPanel } from "@/features/search/types/searchPanel.type";

export type SearchPillStyle = {
  left: number;
  width: number;
  opacity: number;
};

export interface UseSearchBarUIParams {
  isScrolled: boolean;
  isExpanded: boolean;
  activePanel: SearchPanel;
  closeSearch: () => void;
  locationLabel: string;
  durationLabel: string;
  guestLabel: string;
  hasLocation: boolean;
  hasDates: boolean;
  hasGuests: boolean;
}
