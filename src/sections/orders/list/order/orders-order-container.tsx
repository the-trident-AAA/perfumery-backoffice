"use client";
import SorterComponent from "@/components/sorter-component/sorter-component";
import useUrlFilters from "@/hooks/use-url-filters";

import React from "react";

export default function OrdersOrderContainer() {
  const { updateFiltersInUrl } = useUrlFilters();
  return (
    <SorterComponent
      sortOptions={[
        {
          key: "lastUpdateDate",
          label: "Fecha de actualización",
          type: "date",
        },
      ]}
      defaultSort="lastUpdateDate"
      onSortChange={(sortKey: string, direction: "asc" | "desc") => {
        updateFiltersInUrl({
          orderBy: sortKey,
          order: direction.toLocaleUpperCase(),
        });
      }}
    />
  );
}
