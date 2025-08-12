import React from "react";
import { ScentsFilters as ScentsFiltersType } from "./hooks/use-scents-filters";
import SearchInput from "@/components/inputs/search-input/search-input";

interface Props {
  filters: ScentsFiltersType;
  handleChangeFilters: (filters: Partial<ScentsFiltersType>) => void;
}

export default function ScentsFilters({ filters, handleChangeFilters }: Props) {
  return <>
      <SearchInput
        id="name"
        label="Buscar por Aroma"
        value={filters.name}
        placeHolder="Nombre de la aroma..."
        onChange={(e) => {
          handleChangeFilters({ name: e.target.value || undefined });
        }}
      />
    </>;
}
