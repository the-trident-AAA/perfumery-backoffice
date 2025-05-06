"use client";
import { Pagination } from "@/types/pagination";
import { useCallback, useEffect, useState, useRef } from "react";
import { debounce } from "lodash";
import useClientPagination from "@/hooks/use-client-pagination";
import { PerfumeType } from "@/types/perfume-types";
import usePerfumeTTypesFilters from "../filters/hooks/use-perfume-types-filters";
import { getPerfumeTypesList } from "@/services/perfume-types";

export default function usePerfumeTypes() {
  const [perfumeTypes, setPerfumeTypes] = useState<PerfumeType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const {
    pagination: clientPagination,
    setPagination: setClientPagination,
    clientHandleChangePage,
    clientHandlePageSizeChange,
  } = useClientPagination();
  const [pagination, setPagination] = useState<Pagination>(clientPagination);
  const { filters, handleChangeFilters, handleResetFilters } =
    usePerfumeTTypesFilters({ setPagination: setClientPagination });

  const debouncedFetchRef = useRef(
    debounce(async (filters, clientPagination) => {
      setLoadingData(true);
      setError(null);
      try {
        const res = await getPerfumeTypesList({
          pagination: {
            page: clientPagination.page,
            perPage: clientPagination.pageSize,
          },
          search: filters.search,
        });

        if (!res.response || res.error)
          throw new Error("Error al cargar las perfume types");

        const perfumeTypes = res.response;
        setPerfumeTypes(perfumeTypes);

        setPagination({ ...clientPagination, total: perfumeTypes.length });
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoadingData(false);
      }
    }, 500)
  );

  const fetchPerfumeTypes = useCallback(() => {
    debouncedFetchRef.current(filters, clientPagination);
  }, [clientPagination, filters]);

  useEffect(() => {
    fetchPerfumeTypes();
  }, [fetchPerfumeTypes]);

  useEffect(() => {
    return () => {
      debouncedFetchRef.current.cancel();
    };
  }, []);

  return {
    perfumeTypes,
    loadingData,
    error,
    pagination,
    filters,
    fetchPerfumeTypes,
    clientHandleChangePage,
    clientHandlePageSizeChange,
    handleChangeFilters,
    handleResetFilters,
  };
}
