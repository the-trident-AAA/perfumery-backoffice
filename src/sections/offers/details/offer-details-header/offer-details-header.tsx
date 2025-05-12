import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { OfferDetails } from "@/types/offers";
import { Tag } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Props {
  offer: OfferDetails;
}

export default function OfferDetailsHeader({ offer }: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-6 mb-4">
      {/* Image */}
      <div className="w-full md:w-1/3 flex-shrink-0">
        <div className="relative aspect-square rounded-md overflow-hidden border w-80 h-80 lg:w-full lg:h-full border-gray-200">
          <Image
            src={offer.image || "/images/place-holder.jpg"}
            alt={offer.name}
            width={1920}
            height={1080}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Header with name and ID */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-2xl font-semibold text-gray-900">{offer.name}</h2>
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-800 border-amber-200"
          >
            {offer.discount}%
          </Badge>
        </div>
        <p className="text-sm text-gray-500 mb-2">ID: {offer.id}</p>

        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary">{offer.offerType}</Badge>
          <Badge variant="outline">{offer.scope}</Badge>
        </div>

        <Separator className="mb-4" />

        {/* Description */}
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-gray-500">Descripción</p>
          <p className="text-sm line-clamp-3 break-words leading-relaxed text-gray-700">
            {offer.description}
          </p>
        </div>
      </div>
    </div>
  );
}
