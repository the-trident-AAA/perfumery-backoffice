"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import TableMenu from "@/components/ui/table-menu";
import { Brand } from "@/types/brands";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, EyeIcon, Trash2Icon } from "lucide-react";
import React, { useCallback, useContext } from "react";

interface Props {
  brands: Brand[];
}

export default function BrandList({ brands }: Props) {
  const { handleOpenModal } = useContext(ModalContext);

  const handleEdit = useCallback(
    (id: string) => {
      handleOpenModal({ name: modalTypes.editPerfumeModal.name, entity: id });
    },
    [handleOpenModal]
  );

  const columns: ColumnDef<Brand>[] = [
    {
      accessorKey: "name",
      header: "Marca",
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
                    console.log("Eliminar perfume");
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
      <DataTable columns={columns} data={brands} />
    </div>
  );
}
