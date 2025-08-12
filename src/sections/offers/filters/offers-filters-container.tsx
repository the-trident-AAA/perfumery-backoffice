import React from "react";
import useOffersFilters from "./hooks/use-offers-filters";
import OffersActiveFilters from "./components/offers-active-filters/offers-active-filters";
import OffersFilters from "./offers-filters";
import SheetFilters from "@/components/filters/sheet-filters/sheet-filters";

export default function OffersFiltersContainer() {
  const {
    filters,
    handleChangeFilters,
    handleResetFilters,
    getActiveFiltersCount,
  } = useOffersFilters({});
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <SheetFilters title="Filtros">
          <OffersFilters
            filters={filters}
            handleChangeFilters={handleChangeFilters}
          />
        </SheetFilters>
      </div>
      {getActiveFiltersCount() > 0 && (
        <OffersActiveFilters
          filters={filters}
          handleChangeFilters={handleChangeFilters}
          getActiveFiltersCount={getActiveFiltersCount}
          handleResetFilters={handleResetFilters}
        />
      )}
    </div>
  );
}
