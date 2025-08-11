import React from "react";
import { OrdersFilters as OrdersFiltersType } from "./hooks/use-orders-filters";
import SearchInput from "@/components/inputs/search-input/search-input";
import { OptionData } from "@/types/filters";
import { User } from "@/types/users";
import SelectInput from "@/components/inputs/select-input/select-input";

interface Props {
  filters: OrdersFiltersType;
  handleChangeFilters: (filters: Partial<OrdersFiltersType>) => void;
  users: OptionData<User>;
}

export default function OffersFilters({
  filters,
  users,
  handleChangeFilters,
}: Props) {
  return (
    <>
      <SearchInput
        id="state"
        label="Estado del Pedido"
        value={filters.state}
        placeHolder="Estado del Pedido..."
        onChange={(e) => {
          handleChangeFilters({ state: e.target.value || undefined });
        }}
      />
        <SelectInput
          label="Nombre del Usuario"
          placeHolder="Seleccione un Usuario..."
          value={filters.userId}
          onValueChange={(value) => {
            handleChangeFilters({ userId: value || undefined });
          }}
          options={users.data.map((user) => ({
            value: user.id,
            label: user.username,
          }))}
          loading={users.loading}
          clearable={{
            handleClear: () => {
              handleChangeFilters({ userId: undefined });
            },
          }}
        />
        <SelectInput
          label="Email del Usuario"
          placeHolder="Seleccione un email..."
          value={filters.userId}
          onValueChange={(value) => {
            handleChangeFilters({ userId: value || undefined });
          }}
          options={users.data.map((user) => ({
            value: user.id,
            label: user.email,
          }))}
          loading={users.loading}
          clearable={{
            handleClear: () => {
              handleChangeFilters({ userId: undefined });
            },
          }}
        />
    </>
  );
}
