import React from "react";
import { OrdersFilters as OrdersFiltersType } from "./hooks/use-orders-filters";
import SelectInput from "@/components/inputs/select-input/select-input";
import { OrderStatus, orderStatusMap } from "@/types/orders";

interface Props {
  filters: OrdersFiltersType;
  handleChangeFilters: (filters: Partial<OrdersFiltersType>) => void;
}

export default function OffersFilters({ filters, handleChangeFilters }: Props) {
  return (
    <div className="flex items-center gap-4">
      <SelectInput
        fullWidth
        placeHolder="Seleccione un estado..."
        value={filters.state}
        onValueChange={(value) => {
          handleChangeFilters({
            state: (value as OrderStatus) || undefined,
          });
        }}
        options={[
          {
            label: orderStatusMap.get(OrderStatus.COMPLETED)?.name as string,
            value: OrderStatus.COMPLETED,
          },
          {
            label: orderStatusMap.get(OrderStatus.PENDING)?.name as string,
            value: OrderStatus.PENDING,
          },
          {
            label: orderStatusMap.get(OrderStatus.CANCELED)?.name as string,
            value: OrderStatus.CANCELED,
          },
        ]}
        clearable={{
          handleClear: () => {
            handleChangeFilters({ state: undefined });
          },
        }}
      />
    </div>
  );
}
