import React from "react";
import useOffersFilters from "./hooks/use-offers-filters";
import OffersActiveFilters from "./components/offers-active-filters/offers-active-filters";
import OffersFilters from "./offers-filters";

export default function OffersFiltersContainer() {
  const {
    filters,
    handleChangeFilters,
    handleResetFilters,
    getActiveFiltersCount,
  } = useOffersFilters({});
  return (
    <div className="flex flex-col gap-4">
      <OffersFilters
        filters={filters}
        handleChangeFilters={handleChangeFilters}
      />
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
