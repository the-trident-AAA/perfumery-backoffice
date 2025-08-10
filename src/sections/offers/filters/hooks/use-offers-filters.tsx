"use client";
import useUrlFilters from "@/hooks/use-url-filters";
import { convertOfferFiltersDTO } from "@/types/offers";
import { Pagination } from "@/types/pagination";
import { Dispatch, SetStateAction, useState } from "react";

export interface OffersFilters {
  name?: string;
  description?: string;
  scope?: string;
  discount: [number , number];
  offerType?: string;
}

interface Props {
  setPagination?: Dispatch<SetStateAction<Pagination>>;
}

export default function useOffersFilters({ setPagination }: Props) {
  const { updateFiltersInUrl } = useUrlFilters();
  const [filters, setFilters] = useState<OffersFilters>({ discount : [0,100] });

  async function handleChangeFilters(updatedFilters: Partial<OffersFilters>) {
        const newFilters = {
      ...filters,
      ...updatedFilters,
    };
    await setFilters((prev) => ({
      ...prev,
      ...updatedFilters,
    }));
    updateFiltersInUrl(convertOfferFiltersDTO(newFilters));
    if (setPagination)
      setPagination((oldPagination) => ({ ...oldPagination, page: 1 }));
  }

  function handleResetFilters() {
    setFilters({ discount : [0,100] });
    updateFiltersInUrl({});
    if (setPagination)
      setPagination((oldPagination) => ({ ...oldPagination, page: 1 }));
  }

   const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.name) count++;
    if (filters.description) count++;
    if (filters.scope) count++;
    if (filters.offerType) count++;

    return count;
  };


  return {
    filters,
    handleChangeFilters,
    handleResetFilters,
    getActiveFiltersCount,
  };
}
