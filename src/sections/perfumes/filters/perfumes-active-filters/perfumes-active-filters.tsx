import FilterBadge from "@/components/filters/filter-badge/filter-badge";
import { Label } from "@/components/ui/label";
import React from "react";
import { PerfumesFilters } from "../hooks/use-perfumes-filters";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RotateCcwIcon } from "lucide-react";
import { Brand } from "@/types/brands";
import { PerfumeType } from "@/types/perfume-types";
import { Scent } from "@/types/scents";
import { Offer } from "@/types/offers";

interface Props {
  filters: PerfumesFilters;
  brands: Brand[];
  perfumeTypes: PerfumeType[];
  offers: Offer[];
  scents: Scent[];
  handleChangeFilters: (filters: Partial<PerfumesFilters>) => void;
  getActiveFiltersCount: () => number;
  handleResetFilters: () => void;
}

export default function PerfumesActiveFilters({
  filters,
  brands,
  perfumeTypes,
  offers,
  scents,
  handleChangeFilters,
  getActiveFiltersCount,
  handleResetFilters,
}: Props) {
  return (
    <div>
      <div className="space-y-4">
        <div className="flex gap-2 items-center">
          <Label>Filtros Activos</Label>
          {getActiveFiltersCount() > 0 && (
            <Badge variant="secondary" className="ml-2">
              {getActiveFiltersCount()}
            </Badge>
          )}
          {getActiveFiltersCount() > 0 && (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleResetFilters}
              className="h-8"
            >
              <RotateCcwIcon className="h-4 w-4 mr-1" />
              Limpiar
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.name && (
            <FilterBadge
              filterName="Nombre"
              filterValue={filters.name}
              handleDeleteFilter={() => {
                handleChangeFilters({ name: undefined });
              }}
            />
          )}
          {filters.brandId && (
            <FilterBadge
              filterName="Marca"
              filterValue={
                brands.find((brand) => brand.id === filters.brandId)
                  ?.name as string
              }
              handleDeleteFilter={() => {
                handleChangeFilters({ brandId: undefined });
              }}
            />
          )}
          {filters.gender && (
            <FilterBadge
              filterName="Género"
              filterValue={filters.gender}
              handleDeleteFilter={() => {
                handleChangeFilters({ gender: undefined });
              }}
            />
          )}
          {filters.available && (
            <FilterBadge
              filterName="Disponible"
              filterValue={filters.available ? "Activos" : "No Activos"}
              handleDeleteFilter={() => {
                handleChangeFilters({ available: undefined });
              }}
            />
          )}
          {filters.perfumeTypeId && (
            <FilterBadge
              filterName="Tipo De Perfume"
              filterValue={
                perfumeTypes.find(
                  (perfumeType) => perfumeType.id === filters.perfumeTypeId
                )?.name as string
              }
              handleDeleteFilter={() => {
                handleChangeFilters({ perfumeTypeId: undefined });
              }}
            />
          )}
          {filters.scentsIds.length > 0 &&
            filters.scentsIds.map((scentId) => (
              <FilterBadge
                key={scentId}
                filterName="Escencia"
                filterValue={
                  scents.find((scent) => scent.id === scentId)?.name as string
                }
                handleDeleteFilter={() => {
                  handleChangeFilters({
                    scentsIds: filters.scentsIds.filter(
                      (filterScentId) => scentId !== filterScentId
                    ),
                  });
                }}
              />
            ))}
          {filters.offerId && (
            <FilterBadge
              filterName="Oferta"
              filterValue={
                offers.find((offer) => offer.id === filters.offerId)
                  ?.name as string
              }
              handleDeleteFilter={() => {
                handleChangeFilters({ offerId: undefined });
              }}
            />
          )}
          {filters.priceRange[0] > 0 && (
            <FilterBadge
              filterName="Oferta"
              filterValue={filters.priceRange[0].toString()}
              handleDeleteFilter={() => {
                handleChangeFilters({ priceRange: [0, 1000] });
              }}
            />
          )}
          {filters.millilitersRange[0] > 0 && (
            <FilterBadge
              filterName="Oferta"
              filterValue={filters.millilitersRange[0].toString()}
              handleDeleteFilter={() => {
                handleChangeFilters({ millilitersRange: [0, 100] });
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
