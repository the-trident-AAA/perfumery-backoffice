"use client";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { Perfume } from "@/types/perfumes";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

interface Props {
  perfumes: Perfume[];
}

export default function PerfumesList({ perfumes }: Props) {
  const columns: ColumnDef<Perfume>[] = [
    {
      accessorKey: "id",
      header: "Id",
    },
    {
      accessorKey: "name",
      header: "Nombre",
    },
    {
      accessorKey: "brand",
      header: "Marca",
    },
    {
      accessorKey: "gender",
      header: "Género",
    },
    {
      accessorKey: "liters",
      header: "Litros",
    },
    {
      accessorKey: "perfumeType",
      header: "Tipo de Perfume",
    },
    {
      accessorKey: "available",
      header: "Disponibilidad",
      cell: ({ row }) => (
        <Badge
          variant={`${row.getValue("available") ? "default" : "destructive"}`}
        >
          {row.getValue("available") ? "Disponible" : "No Disponible"}
        </Badge>
      ),
    },
    {
      accessorKey: "price",
      header: "Precio",
    },
    {
      accessorKey: "cant",
      header: "Cantidad",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <DataTable columns={columns} data={perfumes} />
    </div>
  );
}
