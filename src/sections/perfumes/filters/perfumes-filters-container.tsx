"use client";
import React from "react";
import PerfumesFiltersDesktopView from "./perfumes-filters-desktop-view/perfumes-filters-desktop-view";
import usePerfumesFilters from "./hooks/use-perfumes-filters";
import PerfumesFilters from "./perfumes-filters";
import useBrands from "@/sections/brands/hooks/use-brands";
import usePerfumeTypes from "@/sections/perfume-types/hooks/use-perfume-types";
import useScents from "@/sections/scents/hooks/use-scents";
import useOffers from "@/sections/offers/hooks/use-offers";

export default function PerfumesFiltersContainer() {
  const { filters, handleChangeFilters, handleResetFilters } =
    usePerfumesFilters({});
  const { brands, loadingData: loadingBrands } = useBrands();
  const { perfumeTypes, loadingData: loadingPerfumeTypes } = usePerfumeTypes();
  const { scents, loadingData: loadingScents } = useScents();
  const { offers, loadingData: loadingOffers } = useOffers();
  return (
    <>
      <PerfumesFiltersDesktopView
        filters={filters}
        handleChangeFilters={handleChangeFilters}
        handleResetFilters={handleResetFilters}
      >
        <PerfumesFilters
          filters={filters}
          brands={{ data: brands, loading: loadingBrands }}
          perfumeTypes={{ data: perfumeTypes, loading: loadingPerfumeTypes }}
          scents={{ data: scents, loading: loadingScents }}
          offers={{ data: offers, loading: loadingOffers }}
          handleChangeFilters={handleChangeFilters}
        />
      </PerfumesFiltersDesktopView>
    </>
  );
}
