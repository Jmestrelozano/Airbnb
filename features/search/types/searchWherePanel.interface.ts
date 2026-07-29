export interface SearchWherePanelProps {
  destinations: import("@/features/search/utils/suggestedDestinations").SuggestedDestination[];
  onSelect: (
    destination: import("@/features/search/utils/suggestedDestinations").SuggestedDestination
  ) => void;
}
