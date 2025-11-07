"use client";
import SorterComponent from "@/components/sorter-component/sorter-component";
import useUrlFilters from "@/hooks/use-url-filters";

import React from "react";

export default function ScentsOrderContainer() {
  const { updateFiltersInUrl } = useUrlFilters();
  return (
    <SorterComponent
      sortOptions={[
        {
          key: "name",
          label: "Nombre",
          type: "string",
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
