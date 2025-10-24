"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";

export interface SortOption {
  key: string;
  label: string;
  type: "string" | "number" | "date";
}

interface Props {
  sortOptions: SortOption[];
  onSortChange: (sortKey: string, direction: "asc" | "desc") => void;
  defaultSort?: string;
  defaultSortValue?: "asc" | "desc";
  className?: string;
}

export default function SorterComponent({
  sortOptions = [],
  onSortChange,
  defaultSort,
  defaultSortValue = "asc",
  className = "",
}: Props) {
  // Add safety check for empty sortOptions
  const initialSort =
    defaultSort || (sortOptions.length > 0 ? sortOptions[0].key : "");
  const [currentSort, setCurrentSort] = useState(initialSort);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
    defaultSortValue
  );

  // Add early return if no sort options
  if (!sortOptions || sortOptions.length === 0) {
    return (
      <div className={`p-4 bg-gray-50 rounded-lg border ${className}`}>
        <span className="text-sm text-gray-500">
          No hay opciones de ordenamiento disponibles
        </span>
      </div>
    );
  }

  const handleSortClick = (sortKey: string) => {
    let newDirection: "asc" | "desc" = "asc";

    if (currentSort === sortKey) {
      // Si es el mismo criterio, invertir la dirección
      newDirection = sortDirection === "asc" ? "desc" : "asc";
    } else {
      // Si es un criterio diferente, empezar con ascendente
      newDirection = "asc";
    }

    setCurrentSort(sortKey);
    setSortDirection(newDirection);
    onSortChange(sortKey, newDirection);
  };

  const getSortIcon = (sortKey: string) => {
    if (currentSort !== sortKey) {
      return <ChevronUp className="w-4 h-4 opacity-30" />;
    }

    return sortDirection === "asc" ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  const getSortLabel = (option: SortOption) => {
    if (currentSort === option.key) {
      const directionText = sortDirection === "asc" ? "A-Z" : "Z-A";
      if (option.type === "number") {
        return `${option.label} (${
          sortDirection === "asc" ? "Menor-Mayor" : "Mayor-Menor"
        })`;
      }
      if (option.type === "date") {
        return `${option.label} (${
          sortDirection === "asc" ? "Más antiguo" : "Más reciente"
        })`;
      }
      return `${option.label} (${directionText})`;
    }
    return option.label;
  };

  return (
    <div
      className={`flex flex-wrap gap-2 p-4 bg-primary rounded-lg ${className}`}
    >
      <span className="text-base font-semibold text-secondary flex items-center">
        Ordenar por:
      </span>
      {sortOptions.map((option) => (
        <Button
          key={option.key}
          variant={currentSort === option.key ? "secondary" : "outline"}
          size={"sm"}
          onClick={() => handleSortClick(option.key)}
          className={`flex items-center ${
            currentSort === option.key && "text-primary"
          } gap-1`}
        >
          <p className="text-sm sm:text-base">{getSortLabel(option)}</p>
          {getSortIcon(option.key)}
        </Button>
      ))}
    </div>
  );
}
