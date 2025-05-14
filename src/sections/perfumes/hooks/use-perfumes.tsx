"use client";
import { Pagination } from "@/types/pagination";
import { useCallback, useEffect, useState, useRef } from "react";
import { debounce } from "lodash";
import useClientPagination from "@/hooks/use-client-pagination";
import usePerfumesFilters from "../filters/hooks/use-perfumes-filters";
import { getPerfumesList } from "@/services/perfumes";
import { Perfume } from "@/types/perfumes";

export default function usePerfumes() {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
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
    usePerfumesFilters({ setPagination: setClientPagination });

  const debouncedFetchRef = useRef(
    debounce(async (filters, clientPagination) => {
      setLoadingData(true);
      setError(null);
      try {
        const res = await getPerfumesList({
          pagination: {
            page: clientPagination.page,
            perPage: clientPagination.pageSize,
          },
          search: filters.search,
        });

        if (!res.response || res.error)
          throw new Error("Error al cargar los perfumes");

        const perfumes = res.response;
        setPerfumes(perfumes);

        setPagination({ ...clientPagination, total: perfumes.length });
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoadingData(false);
      }
    }, 500)
  );

  const fetchPerfumes = useCallback(() => {
    debouncedFetchRef.current(filters, clientPagination);
  }, [clientPagination, filters]);

  useEffect(() => {
    fetchPerfumes();
  }, [fetchPerfumes]);

  useEffect(() => {
    const debouncedFetch = debouncedFetchRef.current;
    return () => {
      debouncedFetch.cancel();
    };
  }, []);

  return {
    perfumes,
    loadingData,
    error,
    pagination,
    filters,
    fetchPerfumes,
    clientHandleChangePage,
    clientHandlePageSizeChange,
    handleChangeFilters,
    handleResetFilters,
  };
}
