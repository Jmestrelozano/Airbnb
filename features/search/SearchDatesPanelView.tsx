"use client";

import { SearchDatesPanel } from "@/features/search/components/SearchDatesPanel";
import { useSearchDatesPanel } from "@/features/search/hooks/useSearchDatesPanel";
import { SearchDatesPanelInput } from "@/features/search/types/searchDatesPanel.interface";

export const SearchDatesPanelView: React.FC<SearchDatesPanelInput> = (
  props
) => {
  const viewModel = useSearchDatesPanel();

  return <SearchDatesPanel {...props} {...viewModel} />;
};
