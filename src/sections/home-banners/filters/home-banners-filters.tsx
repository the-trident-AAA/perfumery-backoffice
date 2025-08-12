import React from "react";
import { HomeBannersFilters as HomeBannersFiltersType } from "./hooks/use-home-banners-filters";
import SearchInput from "@/components/inputs/search-input/search-input";

interface Props {
  filters: HomeBannersFiltersType;
  handleChangeFilters: (filters: Partial<HomeBannersFiltersType>) => void;
}

export default function HomeBannersFilters({
  filters,
  handleChangeFilters,
}: Props) {
  return (
    <div className="flex items-center gap-4">
      <SearchInput
        id="title"
        value={filters.title}
        placeHolder="Título..."
        onChange={(e) => {
          handleChangeFilters({ title: e.target.value || undefined });
        }}
      />
      <SearchInput
        id="description"
        value={filters.description}
        placeHolder="Descripción..."
        onChange={(e) => {
          handleChangeFilters({ description: e.target.value || undefined });
        }}
      />
    </div>
  );
}
