import { OrdersFilters } from "@/sections/orders/filters/hooks/use-orders-filters";
import { OrderPerfume, OrderPerfumeDTO } from "./order-perfumes";
import { User } from "./users";
import { OrderEdit } from "@/sections/orders/form/edit/schemas/order-edit-schema";

export enum OrderStatus {
  PENDING = "pendiente",
  CANCELED = "cancelado",
  COMPLETED = "completado",
}

export interface Order {
  id: string;
  code: string;
  state: OrderStatus;
  user: User;
  totalMount: number;
  totalItems: number;
  creationDate: string;
  lastUpdateDate: string;
}

export interface OrderDetails {
  id: string;
  code: string;
  state: OrderStatus;
  user: User;
  orderPerfumes: OrderPerfume[];
  totalMount: number;
  totalItems: number;
  creationDate: string;
  lastUpdateDate: string;
}

export interface OrderEditDTO {
  state: OrderStatus;
  perfumes: OrderPerfumeDTO[];
}

export interface OrderFiltersDTO {
  state?: string;
  userId?: string;
  lastUpdateDateMin?: string;
  lastUpdateDateMax?: string;
}

export const convertOrderEditDTO = (orderEdit: OrderEdit): OrderEditDTO => {
  return {
    state: orderEdit.state,
    perfumes: orderEdit.orderPerfumes.map((orderPerfumeEdit) => ({
      perfumeId: orderPerfumeEdit.perfumeId,
      cant: orderPerfumeEdit.cant,
    })),
  };
};

export const convertOrderFiltersDTO = (
  ordersFilters: OrdersFilters
): OrderFiltersDTO => {
  return {
    ...ordersFilters,
    lastUpdateDateMax: ordersFilters.lastUpdateDateMax?.toISOString(),
    lastUpdateDateMin: ordersFilters.lastUpdateDateMin?.toISOString(),
  };
};

export const orderStatusMap: Map<
  OrderStatus,
  {
    name: string;
    color:
      | "default"
      | "primary"
      | "secondary"
      | "error"
      | "info"
      | "success"
      | "warning";
  }
> = new Map([
  [OrderStatus.PENDING, { name: "Pendiente", color: "secondary" }],
  [OrderStatus.COMPLETED, { name: "Completada", color: "secondary" }],
  [OrderStatus.CANCELED, { name: "Cancelada", color: "secondary" }],
]);

export const genderMapInverted: Map<string, OrderStatus> = new Map(
  Array.from(orderStatusMap.entries()).map(([key, value]) => [value.name, key])
);

export const getOrderStateText = (orderStatus: OrderStatus) => {
  if (orderStatus === OrderStatus.PENDING) return "Pendiente";
  else if (orderStatus === OrderStatus.CANCELED) return "Cancelado";
  else if (orderStatus === OrderStatus.COMPLETED) return "Aceptado";
  else return "Desconocida";
};

export const getOrderStateVariant = (orderStatus: OrderStatus) => {
  if (orderStatus === OrderStatus.PENDING) return "bg-[#ffb703] text-secondary";
  else if (orderStatus === OrderStatus.CANCELED)
    return "bg-destructive text-white";
  else if (orderStatus === OrderStatus.COMPLETED)
    return "bg-[#058c42] text-white";
  else return "bg-destructive text-white";
};
