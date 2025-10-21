import React from "react";
import useOrdersFilters from "./hooks/use-orders-filters";
import OrdersActiveFilters from "./components/orders-active-filters/orders-active-filters";
import OrdersFilters from "./orders-filters";

export default function OrdersFiltersContainer() {
  const {
    filters,
    handleChangeFilters,
    handleResetFilters,
    getActiveFiltersCount,
  } = useOrdersFilters({});

  return (
    <div className="flex flex-col gap-4">
      <OrdersFilters
        filters={filters}
        handleChangeFilters={handleChangeFilters}
      />
      {getActiveFiltersCount() > 0 && (
        <OrdersActiveFilters
          filters={filters}
          handleChangeFilters={handleChangeFilters}
          getActiveFiltersCount={getActiveFiltersCount}
          handleResetFilters={handleResetFilters}
        />
      )}
    </div>
  );
}
