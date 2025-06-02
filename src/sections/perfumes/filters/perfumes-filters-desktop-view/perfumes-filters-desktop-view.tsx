"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Filter, RotateCcw } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PerfumesFilters } from "../hooks/use-perfumes-filters";
import FilterBadge from "@/components/filters/filter-badge/filter-badge";

interface Props {
  filters: PerfumesFilters;
  children: ReactNode;
  handleChangeFilters: (filters: Partial<PerfumesFilters>) => void;
  handleResetFilters: () => void;
}

export default function PerfumesFiltersDesktopView({
  filters,
  children,
  handleChangeFilters,
  handleResetFilters,
}: Props) {
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
    if (filters.millilitersRange[0] > 0) count++;
    return count;
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            <CardTitle className="text-lg">Filtros de Perfumes</CardTitle>
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary" className="ml-2">
                {getActiveFiltersCount()}
              </Badge>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetFilters}
            className="h-8"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Limpiar
          </Button>
        </div>
      </CardHeader>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="filters" className="border-none">
          <AccordionTrigger className="flex p-4 justify-end"></AccordionTrigger>
          <AccordionContent className="px-6 pb-6">{children}</AccordionContent>
        </AccordionItem>
      </Accordion>
      {/* Filtros activos */}
      {getActiveFiltersCount() > 0 && (
        <div className="p-4">
          <Separator />
          <div className="space-y-2 mt-5">
            <Label>Filtros Activos</Label>
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
                  filterValue={filters.brandId}
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
                  filterValue={filters.perfumeTypeId}
                  handleDeleteFilter={() => {
                    handleChangeFilters({ perfumeTypeId: undefined });
                  }}
                />
              )}
              {filters.scentsIds.length > 0 && (
                <FilterBadge
                  filterName="Esencias"
                  filterValue={filters.scentsIds.length.toString()}
                  handleDeleteFilter={() => {
                    handleChangeFilters({ scentsIds: [] });
                  }}
                />
              )}
              {filters.offerId && (
                <FilterBadge
                  filterName="Oferta"
                  filterValue={filters.offerId}
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
      )}
    </Card>
  );
}
