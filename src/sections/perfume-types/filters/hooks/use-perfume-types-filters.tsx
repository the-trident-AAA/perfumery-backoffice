"use client";
import useUrlFilters from "@/hooks/use-url-filters";
import { convertPerfumeTypeFiltersDTO } from "@/types/perfume-types";
import { Pagination } from "@/types/pagination";
import { Dispatch, SetStateAction, useState } from "react";

export interface PerfumeTypesFilters {
  name?: string;
}

interface Props {
  setPagination?: Dispatch<SetStateAction<Pagination>>;
}

export default function usePerfumeTypesFilters({ setPagination }: Props) {
  const { updateFiltersInUrl } = useUrlFilters();
  const [filters, setFilters] = useState<PerfumeTypesFilters>({});

  async function handleChangeFilters(updatedFilters: PerfumeTypesFilters) {
    const newFilters = {
      ...filters,
      ...updatedFilters,
    };
    await setFilters((prev) => ({
      ...prev,
      ...updatedFilters,
    }));
    updateFiltersInUrl(convertPerfumeTypeFiltersDTO(newFilters));
    if (setPagination)
      setPagination((oldPagination) => ({ ...oldPagination, page: 1 }));
  }

  function handleResetFilters() {
    setFilters({});
    updateFiltersInUrl({});
    if (setPagination)
      setPagination((oldPagination) => ({ ...oldPagination, page: 1 }));
  }

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.name) count++;

    return count;
  };

  return {
    filters,
    handleChangeFilters,
    handleResetFilters,
    getActiveFiltersCount,
  };
}
