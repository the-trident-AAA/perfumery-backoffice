"use client";

import { RHFQuantityInput } from "@/components/form/rhf-components/rhf-quantity-input/rhf-quantity-input";
import StockWarningWrapper from "@/components/stock-warning-wrapper/stock-warning-wrapper";
import { fCurrency } from "@/lib/format-number";
import { OrderPerfume } from "@/types/order-perfumes";
import Image from "next/image";

interface Props {
  index: number;
  perfumeOrder: OrderPerfume;
}

export default function RHFOrderPerfumeCard({
  perfumeOrder: { perfume, cant, price },
  index,
}: Props) {
  const isOutOfStock = cant > perfume.cant;

  return (
    <StockWarningWrapper
      hasWarning={isOutOfStock}
      warningTitle={"Sin stock suficiente"}
      warningMessage={"No existen existencias del perfume"}
      warningDetails={
        !isOutOfStock ? "Reduce la cantidad para continuar" : undefined
      }
    >
      <div className=" rounded-2xl border">
        <div className="p-0">
          <div className={`flex items-center`}>
            {/* Imagen del producto */}
            <div
              className={`relative h-28 w-28 2xs:h-32 2xs:w-32 flex-shrink-0`}
            >
              <Image
                className="aspect-square object-cover"
                src={perfume.image || "images/place-holder.jpg"}
                alt={"image"}
                width={400}
                height={400}
              />
            </div>

            {/* Información del producto */}
            <div className="flex flex-1 flex-col p-4">
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <h3 className="font-medium text-base sm:text-lg truncate">
                  {perfume.name}
                </h3>
                <p className="font-semibold text-sm 2xs:text-base">
                  {fCurrency(perfume.totalPrice)}
                </p>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {perfume.description}
              </p>

              {/* Controles de cantidad */}
              <div className="flex items-center flex-row gap-1 justify-between mt-3">
                <RHFQuantityInput
                  name={`orderPerfumes.${index}.cant`}
                  conditionalChange={cant + 1 <= perfume.cant}
                  conditionalChangeError="No se puede seleccionar más cantidad de ese perfume, ya que la tienda no cuenta con la disponibilidad suficiente"
                  min={1}
                />
                <div className="flex flex-col items-center 2xs:flex-row gap-1">
                  <p className="font-medium text-sm 2xs:text-base ">Total: </p>
                  <span className="font-bold text-xs 2xs:text-base">
                    {fCurrency(price)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StockWarningWrapper>
  );
}
