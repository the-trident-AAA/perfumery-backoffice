"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import TableMenu from "@/components/ui/table-menu";
import { Perfume } from "@/types/perfumes";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, EyeIcon, Trash2Icon } from "lucide-react";
import React, { useCallback, useContext } from "react";

interface Props {
  perfumes: Perfume[];
}

export default function PerfumesList({ perfumes }: Props) {
  const { handleOpenModal } = useContext(ModalContext);

  const handleEdit = useCallback(
    (id: string) => {
      handleOpenModal({ name: modalTypes.editPerfumeModal.name, entity: id });
    },
    [handleOpenModal]
  );

  const handleViewDetails = useCallback(
    (id: string) => {
      handleOpenModal({
        name: modalTypes.detailsPerfumeModal.name,
        entity: id,
      });
    },
    [handleOpenModal]
  );

  const handleDelete = useCallback(
    (id: string) => {
      handleOpenModal({
        name: modalTypes.detelePerfumeModal.name,
        entity: id,
      });
    },
    [handleOpenModal]
  );

  const columns: ColumnDef<Perfume>[] = [
    {
      accessorKey: "id",
      enableHiding: false,
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
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex justify-end">
            <TableMenu
              titleTableMenu="Acciones"
              actions={[
                {
                  label: "Ver Detalles",
                  icon: <EyeIcon />,
                  action: () => {
                    handleViewDetails(row.getValue("id"));
                  },
                },
                {
                  label: "Editar",
                  icon: <EditIcon />,
                  action: () => {
                    handleEdit(row.getValue("id"));
                  },
                },
                {
                  label: "Eliminar",
                  icon: <Trash2Icon />,
                  action: () => {
                    handleDelete(row.getValue("id"));
                  },
                },
              ]}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <DataTable
        columns={columns}
        data={perfumes}
        initialVisibilityState={{ id: false }}
      />
    </div>
  );
}
