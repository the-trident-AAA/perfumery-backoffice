import { RHFSelectField } from "@/components/form/rhf-components/rhf-select-field/rhf-select-field";
import { OrderStatus, orderStatusMap } from "@/types/orders";
import React from "react";

export default function OrderForm() {
  return (
    <div>
      <RHFSelectField
        name="state"
        label="Estado"
        placeholder="Seleccione un estado"
        options={[
          {
            value: OrderStatus.PENDING,
            label: orderStatusMap.get(OrderStatus.PENDING)?.name as string,
          },
          {
            value: OrderStatus.COMPLETED,
            label: orderStatusMap.get(OrderStatus.COMPLETED)?.name as string,
          },
          {
            value: OrderStatus.CANCELED,
            label: orderStatusMap.get(OrderStatus.CANCELED)?.name as string,
          },
        ]}
      />
    </div>
  );
}
