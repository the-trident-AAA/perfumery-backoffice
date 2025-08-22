import ThumbnailsImage from "@/components/thumbnails-image/thumbnails-image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { fCurrency } from "@/lib/format-number";
import { PerfumeDetails } from "@/types/perfumes";
import React from "react";

interface Props {
  perfume: PerfumeDetails;
}

export default function PerfumeDetailsHeader({ perfume }: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Image */}
      <ThumbnailsImage
        images={[perfume.image, ...perfume.images]}
        altName={perfume.name}
      />

      {/* Header with name and ID */}
      <div className="flex-1">
        <h2 className="text-2xl font-semibold text-secondary">
          {perfume.name}
        </h2>
        <p className="text-sm text-secondary">ID: {perfume.id}</p>

        <div className="mt-4 flex flex-col gap-2">
          <Separator className="mb-4" />

          {/* Quick info */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-secondary">Marca</p>
              <p className="font-medium">{perfume.brand.name}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium text-secondary">Precio</p>
              <p className="font-medium">{fCurrency(perfume.price)}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium text-secondary">
                Disponibilidad
              </p>
              <Badge variant={perfume.available ? "default" : "destructive"}>
                {perfume.available ? "Disponible" : "No disponible"}
              </Badge>
            </div>

            {perfume.offer && (
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-secondary">Descuento</p>
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
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-secondary">Descripción</p>
            <p className="text-sm line-clamp-3 break-words leading-relaxed text-secondary">
              {perfume.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
