"use client";
import { Pagination } from "@/types/pagination";
import { Dispatch, SetStateAction, useState } from "react";

interface OrdersFilters {
  search: string;
}

interface Props {
  setPagination?: Dispatch<SetStateAction<Pagination>>;
}

export default function useOrdersFilters({ setPagination }: Props) {
  const [filters, setFilters] = useState<OrdersFilters>({
    search: "",
  });

  async function handleChangeFilters(updatedFilters: OrdersFilters) {
    await setFilters((prev) => ({
      ...prev,
      ...updatedFilters,
    }));
    if (setPagination)
      setPagination((oldPagination) => ({ ...oldPagination, page: 1 }));
  }

  function handleResetFilters() {
    setFilters({
      search: "",
    });
    if (setPagination)
      setPagination((oldPagination) => ({ ...oldPagination, page: 1 }));
  }

  return { filters, handleChangeFilters, handleResetFilters };
}
