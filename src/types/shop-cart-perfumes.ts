import { PerfumeDetails } from "./perfumes";

export interface ShopCartPerfume {
  id: string;
  perfume: PerfumeDetails;
  cant: number;
}
