"use client";

import { Search } from "@/features/search/components/Search";
import { useSearch } from "@/features/search/hooks/useSearch";
import { SearchViewProps } from "@/features/search/types/searchView.interface";

export const SearchView = ({ isScrolled = false }: SearchViewProps) => {
  const viewModel = useSearch(isScrolled);

  return <Search {...viewModel} />;
};
