import { OrderStatus } from "@/types/orders";
import { z } from "zod";
import {
  OrderPerfumeEdit,
  orderPerfumeEditSchema,
} from "./order-perfume-edit-schema";

export interface OrderEdit {
  state: OrderStatus;
  orderPerfumes: OrderPerfumeEdit[];
}

export const orderEditSchema = z.object({
  state: z.enum(
    [OrderStatus.PENDING, OrderStatus.COMPLETED, OrderStatus.CANCELED],
    {
      message: "Debe de seleccionar un estado válido",
    }
  ),
  orderPerfumes: z.array(orderPerfumeEditSchema),
});
