import { PerfumeDetails } from "@/types/perfumes";
import React from "react";

interface Props {
  perfume: PerfumeDetails;
}

export default function PerfumeDetailsInformation({ perfume }: Props) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Detalles del producto</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">Género</p>
          <p className="font-medium">{perfume.gender}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">Tipo</p>
          <p className="font-medium">{perfume.perfumeType.name}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">Contenido</p>
          <p className="font-medium">{perfume.liters} L</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">Cantidad</p>
          <p className="font-medium">{perfume.cant}</p>
        </div>
      </div>
    </div>
  );
}
