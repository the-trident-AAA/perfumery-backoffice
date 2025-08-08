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
