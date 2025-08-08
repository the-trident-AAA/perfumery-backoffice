"use client";
import { getOrderById } from "@/services/orders";
import { OrderDetails } from "@/types/orders";
import { useCallback, useEffect, useState } from "react";

interface Props {
  id: string | null;
}

export default function useOrder({ id }: Props) {
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchOrder = useCallback(async () => {
    if (id) {
      setLoading(true);
      setError(null);
      try {
        const res = await getOrderById(id);

        if (!res.response || res.error)
          throw new Error("Error al cargar la información de la orden");

        setOrder(res.response);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);
  return { order, error, loading, fetchOrder };
}
