import React from "react";
import useOrdersFilters from "./hooks/use-orders-filters";
import OrdersActiveFilters from "./components/orders-active-filters/orders-active-filters";
import OrdersFilters from "./orders-filters";
import useUsers from "@/sections/users/hooks/use-users";

export default function OrdersFiltersContainer() {
  const {
    filters,
    handleChangeFilters,
    handleResetFilters,
    getActiveFiltersCount,
  } = useOrdersFilters({});
  const {users , loadingData: loadingUsers} = useUsers();
  return (
    <div className="flex gap-4">
      <OrdersFilters
        filters={filters}
        users={{ data : users , loading : loadingUsers }}
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
