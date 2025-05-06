import { Gender } from "@/types/perfumes";
import { z } from "zod";

export interface PerfumeCreate {
  name: string;
  brandId: string;
  perfumeTypeId: string;
  offerId: string;
  liters: number;
  gender: Gender;
  scentsId: string[];
  available: boolean;
  price: number;
  cant: number;
}

export const perfumeCreateSchema = z.object({
  name: z.string().min(1),
  brandId: z.string(),
  perfumeTypeId: z.string(),
  offerId: z.string(),
  liters: z.number().min(1),
  gender: z.enum([Gender.MALE, Gender.FAMALE, Gender.UNISEX]),
  scentsId: z.array(z.string()).min(1),
  available: z.boolean(),
  price: z.number().min(1),
  cant: z.number().min(1),
});
