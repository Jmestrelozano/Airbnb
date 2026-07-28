"use client";

import { Search } from "@/features/search/components/Search";
import { useSearch } from "@/features/search/hooks/useSearch";

export const SearchView = () => {
  const viewModel = useSearch();

  return <Search {...viewModel} />;
};
