import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { fCurrency } from "@/lib/format-number";
import { OrderPerfume } from "@/types/order-perfumes";
import Image from "next/image";
import React from "react";

interface Props {
  orderPerfume: OrderPerfume;
}

export default function OrderPerfumeCard({ orderPerfume }: Props) {
  return (
    <div key={orderPerfume.id} className="border rounded-lg p-4 bg-muted">
      <div className="flex items-start space-x-4">
        {/* Imagen del perfume */}
        <div className="flex-shrink-0">
          <Image
            src={
              orderPerfume.perfume.image ||
              "/placeholder.svg?height=80&width=80&query=perfume bottle"
            }
            height={600}
            width={600}
            alt={orderPerfume.perfume?.name || "Perfume"}
            className="w-20 h-20 border-3 border-secondary rounded-2xl object-cover"
          />
        </div>

        {/* Información del perfume */}
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-foreground text-base">
                {orderPerfume.perfume?.name || "Nombre no disponible"}
              </h4>
              <p className="font-semibold text-secondary">
                {orderPerfume.perfume?.brand?.name || "Marca no disponible"}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-foreground">
                {fCurrency(orderPerfume.price || 0)}
              </p>
              <p className="font-semibold text-secondary">
                Cantidad: {orderPerfume.cant || 0}
              </p>
            </div>
          </div>

          {/* Detalles técnicos del perfume */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div>
              <span className="font-semibold text-secondary">Tipo:</span>
              <p className="text-foreground">
                {orderPerfume.perfume?.perfumeType
                  ? orderPerfume.perfume.perfumeType.name
                  : "N/A"}
              </p>
            </div>
            <div>
              <span className="font-semibold text-secondary">Género:</span>
              <p className="text-foreground">
                {orderPerfume.perfume?.gender
                  ? orderPerfume.perfume.gender
                  : "N/A"}
              </p>
            </div>
            <div>
              <span className="font-semibold text-secondary">Volumen:</span>
              <p className="text-foreground">
                {orderPerfume.perfume?.milliliters || 0}ml
              </p>
            </div>
            <div className="flex justify-center items-center gap-2">
              <span className="font-semibold text-secondary">Disponible:</span>
              <Badge
                variant={
                  orderPerfume.perfume?.available ? "secondary" : "destructive"
                }
                className="text-xs"
              >
                {orderPerfume.perfume?.available ? "Sí" : "No"}
              </Badge>
            </div>
          </div>

          {/* Notas olfativas */}
          {orderPerfume.perfume?.scents &&
            orderPerfume.perfume.scents.length > 0 && (
              <div>
                <span className="font-semibold text-secondary text-sm">
                  Notas:
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {orderPerfume.perfume.scents.map((scent) => (
                    <Badge
                      key={scent.id}
                      variant="secondary"
                      className="text-xs"
                    >
                      {scent.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

          {/* Oferta si existe */}
          {orderPerfume.perfume?.offer && (
            <div className="flex items-center space-x-2">
              <Badge variant="destructive" className="text-xs">
                Oferta: {orderPerfume.perfume.offer.discount}% descuento
              </Badge>
            </div>
          )}

          {/* Subtotal del perfume */}
          <Separator className="bg-secondary" />
          <div className="flex justify-between items-center pt-2">
            <span className="font-semibold text-secondary">Subtotal:</span>
            <span className="font-semibold text-foreground">
              {fCurrency((orderPerfume.price || 0) * (orderPerfume.cant || 0))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
