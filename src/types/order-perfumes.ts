import { PerfumeDetails } from "./perfumes";

export interface OrderPerfume {
  id: string;
  perfume: PerfumeDetails;
  cant: number;
  price: number;
}

export interface OrderPerfumeDTO {
  perfumeId: string;
  cant: number;
}
