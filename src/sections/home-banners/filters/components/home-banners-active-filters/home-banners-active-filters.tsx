import FilterBadge from "@/components/filters/filter-badge/filter-badge";
import { Label } from "@/components/ui/label";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RotateCcwIcon } from "lucide-react";
import { HomeBannersFilters } from "../../hooks/use-home-banners-filters";

interface Props {
  filters: HomeBannersFilters;
  handleChangeFilters: (filters: Partial<HomeBannersFilters>) => void;
  getActiveFiltersCount: () => number;
  handleResetFilters: () => void;
}

export default function HomeBannersActiveFilters({
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
            <Badge variant="default" className="ml-2">
              {getActiveFiltersCount()}
            </Badge>
          )}
          {getActiveFiltersCount() > 0 && (
            <Button
              variant="outline"
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
          {filters.description && (
            <FilterBadge
              filterName="Descripción"
              filterValue={filters.description}
              handleDeleteFilter={() => {
                handleChangeFilters({ description: undefined });
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
