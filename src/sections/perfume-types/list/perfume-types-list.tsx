"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { DataTable } from "@/components/ui/data-table";
import TableMenu from "@/components/ui/table-menu";
import { PerfumeType } from "@/types/perfume-types";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash2Icon } from "lucide-react";
import React, { useCallback, useContext } from "react";

interface Props {
  perfumeTypes: PerfumeType[];
}

export default function PerfumeTypesList({ perfumeTypes }: Props) {
  const { handleOpenModal } = useContext(ModalContext);

  const handleEdit = useCallback(
    (id: string) => {
      handleOpenModal({ name: modalTypes.editPerfumeTypeModal.name, entity: id });
    },
    [handleOpenModal]
  );

   const handleDelete = useCallback(
      (id: string) => {
        handleOpenModal({
          name: modalTypes.deletePerfumeTypeModal.name,
          entity: id,
        });
      },
      [handleOpenModal]
    );

  const columns: ColumnDef<PerfumeType>[] = [
    {
      accessorKey: "id",
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Tipo de Perfume",
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
      <DataTable columns={columns} data={perfumeTypes} initialVisibilityState={{id: false}}/>
    </div>
  );
}
