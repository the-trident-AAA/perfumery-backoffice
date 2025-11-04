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
  } = useOrdersFilters({ urlFilters: true });
  const { users, loadingData: loadingUsers } = useUsers();

  return (
    <div className="flex flex-col gap-4">
      <OrdersFilters
        filters={filters}
        handleChangeFilters={handleChangeFilters}
        users={{ data: users, loading: loadingUsers }}
      />
      {getActiveFiltersCount() > 0 && !loadingUsers && (
        <OrdersActiveFilters
          filters={filters}
          users={users}
          handleChangeFilters={handleChangeFilters}
          getActiveFiltersCount={getActiveFiltersCount}
          handleResetFilters={handleResetFilters}
        />
      )}
    </div>
  );
}
