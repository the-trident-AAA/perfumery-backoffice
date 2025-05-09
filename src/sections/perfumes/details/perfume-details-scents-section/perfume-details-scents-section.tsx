import { Badge } from "@/components/ui/badge";
import { Scent } from "@/types/scents";
import React from "react";

interface Props {
  scents: Scent[];
}

export default function PerfumeDetailsScentsSection({ scents }: Props) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-500 mb-2">Aromas</h3>
      <div className="flex flex-wrap gap-2">
        {scents.map((scent) => (
          <Badge key={scent.id} variant="outline" className="bg-gray-100">
            {scent.name}
          </Badge>
        ))}
      </div>
    </div>
  );
}
