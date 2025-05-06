"use client";
import { Pagination } from "@/types/pagination";
import { useCallback, useEffect, useState, useRef } from "react";
import { debounce } from "lodash";
import { Brand } from "@/types/brands";
import { getBrandsList } from "@/services/brands";
import useBrandsFilters from "@/sections/perfumes/filters/hooks/use-brands-filters";
import useClientPagination from "@/hooks/use-client-pagination";

export default function useBrands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const {
    pagination: clientPagination,
    setPagination: setClientPagination,
    clientHandleChangePage,
    clientHandlePageSizeChange,
  } = useClientPagination();
  const [pagination, setPagination] = useState<Pagination>(clientPagination);
  const { filters, handleChangeFilters, handleResetFilters } = useBrandsFilters(
    { setPagination: setClientPagination }
  );

  const debouncedFetchRef = useRef(
    debounce(async (filters, clientPagination) => {
      setLoadingData(true);
      setError(null);
      try {
        const res = await getBrandsList({
          pagination: {
            page: clientPagination.page,
            perPage: clientPagination.pageSize,
          },
          search: filters.search,
        });

        if (!res.response || res.error)
          throw new Error("Error al cargar las brands");

        const brands = res.response;
        setBrands(brands);

        setPagination({ ...clientPagination, total: brands.length });
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoadingData(false);
      }
    }, 500)
  );

  const fetchBrands = useCallback(() => {
    debouncedFetchRef.current(filters, clientPagination);
  }, [clientPagination, filters]);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  useEffect(() => {
    const debouncedFetch = debouncedFetchRef.current;
    return () => {
      debouncedFetch.cancel();
    };
  }, []);

  return {
    brands,
    loadingData,
    error,
    pagination,
    filters,
    fetchBrands,
    clientHandleChangePage,
    clientHandlePageSizeChange,
    handleChangeFilters,
    handleResetFilters,
  };
}
