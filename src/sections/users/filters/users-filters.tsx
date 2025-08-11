import React from "react";
import { UsersFilters as UsersFiltersType } from "./hooks/use-user-filters";
import SearchInput from "@/components/inputs/search-input/search-input";

interface Props {
  filters: UsersFiltersType;
  handleChangeFilters: (filters: Partial<UsersFiltersType>) => void;
}

export default function UsersFilters({ filters, handleChangeFilters }: Props) {
  return (
    <>
      <SearchInput
        id="username"
        value={filters.username}
        placeHolder="Nombre del Usuario..."
        onChange={(e) => {
          handleChangeFilters({ username: e.target.value || undefined });
        }}
      />
      <SearchInput
        id="email"
        value={filters.email}
        placeHolder="Email del Usuario..."
        onChange={(e) => {
          handleChangeFilters({ email: e.target.value || undefined });
        }}
      />
    </>
  );
}
