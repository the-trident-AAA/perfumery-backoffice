import { Badge } from "@/components/ui/badge";
import { fCurrency } from "@/lib/format-number";
import { ShopCartPerfume } from "@/types/shop-cart-perfumes";
import Image from "next/image";
import React from "react";

interface Props {
  shopCartPerfume: ShopCartPerfume;
}

export default function ShopCartPerfumeCard({ shopCartPerfume }: Props) {
  return (
    <div
      key={shopCartPerfume.id}
      className="border border-gray-200 rounded-md p-4"
    >
      <div className="flex items-start gap-4">
        {/* Perfume image */}
        <div className="w-16 h-16 flex-shrink-0">
          <Image
            src={shopCartPerfume.perfume.image || "/images/place-holder.jpg"}
            alt={shopCartPerfume.perfume.name}
            className="w-full h-full object-cover rounded-md"
            height={640}
            width={640}
          />
        </div>

        {/* Perfume details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1">
            <h4 className="font-medium text-gray-900 truncate">
              {shopCartPerfume.perfume.name}
            </h4>
            <Badge
              color={
                shopCartPerfume.perfume.available ? "success" : "destructive"
              }
              className="text-xs ml-2"
            >
              {shopCartPerfume.perfume.available ? "Disponible" : "Agotado"}
            </Badge>
          </div>

          <p className="text-sm text-gray-500 mb-2">
            {shopCartPerfume.perfume.brand.name}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div>
              <span className="text-gray-500">Precio unitario:</span>
              <p className="font-medium">
                {fCurrency(shopCartPerfume.perfume.price)}
              </p>
            </div>
            <div>
              <span className="text-gray-500">Cantidad:</span>
              <p className="font-medium">{shopCartPerfume.cant}</p>
            </div>
            <div>
              <span className="text-gray-500">Subtotal:</span>
              <p className="font-medium">{fCurrency(shopCartPerfume.price)}</p>
            </div>
            <div>
              <span className="text-gray-500">Contenido:</span>
              <p className="font-medium">
                {shopCartPerfume.perfume.milliliters} ml
              </p>
            </div>
          </div>

          {shopCartPerfume.perfume.offer && (
            <div className="mt-2">
              <Badge
                variant="outline"
                className="bg-amber-50 text-amber-800 border-amber-200 text-xs"
              >
                {shopCartPerfume.perfume.offer.discount}%{" "}
                {shopCartPerfume.perfume.offer.offerType}
              </Badge>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
