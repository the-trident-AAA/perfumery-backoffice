import { Badge } from "@/components/ui/badge";
import { TapeDetails } from "@/types/tapes";
import Image from "next/image";
import React from "react";

interface Props {
  tape: TapeDetails;
}

export default function TapeDetailsContainer({ tape }: Props) {
  return (
    <div>
      <div>
        <div className="text-2xl font-semibold">Detalles del Listón</div>
      </div>

      <div className="space-y-6 mt-4">
        {/* Imagen del listón */}
        <div className="relative w-full h-48 rounded-lg overflow-hidden bg-muted">
          <Image
            src={tape.image || "/placeholder.svg"}
            alt={tape.name}
            fill
            className="object-cover"
            sizes="(max-width: 448px) 100vw, 448px"
          />
        </div>

        {/* Información del listón */}
        <div className="space-y-4">
          {/* Nombre */}
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Nombre
            </label>
            <p className="mt-1 text-base font-medium text-foreground">
              {tape.name}
            </p>
          </div>

          {/* ID */}
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              ID
            </label>
            <p className="mt-1 text-sm font-mono text-foreground/80">
              {tape.id}
            </p>
          </div>

          {/* Estado Principal */}
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Estado
            </label>
            <div className="mt-2">
              {tape.isMain ? (
                <Badge variant="secondary">Listón Principal</Badge>
              ) : (
                <Badge variant="secondary">Listón Secundario</Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
