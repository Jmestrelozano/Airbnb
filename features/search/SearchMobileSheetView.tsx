"use client";

import { SearchMobileSheet } from "@/features/search/components/SearchMobileSheet";
import { useSearchMobileSheet } from "@/features/search/hooks/useSearchMobileSheet";
import { SearchMobileSheetInput } from "@/features/search/types/searchMobileSheet.interface";

export const SearchMobileSheetView: React.FC<SearchMobileSheetInput> = (
  props
) => {
  const viewModel = useSearchMobileSheet(props);

  return <SearchMobileSheet {...viewModel} />;
};
