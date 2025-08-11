import React from "react";
import useUsersFilters from "./hooks/use-user-filters";
import UsersActiveFilters from "./users-active-filters/users-active-filters";
import UsersFilters from "./users-filters";


export default function UsersFiltersContainer() {
  const {
    filters,
    handleChangeFilters,
    handleResetFilters,
    getActiveFiltersCount,
  } = useUsersFilters({});
  return (
    <div className="flex gap-4">
      <UsersFilters
        filters={filters}
        handleChangeFilters={handleChangeFilters}
      />
      {getActiveFiltersCount() > 0 && (
        <UsersActiveFilters
          filters={filters}
          handleChangeFilters={handleChangeFilters}
          getActiveFiltersCount={getActiveFiltersCount}
          handleResetFilters={handleResetFilters}
        />
      )}
    </div>
  );
}
