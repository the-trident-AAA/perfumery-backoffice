import { z } from "zod";

export const offerSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string().optional(),
  scope: z.string(),
  discount: z.number(),
  offerType: z.string(),
});
