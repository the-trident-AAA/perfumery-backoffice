"use client";
import useUrlFilters from "@/hooks/use-url-filters";
import { convertHomeBannersFiltersDTO } from "@/types/home-banners";
import { Pagination } from "@/types/pagination";
import { Dispatch, SetStateAction, useState } from "react";

export interface HomeBannersFilters {
  title?: string;
  description?: string;
}

interface Props {
  setPagination?: Dispatch<SetStateAction<Pagination>>;
}

export default function useHomeBannersFilters({ setPagination }: Props) {
  const { updateFiltersInUrl } = useUrlFilters();
  const [filters, setFilters] = useState<HomeBannersFilters>({});

  async function handleChangeFilters(updatedFilters: Partial<HomeBannersFilters>) {
        const newFilters = {
      ...filters,
      ...updatedFilters,
    };
    await setFilters((prev) => ({
      ...prev,
      ...updatedFilters,
    }));
    updateFiltersInUrl(convertHomeBannersFiltersDTO(newFilters));
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
    if (filters.title) count++;
    if (filters.description) count++;

    return count;
  };


  return {
    filters,
    handleChangeFilters,
    handleResetFilters,
    getActiveFiltersCount,
  };
}
