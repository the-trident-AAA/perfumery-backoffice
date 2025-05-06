"use client";
import { Pagination } from "@/types/pagination";
import { Dispatch, SetStateAction, useState } from "react";

interface ScentsFilters {
  search: string;
}

interface Props {
  setPagination?: Dispatch<SetStateAction<Pagination>>;
}

export default function useScentsFilters({ setPagination }: Props) {
  const [filters, setFilters] = useState<ScentsFilters>({
    search: "",
  });

  async function handleChangeFilters(updatedFilters: ScentsFilters) {
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
