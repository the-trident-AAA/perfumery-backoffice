import { OfferDetails } from "@/types/offers";
import { Percent } from "lucide-react";
import React from "react";

interface Props {
  offer: OfferDetails;
}

export default function OfferDetailsInformation({ offer }: Props) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-4">Detalles de la oferta</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">Tipo de oferta</p>
          <p className="font-medium">{offer.offerType}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">Alcance</p>
          <p className="font-medium">{offer.scope}</p>
        </div>

        <div className="space-y-1 flex items-center">
          <div className="w-full">
            <p className="text-sm font-medium text-gray-500">Descuento</p>
            <div className="flex items-center gap-1">
              <Percent className="h-4 w-4 text-amber-600" />
              <p className="font-medium">{offer.discount * 100} %</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
