import React from "react";
import { useFormContext } from "react-hook-form";
import { OrderPerfumeEdit } from "../edit/schemas/order-perfume-edit-schema";
import { OrderPerfume } from "@/types/order-perfumes";
import { Badge } from "@/components/ui/badge";
import { fCurrency } from "@/lib/format-number";
import DeleteMaskCard from "@/components/form/components/delete-mask-card/delete-mask-card";
import RHFOrderPerfumeCard from "./rhf-order-perfume-card/rhf-order-perfume-card";
import { Sparkles } from "lucide-react";
import { toast } from "react-toastify";

interface Props {
  orderPerfumesMap: OrderPerfume[];
}

export default function RHFOrderPerfumesList({ orderPerfumesMap }: Props) {
  const { watch, setValue, trigger } = useFormContext();
  const orderPerfumes = watch("orderPerfumes") as OrderPerfumeEdit[];

  const handleRemovePerfume = (indexToRemove: number) => {
    if (orderPerfumes.length > 1) {
      const updatedPerfumes = orderPerfumes.filter(
        (_, index) => index !== indexToRemove
      );
      setValue("orderPerfumes", updatedPerfumes);
      trigger("orderPerfumes");
    } else {
      toast.error("El pedido debe de tener al menos un perfume");
    }
  };

  const orderPerfumeMapping = orderPerfumes.map((orderPerfumeSchema) => {
    const orderPerfume = orderPerfumesMap.find(
      (orderPerfumeMap) => orderPerfumeMap.id === orderPerfumeSchema.entityId
    ) as OrderPerfume;

    return { ...orderPerfume, cant: orderPerfumeSchema.cant };
  });

  return (
    <div className="space-y-4">
      <Badge variant={"secondary"} className="text-primary text-base">
        <p className="text-primary text-sm sm:text-base">
          Costo del pedido actualizado:{" "}
          {fCurrency(
            orderPerfumeMapping.reduce((total, orderPerfume) => {
              return (
                total +
                (orderPerfume
                  ? orderPerfume.perfume.totalPrice * orderPerfume.cant
                  : 0)
              );
            }, 0)
          )}{" "}
        </p>
      </Badge>

      {orderPerfumeMapping.length > 0 ? (
        <div className={`grid grid-cols-1 xl:grid-cols-2 gap-4 pb-6`}>
          {orderPerfumeMapping.map((orderPerfume, index) => {
            return (
              <DeleteMaskCard
                key={index}
                handleRemove={() => {
                  handleRemovePerfume(index);
                }}
              >
                <RHFOrderPerfumeCard
                  index={index}
                  perfumeOrder={
                    {
                      ...orderPerfume,
                      cant: orderPerfume.cant,
                      price:
                        orderPerfume.cant *
                        (orderPerfume.perfume.totalPrice || 0),
                    } as OrderPerfume
                  }
                />
              </DeleteMaskCard>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="bg-muted/50 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Sparkles className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">
            No hay perfumes en este pedido.
          </p>
        </div>
      )}
    </div>
  );
}
