import { OrdersFilters } from "@/sections/orders/filters/hooks/use-orders-filters";
import { OrderPerfume } from "./order-perfumes";
import { Perfume } from "./perfumes";
import { User } from "./users";

export interface Order {
  id: string;
  state: string;
  user: User;
  totalMount: number;
  totalItems: number;
}

export interface OrderDetails {
  id: string;
  state: string;
  user: User;
  orderPerfumes: OrderPerfume[];
  totalMount: number;
  totalItems: number;
}

export interface OrderFiltersDTO {
  state?: string;
  userId?: string;
}

export const convertOrderFiltersDTO = (
  ordersFilters: OrdersFilters
): OrderFiltersDTO => {
  return { ...ordersFilters};
};
