"use client";
import { Pagination } from "@/types/pagination";
import { useCallback, useEffect, useState, useRef } from "react";
import { debounce } from "lodash";
import useClientPagination from "@/hooks/use-client-pagination";
import { convertScentFiltersDTO, Scent } from "@/types/scents";
import useScentsFilters from "../filters/hooks/use-scents-filters";
import { getScentsList } from "@/services/scents";

export default function useScents() {
  const [scents, setScents] = useState<Scent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const {
    pagination: clientPagination,
    setPagination: setClientPagination,
    clientHandleChangePage,
    clientHandlePageSizeChange,
  } = useClientPagination();
  const [pagination, setPagination] = useState<Pagination>(clientPagination);
  const { filters, handleChangeFilters, handleResetFilters } = useScentsFilters(
    { setPagination: setClientPagination, urlFilters: false }
  );

  const debouncedFetchRef = useRef(
    debounce(async (filters, clientPagination) => {
      setLoadingData(true);
      setError(null);
      try {
        const res = await getScentsList({
          pagination: {
            page: clientPagination.page,
            perPage: clientPagination.pageSize,
          },
          ...convertScentFiltersDTO(filters),
        });

        if (!res.response || res.error)
          throw new Error("Error al cargar las scents");

        const scents = res.response;
        setScents(scents);

        setPagination({ ...clientPagination, total: scents.length });
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoadingData(false);
      }
    }, 500)
  );

  const fetchScents = useCallback(() => {
    debouncedFetchRef.current(filters, clientPagination);
  }, [clientPagination, filters]);

  useEffect(() => {
    fetchScents();
  }, [fetchScents]);

  useEffect(() => {
    const debouncedFetch = debouncedFetchRef.current;
    return () => {
      debouncedFetch.cancel();
    };
  }, []);

  return {
    scents,
    loadingData,
    error,
    pagination,
    filters,
    fetchScents,
    clientHandleChangePage,
    clientHandlePageSizeChange,
    handleChangeFilters,
    handleResetFilters,
  };
}
