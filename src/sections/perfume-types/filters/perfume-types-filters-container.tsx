import React from "react";
import usePerfumeTypesFilters from "./hooks/use-perfume-types-filters";
import PerfumeTypesFilters from "./perfume-types-filters";
import PerfumeTypesActiveFilters from "./components/perfume-types-active-filters/perfume-types-active-filters";

export default function PerfumeTypesFiltersContainer() {
  const {
    filters,
    handleChangeFilters,
    handleResetFilters,
    getActiveFiltersCount,
  } = usePerfumeTypesFilters({});
  return (
    <div className="flex flex-col gap-4 w-64">
      <PerfumeTypesFilters
        filters={filters}
        handleChangeFilters={handleChangeFilters}
      />
      {getActiveFiltersCount() > 0 && (
        <PerfumeTypesActiveFilters
          filters={filters}
          handleChangeFilters={handleChangeFilters}
          getActiveFiltersCount={getActiveFiltersCount}
          handleResetFilters={handleResetFilters}
        />
      )}
    </div>
  );
}
