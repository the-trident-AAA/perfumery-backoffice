import React from "react";
import useScentsFilters from "./hooks/use-scents-filters";
import ScentsFilters from "./scents-filters";
import ScentsActiveFilters from "./components/scents-active-filters/scents-active-filters";

export default function ScentsFiltersContainer() {
  const {
    filters,
    handleChangeFilters,
    handleResetFilters,
    getActiveFiltersCount,
  } = useScentsFilters({});
  return (
    <div className="flex flex-col gap-4 w-64">
      <ScentsFilters
        filters={filters}
        handleChangeFilters={handleChangeFilters}
      />
      {getActiveFiltersCount() > 0 && (
        <ScentsActiveFilters
          filters={filters}
          handleChangeFilters={handleChangeFilters}
          getActiveFiltersCount={getActiveFiltersCount}
          handleResetFilters={handleResetFilters}
        />
      )}
    </div>
  );
}
