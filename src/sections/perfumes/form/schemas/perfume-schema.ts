import { z } from "zod";

export const perfumeSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  brand: z.string(),
  price: z.number(),
  cant: z.number(),
  milliliters: z.number(),
  perfumeType: z.string(),
  available: z.boolean(),
  gender: z.string(),
  scents: z.array(z.string()),
  discountOffer: z.number().nullable(),
});
