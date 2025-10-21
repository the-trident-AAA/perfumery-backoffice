"use client";

import useUrlFilters from "@/hooks/use-url-filters";
import { convertOrderFiltersDTO, OrderStatus } from "@/types/orders";
import { Pagination } from "@/types/pagination";
import { useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export interface OrdersFilters {
  state?: OrderStatus;
  lastUpdateDateMin?: Date;
  lastUpdateDateMax?: Date;
  userId?: string;
}

interface Props {
  setPagination?: Dispatch<SetStateAction<Pagination>>;
  defaultsFilters?: OrdersFilters;
  urlFilters?: boolean;
}

export default function useOrdersFilters({
  setPagination,
  defaultsFilters = {},
  urlFilters = false,
}: Props) {
  const searchParams = useSearchParams();
  const { updateFiltersInUrl } = useUrlFilters();
  const [filters, setFilters] = useState<OrdersFilters>(defaultsFilters);

  useEffect(() => {
    const stateParam = (searchParams.get("state") as OrderStatus) || null;
    const lastUpdateDateMaxParam = searchParams.get("lastUpdateDateMax");
    const lastUpdateDateMinParam = searchParams.get("lastUpdateDateMin");
    const userIdParam = searchParams.get("userId");

    setFilters((oldFilters) => ({
      ...oldFilters,
      state: stateParam || undefined,
      lastUpdateDateMax: lastUpdateDateMaxParam
        ? new Date(lastUpdateDateMaxParam)
        : undefined,
      lastUpdateDateMin: lastUpdateDateMinParam
        ? new Date(lastUpdateDateMinParam)
        : undefined,
      userId: userIdParam || undefined,
    }));
  }, [searchParams]);

  async function handleChangeFilters(updatedFilters: Partial<OrdersFilters>) {
    const newFilters = {
      ...filters,
      ...updatedFilters,
    };
    await setFilters((prev) => ({
      ...prev,
      ...updatedFilters,
    }));
    if (urlFilters) updateFiltersInUrl(convertOrderFiltersDTO(newFilters));
    if (setPagination)
      setPagination((oldPagination) => ({ ...oldPagination, page: 1 }));
  }

  function handleResetFilters() {
    setFilters({});
    if (urlFilters) updateFiltersInUrl({});
    if (setPagination)
      setPagination((oldPagination) => ({ ...oldPagination, page: 1 }));
  }

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.state) count++;
    if (filters.lastUpdateDateMax) count++;
    if (filters.lastUpdateDateMin) count++;
    if (filters.userId) count++;

    return count;
  };

  return {
    filters,
    handleChangeFilters,
    handleResetFilters,
    getActiveFiltersCount,
  };
}
