"use client";
import useUrlFilters from "@/hooks/use-url-filters";
import { Pagination } from "@/types/pagination";
import { convertUserFiltersDTO } from "@/types/users";
import { Dispatch, SetStateAction, useState } from "react";

export interface UsersFilters {
  username?: string;
  email?: string;
  role?: string;
}

interface Props {
  setPagination?: Dispatch<SetStateAction<Pagination>>;
}

export default function useUsersFilters({ setPagination }: Props) {
  const { updateFiltersInUrl } = useUrlFilters();
  const [filters, setFilters] = useState<UsersFilters>({});

  async function handleChangeFilters(updatedFilters: Partial<UsersFilters>) {
        const newFilters = {
      ...filters,
      ...updatedFilters,
    };
    await setFilters((prev) => ({
      ...prev,
      ...updatedFilters,
    }));
    updateFiltersInUrl(convertUserFiltersDTO(newFilters));
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
    if (filters.username) count++;
    if (filters.email) count++;
    if (filters.role) count++;

    return count;
  };


  return {
    filters,
    handleChangeFilters,
    handleResetFilters,
    getActiveFiltersCount,
  };
}
