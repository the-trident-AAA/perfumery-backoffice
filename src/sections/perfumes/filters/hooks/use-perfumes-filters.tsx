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
    scentsIds: [],
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
      scentsIds: [],
    });
    updateFiltersInUrl({});
    if (setPagination)
      setPagination((oldPagination) => ({ ...oldPagination, page: 1 }));
  }

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.name) count++;
    if (filters.brandId) count++;
    if (filters.gender) count++;
    if (filters.scentsIds?.length) count++;
    if (filters.perfumeTypeId) count++;
    if (filters.available !== undefined) count++;
    if (filters.offerId) count++;
    if (filters.priceRange[0] > 0) count++;
    if (filters.millilitersRange[0] > 0) count++;
    return count;
  };

  return {
    filters,
    handleChangeFilters,
    handleResetFilters,
    getActiveFiltersCount,
  };
}
