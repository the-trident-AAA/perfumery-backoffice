import { ShopCartPerfume } from "./shop-cart-perfumes";

export interface ShopCart {
  id: string;
  shopCartPerfumes: ShopCartPerfume[];
}

// opetations

export const getTotalItemsShopCart = (shopCart: ShopCart) => {
  return shopCart.shopCartPerfumes.reduce((sum, item) => sum + item.cant, 0);
};

export const getTotalPriceShopCart = (shopCart: ShopCart) => {
  return shopCart.shopCartPerfumes.reduce(
    (sum, item) => sum + item.perfume.price * item.cant,
    0
  );
};
