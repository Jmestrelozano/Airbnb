"use client";

import { SearchModal } from "@/features/search/components/SearchModal";
import { useSearchModal } from "@/features/search/hooks/useSearchModal";

export const SearchModalView = () => {
  const viewModel = useSearchModal();

  return <SearchModal {...viewModel} />;
};
