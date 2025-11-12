import React from "react";
import TapesActiveFilters from "./components/tapes-active-filters/tapes-active-filters";
import useTapesFilters from "./hooks/use-tapes-filters";
import TapesFilters from "./tapes-filters";

export default function TapesFiltersContainer() {
  const {
    filters,
    handleChangeFilters,
    handleResetFilters,
    getActiveFiltersCount,
  } = useTapesFilters({});
  return (
    <div className="flex flex-col gap-4">
      <TapesFilters
        filters={filters}
        handleChangeFilters={handleChangeFilters}
      />
      {getActiveFiltersCount() > 0 && (
        <TapesActiveFilters
          filters={filters}
          handleChangeFilters={handleChangeFilters}
          getActiveFiltersCount={getActiveFiltersCount}
          handleResetFilters={handleResetFilters}
        />
      )}
    </div>
  );
}
