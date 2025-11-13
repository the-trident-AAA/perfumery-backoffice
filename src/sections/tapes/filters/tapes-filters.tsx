import React from "react";
import { TapesFilters as TapesFiltersType } from "./hooks/use-tapes-filters";
import SearchInput from "@/components/inputs/search-input/search-input";

interface Props {
  filters: TapesFiltersType;
  handleChangeFilters: (filters: Partial<TapesFiltersType>) => void;
}

export default function TapesFilters({
  filters,
  handleChangeFilters,
}: Props) {
  return (
    <div className="flex items-center gap-4">
      <SearchInput
        id="name"
        label="Buscar por nombre"
        value={filters.name}
        placeHolder="Título..."
        onChange={(e) => {
          handleChangeFilters({ name: e.target.value || undefined });
        }}
      />
    </div>
  );
}
