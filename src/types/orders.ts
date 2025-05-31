import { Perfume } from "./perfumes";
import { User } from "./users";

export interface Order {
  id: string;
  state: string;
  user: User;
  perfumes: Perfume[];
  totalMount: number;
}

export interface OrderDetails {
  id: string;
  state: string;
  user: User;
  perfumes: Perfume[];
  totalMount: number;
}
