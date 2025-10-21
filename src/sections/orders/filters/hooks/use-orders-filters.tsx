"use client";

import useUrlFilters from "@/hooks/use-url-filters";
import { OrderStatus } from "@/types/orders";
import { Pagination } from "@/types/pagination";
import { useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export interface OrdersFilters {
  state?: OrderStatus;
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

    setFilters((oldFilters) => ({
      ...oldFilters,
      state: stateParam || undefined,
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
    if (urlFilters) updateFiltersInUrl(newFilters);
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

    return count;
  };

  return {
    filters,
    handleChangeFilters,
    handleResetFilters,
    getActiveFiltersCount,
  };
}
