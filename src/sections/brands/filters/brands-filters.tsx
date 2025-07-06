import React from "react";
import { BrandsFilters as BrandsFiltersType } from "./hooks/use-brands-filters";
import SearchInput from "@/components/inputs/search-input/search-input";

interface Props {
  filters: BrandsFiltersType;
  handleChangeFilters: (filters: Partial<BrandsFiltersType>) => void;
}

export default function BrandsFilters({ filters, handleChangeFilters }: Props) {
  return <>
      <SearchInput
        id="name"
        value={filters.name}
        placeHolder="Nombre de la marca..."
        onChange={(e) => {
          handleChangeFilters({ name: e.target.value || undefined });
        }}
      />
    </>;
}
