import FilterBadge from "@/components/filters/filter-badge/filter-badge";
import { Label } from "@/components/ui/label";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RotateCcwIcon } from "lucide-react";
import { OrdersFilters } from "../../hooks/use-orders-filters";
import { formatDate } from "@/lib/format-date";

interface Props {
  filters: OrdersFilters;
  handleChangeFilters: (filters: Partial<OrdersFilters>) => void;
  getActiveFiltersCount: () => number;
  handleResetFilters: () => void;
}

export default function OrdersActiveFilters({
  filters,
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
          {filters.state && (
            <FilterBadge
              filterName="Estado"
              filterValue={filters.state}
              handleDeleteFilter={() => {
                handleChangeFilters({ state: undefined });
              }}
            />
          )}
          {filters.lastUpdateDateMin && (
            <FilterBadge
              filterName="Fecha de actualización mínima"
              filterValue={formatDate(filters.lastUpdateDateMin.toISOString())}
              handleDeleteFilter={() => {
                handleChangeFilters({ lastUpdateDateMin: undefined });
              }}
            />
          )}
          {filters.lastUpdateDateMax && (
            <FilterBadge
              filterName="Fecha de actualización máxima"
              filterValue={formatDate(filters.lastUpdateDateMax.toISOString())}
              handleDeleteFilter={() => {
                handleChangeFilters({ lastUpdateDateMax: undefined });
              }}
            />
          )}
          {filters.userId && (
            <FilterBadge
              filterName="Usuario"
              filterValue={filters.userId}
              handleDeleteFilter={() => {
                handleChangeFilters({ userId: undefined });
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
