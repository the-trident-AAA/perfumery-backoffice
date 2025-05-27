import { Badge } from "@/components/ui/badge";
import { fCurrency } from "@/lib/format-number";
import ShopCartPerfumeCard from "@/sections/shop-carts/components/shop-cart-perfume-card/shop-cart-perfume-card";
import { ShopCart } from "@/types/shop-carts";
import { ShoppingCartIcon } from "lucide-react";
import React from "react";

interface Props {
  shopCart: ShopCart;
}

export default function UserDetailsShopCart({ shopCart }: Props) {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ShoppingCartIcon className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-medium">Carrito de compras</h3>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline">{shopCart.totalItems} artículos</Badge>
          <Badge variant="secondary">{fCurrency(shopCart.totalMount)}</Badge>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="font-medium text-gray-500">ID del Carrito</p>
            <p className="font-medium">{shopCart.id}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Total de Artículos</p>
            <p className="font-medium">{shopCart.totalItems}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Total a Pagar</p>
            <p className="font-medium">{fCurrency(shopCart.totalMount)}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Productos Únicos</p>
            <p className="font-medium">{shopCart.shopCartPerfumes.length}</p>
          </div>
        </div>
      </div>

      {/* Cart Items */}
      {shopCart.shopCartPerfumes.length > 0 ? (
        <div className="flex flex-col gap-4 overflow-auto max-h-[38vh] p-2">
          {shopCart.shopCartPerfumes.map((shopCartPerfume, index) => (
            <ShopCartPerfumeCard
              key={index}
              shopCartPerfume={shopCartPerfume}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-md border border-gray-200">
          <ShoppingCartIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">El carrito está vacío</p>
        </div>
      )}
    </div>
  );
}
