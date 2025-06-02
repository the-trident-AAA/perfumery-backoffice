"use client";
import useUrlFilters from "@/hooks/use-url-filters";
import { Pagination } from "@/types/pagination";
import { convertPerfumesFiltersDTO, Gender } from "@/types/perfumes";
import { Dispatch, SetStateAction, useState } from "react";

export interface PerfumesFilters {
  name?: string;
  description?: string;
  brandId?: string;
  gender?: Gender;
  scentsIds: string[];
  millilitersRange: [number, number];
  perfumeTypeId?: string;
  available?: boolean;
  priceRange: [number, number];
  cant?: number;
  offerId?: string;
}

interface Props {
  setPagination?: Dispatch<SetStateAction<Pagination>>;
}

export default function usePerfumesFilters({ setPagination }: Props) {
  const { updateFiltersInUrl } = useUrlFilters();
  const [filters, setFilters] = useState<PerfumesFilters>({
    priceRange: [0, 1000],
    millilitersRange: [0, 100],
    scentsIds: []
  });

  async function handleChangeFilters(updatedFilters: Partial<PerfumesFilters>) {
    const newFilters = {
      ...filters,
      ...updatedFilters,
    };
    await setFilters((prev) => ({
      ...prev,
      ...updatedFilters,
    }));
    updateFiltersInUrl(convertPerfumesFiltersDTO(newFilters));
    if (setPagination)
      setPagination((oldPagination) => ({ ...oldPagination, page: 1 }));
  }

  function handleResetFilters() {
    setFilters({
      priceRange: [0, 1000],
      millilitersRange: [0, 100],
      scentsIds: []
    });
    updateFiltersInUrl({});
    if (setPagination)
      setPagination((oldPagination) => ({ ...oldPagination, page: 1 }));
  }

  return { filters, handleChangeFilters, handleResetFilters };
}
