import { PerfumeDetails } from "./perfumes";

export interface OrderPerfume{
    id: number;
    perfume: PerfumeDetails;
    cant: number;
    price: number;
}