import React from "react";
import useBrandsFilters from "./hooks/use-brands-filters";
import BrandsFilters from "./brands-filters";

export default function BrandsFiltersContainer() {
  const { filters, handleChangeFilters, handleResetFilters } = useBrandsFilters(
    {}
  );
  return (
    <>
    <BrandsFilters filters={filters} handleChangeFilters={handleChangeFilters} />
    </>
  );
}
