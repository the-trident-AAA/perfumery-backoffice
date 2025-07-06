import React from "react";
import useBrandsFilters from "./hooks/use-brands-filters";
import BrandsFilters from "./brands-filters";
import BrandsActiveFilters from "./components/brands-active-filters/brands-active-filters";

export default function BrandsFiltersContainer() {
  const {
    filters,
    handleChangeFilters,
    handleResetFilters,
    getActiveFiltersCount,
  } = useBrandsFilters({});
  return (
    <div className="flex flex-col gap-4">
      <BrandsFilters
        filters={filters}
        handleChangeFilters={handleChangeFilters}
      />
      {getActiveFiltersCount() > 0 && (
        <BrandsActiveFilters
          filters={filters}
          handleChangeFilters={handleChangeFilters}
          getActiveFiltersCount={getActiveFiltersCount}
          handleResetFilters={handleResetFilters}
        />
      )}
    </div>
  );
}
