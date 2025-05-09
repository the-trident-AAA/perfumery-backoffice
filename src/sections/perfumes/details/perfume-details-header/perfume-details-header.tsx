import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { fCurrency } from "@/lib/format-number";
import { PerfumeDetails } from "@/types/perfumes";
import Image from "next/image";
import React from "react";

interface Props {
  perfume: PerfumeDetails;
}

export default function PerfumeDetailsHeader({ perfume }: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Image */}
      <div className="w-full md:w-1/3 flex-shrink-0 flex items-center justify-center">
        <div className="relative aspect-square rounded-md overflow-hidden border w-80 h-80 lg:w-full  lg:h-full border-gray-200">
          <Image
            src={perfume.image || "/images/place-holder.jpg"}
            alt={perfume.name}
            width={1920}
            height={1080}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Header with name and ID */}
      <div className="flex-1">
        <h2 className="text-2xl font-semibold text-gray-900">{perfume.name}</h2>
        <p className="text-sm text-gray-500">ID: {perfume.id}</p>

        <div className="mt-4">
          <Separator className="mb-4" />

          {/* Quick info */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Marca</p>
              <p className="font-medium">{perfume.brand.name}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Precio</p>
              <p className="font-medium">{fCurrency(perfume.price)}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">
                Disponibilidad
              </p>
              <Badge variant={perfume.available ? "default" : "destructive"}>
                {perfume.available ? "Disponible" : "No disponible"}
              </Badge>
            </div>

            {perfume.offer && (
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-gray-500">Descuento</p>
                <Badge
                  variant="outline"
                  className="bg-amber-50 text-xs text-amber-800 border-amber-200 
       line-clamp-2 [display:-webkit-box] [overflow:hidden] 
       [-webkit-box-orient:vertical] [-webkit-line-clamp:2] whitespace-normal"
                >
                  {perfume.offer.discount}% {perfume.offer.offerType}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
