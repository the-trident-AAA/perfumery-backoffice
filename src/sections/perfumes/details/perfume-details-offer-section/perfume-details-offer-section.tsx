import { Offer } from "@/types/offers";
import { Tag as TagIcon } from "lucide-react";
import React from "react";

interface Props {
  offer: Offer;
}

export default function PerfumeDetailsOfferSection({ offer }: Props) {
  return (
    <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
      <div className="flex items-center gap-2 mb-2">
        <TagIcon className="h-4 w-4 text-amber-600" />
        <h3 className="font-medium text-amber-800">Detalles de la oferta</h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">Nombre</p>
          <p className="font-medium">{offer.name}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">Tipo</p>
          <p className="font-medium">{offer.offerType}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">Alcance</p>
          <p className="font-medium">{offer.scope}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">Descuento</p>
          <p className="font-medium">{offer.discount}%</p>
        </div>
      </div>
    </div>
  );
}
