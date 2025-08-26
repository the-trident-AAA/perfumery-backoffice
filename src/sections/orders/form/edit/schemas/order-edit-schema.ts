import { OrderStatus } from "@/types/orders";
import { z } from "zod";

export interface OrderEdit {
  state: OrderStatus;
}

export const orderEditSchema = z.object({
  state: z.enum(
    [OrderStatus.PENDING, OrderStatus.COMPLETED, OrderStatus.CANCELED],
    {
      message: "Debe de seleccionar un estado válido",
    }
  ),
});
