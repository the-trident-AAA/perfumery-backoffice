import { z } from "zod";

export interface OrderPerfumeEdit {
  entityId: string;
  perfumeId: string;
  cant: number;
}

export const orderPerfumeEditSchema = z.object({
  entityId: z.string(),
  perfumeId: z.string(),
  cant: z
    .number()
    .min(1, { message: "Es necesario especificar al menos un perfume" }),
});
