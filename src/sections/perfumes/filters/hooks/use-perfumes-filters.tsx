"use client";
import { Pagination } from "@/types/pagination";
import { Dispatch, SetStateAction, useState } from "react";

interface PerfumesFilters {
  search: string;
}

interface Props {
  setPagination?: Dispatch<SetStateAction<Pagination>>;
}

export default function usePerfumesFilters({ setPagination }: Props) {
  const [filters, setFilters] = useState<PerfumesFilters>({
    search: "",
  });

  async function handleChangeFilters(updatedFilters: PerfumesFilters) {
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
