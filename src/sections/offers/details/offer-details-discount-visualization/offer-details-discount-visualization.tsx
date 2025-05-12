import { OfferDetails } from "@/types/offers";
import React from "react";

interface Props {
  offer: OfferDetails;
}

export default function OfferDetailsDiscountVisualization({ offer }: Props) {
  const discountPercentage = Math.min(offer.discount * 100, 100);
  const roundedPercentage = Math.round(discountPercentage * 100) / 100;

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
      <h3 className="text-sm font-medium text-gray-500 mb-3">
        Visualización del descuento
      </h3>
      <div className="w-full bg-gray-200 rounded-full h-4 relative">
        <div
          className="bg-amber-500 h-4 rounded-full group relative"
          style={{ width: `${discountPercentage}%` }}
        >
          <div className="absolute right-0 top-0 transform translate-x-1/2 -translate-y-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="text-xs bg-gray-800 text-white px-2 py-1 rounded-md whitespace-nowrap">
              {roundedPercentage}
            </span>
            <div className="absolute left-1/2 -bottom-1 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-500">0%</span>
        <span className="text-xs text-gray-500">100%</span>
      </div>
    </div>
  );
}
