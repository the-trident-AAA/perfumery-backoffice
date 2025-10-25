"use client";
import SorterComponent from "@/components/sorter-component/sorter-component";
import useUrlFilters from "@/hooks/use-url-filters";

import React from "react";

export default function PerfumesOrderContainer() {
  const { updateFiltersInUrl } = useUrlFilters();
  return (
    <SorterComponent
      sortOptions={[
        {
          key: "name",
          label: "Nombre",
          type: "string",
        },
        {
          key: "price",
          label: "Precio Base",
          type: "number",
        },
        {
          key: "totalPrice",
          label: "Precio con Descuento",
          type: "number",
        },
      ]}
      defaultSort="totalPrice"
      onSortChange={(sortKey: string, direction: "asc" | "desc") => {
        updateFiltersInUrl({
          orderBy: sortKey,
          order: direction.toLocaleUpperCase(),
        });
      }}
    />
  );
}
