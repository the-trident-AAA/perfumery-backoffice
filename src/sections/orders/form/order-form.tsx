import { RHFSelectField } from "@/components/form/rhf-components/rhf-select-field/rhf-select-field";
import { OrderDetails, OrderStatus, orderStatusMap } from "@/types/orders";
import React from "react";
import RHFOrderPerfumesList from "./rhf-components/rhf-order-perfumes-list";

interface Props {
  order: OrderDetails;
}

export default function OrderForm({ order }: Props) {
  
  return (
    <div className="flex flex-col gap-4">
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
      <RHFOrderPerfumesList orderPerfumesMap={order.orderPerfumes} />
    </div>
  );
}
