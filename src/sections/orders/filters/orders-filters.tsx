import React from "react";
import { OrdersFilters as OrdersFiltersType } from "./hooks/use-orders-filters";
import SelectInput from "@/components/inputs/select-input/select-input";
import { OrderStatus, orderStatusMap } from "@/types/orders";
import DatePickerInput from "@/components/inputs/date-picker-input/date-picker-input";

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
      <DatePickerInput
        id="lastUpdateDateMin"
        label="Fecha de Actualización Mínima"
        placeholder="Ingrese una fecha mínima..."
        value={filters.lastUpdateDateMin}
        onChange={(date) => {
          handleChangeFilters({ lastUpdateDateMin: date || undefined });
        }}
      />

      <DatePickerInput
        id="lastUpdateDateMax"
        label="Fecha de Actualización Máxima"
        placeholder="Ingrese una fecha máxima..."
        value={filters.lastUpdateDateMax}
        onChange={(date) => {
          handleChangeFilters({ lastUpdateDateMax: date || undefined });
        }}
      />
    </div>
  );
}
