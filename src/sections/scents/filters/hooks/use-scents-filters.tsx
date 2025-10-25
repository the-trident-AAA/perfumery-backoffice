"use client";
import useUrlFilters from "@/hooks/use-url-filters";
import { convertScentFiltersDTO } from "@/types/scents";
import { Pagination } from "@/types/pagination";
import { Dispatch, SetStateAction, useState } from "react";

export interface ScentsFilters {
  name?: string;
}

interface Props {
  setPagination?: Dispatch<SetStateAction<Pagination>>;
  urlFilters?: boolean;
}

export default function useScentsFilters({
  setPagination,
  urlFilters = true,
}: Props) {
  const { updateFiltersInUrl } = useUrlFilters();
  const [filters, setFilters] = useState<ScentsFilters>({});

  async function handleChangeFilters(updatedFilters: ScentsFilters) {
    const newFilters = {
      ...filters,
      ...updatedFilters,
    };
    await setFilters((prev) => ({
      ...prev,
      ...updatedFilters,
    }));
    if (urlFilters) updateFiltersInUrl(convertScentFiltersDTO(newFilters));
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
