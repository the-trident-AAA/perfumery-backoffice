import { ShopCartPerfume } from "./shop-cart-perfumes";

export interface ShopCart {
  id: string;
  shopCartPerfumes: ShopCartPerfume[];
}
