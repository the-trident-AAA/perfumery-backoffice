import FilterBadge from "@/components/filters/filter-badge/filter-badge";
import { Label } from "@/components/ui/label";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RotateCcwIcon } from "lucide-react";
import { TapesFilters } from "../../hooks/use-tapes-filters";

interface Props {
  filters: TapesFilters;
  handleChangeFilters: (filters: Partial<TapesFilters>) => void;
  getActiveFiltersCount: () => number;
  handleResetFilters: () => void;
}

export default function TapesActiveFilters({
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
          {filters.title && (
            <FilterBadge
              filterName="Título"
              filterValue={filters.title}
              handleDeleteFilter={() => {
                handleChangeFilters({ title: undefined });
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
