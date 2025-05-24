"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import TableMenu from "@/components/ui/table-menu";
import { User } from "@/types/users";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, EyeIcon, Trash2Icon } from "lucide-react";
import React, { useCallback, useContext } from "react";

interface Props {
  users: User[];
}

export default function UsersList({ users }: Props) {
  const { handleOpenModal } = useContext(ModalContext);

  const handleViewDetails = useCallback(
    (id: string) => {
      handleOpenModal({
        name: modalTypes.detailsPerfumeModal.name,
        entity: id,
      });
    },
    [handleOpenModal]
  );

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Usuario",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex justify-end">
            <Button
              className="flex items-center gap-2 px-3 py-1 rounded bg-primary text-white hover:bg-primary/80 transition"
              onClick={() => handleViewDetails(row.getValue("id"))}
            >
              <EyeIcon size={18} />
              Ver Detalles
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <DataTable
        columns={columns}
        data={users}
        initialVisibilityState={{ id: false }}
      />
    </div>
  );
}
