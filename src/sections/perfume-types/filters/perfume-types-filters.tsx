import React from "react";
import { PerfumeTypesFilters as PerfumeTypesFiltersType } from "./hooks/use-perfume-types-filters";
import SearchInput from "@/components/inputs/search-input/search-input";

interface Props {
  filters: PerfumeTypesFiltersType;
  handleChangeFilters: (filters: Partial<PerfumeTypesFiltersType>) => void;
}

export default function PerfumeTypesFilters({ filters, handleChangeFilters }: Props) {
  return <>
      <SearchInput
        id="name"
        value={filters.name}
        placeHolder="Nombre del tipo de perfume..."
        onChange={(e) => {
          handleChangeFilters({ name: e.target.value || undefined });
        }}
      />
    </>;
}
