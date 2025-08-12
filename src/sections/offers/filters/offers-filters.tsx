import React from "react";
import { OffersFilters as OffersFiltersType } from "./hooks/use-offers-filters";
import SearchInput from "@/components/inputs/search-input/search-input";
import SliderInput from "@/components/inputs/slider-input/slider-input";
import { Separator } from "@/components/ui/separator";

interface Props {
  filters: OffersFiltersType;
  handleChangeFilters: (filters: Partial<OffersFiltersType>) => void;
}

export default function OffersFilters({ filters, handleChangeFilters }: Props) {
  return (
    <>
      <div className="space-y-6">
        <SearchInput
          id="name"
          label="Buscar por tipo de oferta"
          value={filters.name}
          placeHolder="Nombre del tipo de perfume..."
          onChange={(e) => {
            handleChangeFilters({ name: e.target.value || undefined });
          }}
        />
        <Separator />
        <SearchInput
          id="description"
          label="Buscar por descripción"
          value={filters.description}
          placeHolder="Descripción..."
          onChange={(e) => {
            handleChangeFilters({ description: e.target.value || undefined });
          }}
        />
        <Separator />
        <SearchInput
          id="scope"
          label="Buscar por alcance"
          value={filters.scope}
          placeHolder="Alcance..."
          onChange={(e) => {
            handleChangeFilters({ scope: e.target.value || undefined });
          }}
        />
        <Separator />
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
        <Separator />
        <SearchInput
          id="offerType"
          label="Buscar por tipo de oferta"
          value={filters.offerType}
          placeHolder="Tipo de Oferta..."
          onChange={(e) => {
            handleChangeFilters({ offerType: e.target.value || undefined });
          }}
        />
      </div>
    </>
  );
}
