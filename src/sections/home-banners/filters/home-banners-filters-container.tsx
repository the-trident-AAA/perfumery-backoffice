import React from "react";
import useHomeBannersFilters from "./hooks/use-home-banners-filters";
import HomeBannersActiveFilters from "./components/home-banners-active-filters/home-banners-active-filters";
import HomeBannersFilters from "./home-banners-filters";

export default function HomeBannersFiltersContainer() {
  const {
    filters,
    handleChangeFilters,
    handleResetFilters,
    getActiveFiltersCount,
  } = useHomeBannersFilters({});
  return (
    <div className="flex flex-col gap-4">
      <HomeBannersFilters
        filters={filters}
        handleChangeFilters={handleChangeFilters}
      />
      {getActiveFiltersCount() > 0 && (
        <HomeBannersActiveFilters
          filters={filters}
          handleChangeFilters={handleChangeFilters}
          getActiveFiltersCount={getActiveFiltersCount}
          handleResetFilters={handleResetFilters}
        />
      )}
    </div>
  );
}
