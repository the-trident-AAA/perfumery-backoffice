import React from "react";
import { OffersFilters as OffersFiltersType } from "./hooks/use-offers-filters";
import SearchInput from "@/components/inputs/search-input/search-input";
import SliderInput from "@/components/inputs/slider-input/slider-input";

interface Props {
  filters: OffersFiltersType;
  handleChangeFilters: (filters: Partial<OffersFiltersType>) => void;
}

export default function PerfumeTypesFilters({
  filters,
  handleChangeFilters,
}: Props) {
  return (
    <>
      <SearchInput
        id="name"
        value={filters.name}
        placeHolder="Nombre del tipo de perfume..."
        onChange={(e) => {
          handleChangeFilters({ name: e.target.value || undefined });
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
      <SearchInput
        id="scope"
        value={filters.scope}
        placeHolder="Alcance..."
        onChange={(e) => {
          handleChangeFilters({ scope: e.target.value || undefined });
        }}
      />
      <SliderInput
        label="Descuento (%)"
        meansure="%"
        value={filters.discount}
        handleChangeFilters={(value) => {
          handleChangeFilters({
            discount: value as [number, number],
          });
        }}
      />
      <SearchInput
        id="offerType"
        value={filters.offerType}
        placeHolder="Tipo de Oferta..."
        onChange={(e) => {
          handleChangeFilters({ offerType: e.target.value || undefined });
        }}
      />
    </>
  );
}
