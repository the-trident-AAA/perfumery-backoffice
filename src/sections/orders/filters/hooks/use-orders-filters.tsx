"use client";
import useUrlFilters from "@/hooks/use-url-filters";
import { convertOrderFiltersDTO } from "@/types/orders";
import { Pagination } from "@/types/pagination";
import { Dispatch, SetStateAction, useState } from "react";

export interface OrdersFilters {
  state?: string;
  userId?: string;
}

interface Props {
  setPagination?: Dispatch<SetStateAction<Pagination>>;
}

export default function useOrdersFilters({ setPagination }: Props) {
  const { updateFiltersInUrl } = useUrlFilters();
  const [filters, setFilters] = useState<OrdersFilters>({});

  async function handleChangeFilters(updatedFilters: OrdersFilters) {
    const newFilters = {
      ...filters,
      ...updatedFilters,
    };
    await setFilters((prev) => ({
      ...prev,
      ...updatedFilters,
    }));
    updateFiltersInUrl(convertOrderFiltersDTO(newFilters));
    if (setPagination)
      setPagination((oldPagination) => ({ ...oldPagination, page: 1 }));
  }

  function handleResetFilters() {
    setFilters({});
    if (setPagination)
      setPagination((oldPagination) => ({ ...oldPagination, page: 1 }));
  }

   const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.state) count++;
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

