"use client";
import { useCallback, useState } from "react";
import { OrderEdit } from "../form/edit/schemas/order-edit-schema";
import { editOrder as editOrderService } from "@/services/orders";
import { convertOrderEditDTO } from "@/types/orders";

interface Props {
  id: string;
  onEditAction: () => void;
}

export default function useEditOrder({ id, onEditAction }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editOrder = useCallback(
    async (order: OrderEdit) => {
      try {
        setLoading(true);
        setError(null);
        const res = await editOrderService(id, convertOrderEditDTO(order));
        if (!res.response || res.error)
          setError(res.error?.reason || "Error en la edición de la oferta");
        else {
          onEditAction();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [onEditAction, id]
  );
  return {
    loading,
    error,
    editOrder,
  };
}
