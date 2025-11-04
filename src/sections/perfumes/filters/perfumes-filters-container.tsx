"use client";
import React from "react";
import usePerfumesFilters from "./hooks/use-perfumes-filters";
import PerfumesFilters from "./perfumes-filters";
import useBrands from "@/sections/brands/hooks/use-brands";
import usePerfumeTypes from "@/sections/perfume-types/hooks/use-perfume-types";
import useScents from "@/sections/scents/hooks/use-scents";
import useOffers from "@/sections/offers/hooks/use-offers";
import SheetFilters from "@/components/filters/sheet-filters/sheet-filters";
import PerfumesActiveFilters from "./perfumes-active-filters/perfumes-active-filters";

export default function PerfumesFiltersContainer() {
  const {
    filters,
    handleChangeFilters,
    handleResetFilters,
    getActiveFiltersCount,
  } = usePerfumesFilters({});
  const { brands, loadingData: loadingBrands } = useBrands();
  const { perfumeTypes, loadingData: loadingPerfumeTypes } = usePerfumeTypes();
  const { scents, loadingData: loadingScents } = useScents();
  const { offers, loadingData: loadingOffers } = useOffers();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <SheetFilters title="Filtros">
          <PerfumesFilters
            filters={filters}
            brands={{ data: brands, loading: loadingBrands }}
            perfumeTypes={{ data: perfumeTypes, loading: loadingPerfumeTypes }}
            scents={{ data: scents, loading: loadingScents }}
            offers={{ data: offers, loading: loadingOffers }}
            handleChangeFilters={handleChangeFilters}
          />
        </SheetFilters>
      </div>
      {getActiveFiltersCount() > 0 &&
        !loadingBrands &&
        !loadingPerfumeTypes &&
        !loadingScents &&
        !loadingOffers && (
          <PerfumesActiveFilters
            filters={filters}
            brands={brands}
            perfumeTypes={perfumeTypes}
            scents={scents}
            offers={offers}
            handleChangeFilters={handleChangeFilters}
            getActiveFiltersCount={getActiveFiltersCount}
            handleResetFilters={handleResetFilters}
          />
        )}
    </div>
  );
}
