"use client";

import useUrlFilters from "@/hooks/use-url-filters";
import { Pagination } from "@/types/pagination";
import { convertPerfumesFiltersDTO, Gender } from "@/types/perfumes";
import { useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

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
  salesRange: [number, number];
  cant?: number;
  offerId?: string;
}

interface Props {
  setPagination?: Dispatch<SetStateAction<Pagination>>;
}

export default function usePerfumesFilters({ setPagination }: Props) {
  const { updateFiltersInUrl } = useUrlFilters();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<PerfumesFilters>({
    priceRange: [0, 1000],
    millilitersRange: [0, 1000],
    salesRange: [0, 1000],
    scentsIds: [],
  });

  useEffect(() => {
    const nameParam = searchParams.get("name");
    const perfumTypeParam = searchParams.get("perfumeTypeId");
    const brandParam = searchParams.get("brandId");
    const genderParam = searchParams.get("gender") as Gender | null;
    const offerParam = searchParams.get("offerId");
    const availableParam = searchParams.get("available");
    const priceMinParam = searchParams.get("priceMin");
    const priceMaxParam = searchParams.get("priceMax");
    const millilitersMinParam = searchParams.get("millilitersMin");
    const millilitersMaxParam = searchParams.get("millilitersMax");
    const salesMinParam = searchParams.get("salesMin");
    const salesMaxParam = searchParams.get("salesMax");

    setFilters((oldFilters) => ({
      ...oldFilters,
      name: nameParam || undefined,
      perfumeTypeId: perfumTypeParam || undefined,
      brandId: brandParam || undefined,
      gender: genderParam || undefined,
      offerId: offerParam || undefined,
      available: availableParam
        ? availableParam === "true"
          ? true
          : false
        : undefined,
      priceRange: [
        priceMinParam ? Number(priceMinParam) : 0,
        priceMaxParam ? Number(priceMaxParam) : 1000,
      ],
      millilitersRange: [
        millilitersMinParam ? Number(millilitersMinParam) : 0,
        millilitersMaxParam ? Number(millilitersMaxParam) : 1000,
      ],
      salesRange: [
        salesMinParam ? Number(salesMinParam) : 0,
        salesMaxParam ? Number(salesMaxParam) : 1000,
      ],
    }));
  }, [searchParams]);

  async function handleChangeFilters(updatedFilters: Partial<PerfumesFilters>) {
    const newFilters = {
      ...filters,
      ...updatedFilters,
    };
    await setFilters((prev) => ({
      ...prev,
      ...updatedFilters,
    }));
    updateFiltersInUrl({
      ...convertPerfumesFiltersDTO(newFilters),
      page: 1,
    });
    if (setPagination)
      setPagination((oldPagination) => ({ ...oldPagination, page: 1 }));
  }

  function handleResetFilters() {
    setFilters({
      priceRange: [0, 1000],
      millilitersRange: [0, 1000],
      salesRange: [0, 1000],
      scentsIds: [],
    });
    updateFiltersInUrl({
      name: undefined,
      description: undefined,
      brandId: undefined,
      gender: undefined,
      scentsIds: undefined,
      milliliters: undefined,
      millilitersMin: undefined,
      millilitersMax: undefined,
      salesMin: undefined,
      salesMax: undefined,
      priceMin: undefined,
      priceMax: undefined,
      perfumeTypeId: undefined,
      available: undefined,
      price: undefined,
      cant: undefined,
      offerId: undefined,
      page: 1,
    });
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
    if (filters.priceRange[1] < 1000) count++;
    if (filters.millilitersRange[0] > 0) count++;
    if (filters.millilitersRange[1] < 1000) count++;
    if (filters.salesRange[0] > 0) count++;
    if (filters.salesRange[1] < 1000) count++;
    filters.scentsIds.forEach(() => {
      count++;
    });
    return count;
  };

  return {
    filters,
    handleChangeFilters,
    handleResetFilters,
    getActiveFiltersCount,
  };
}
