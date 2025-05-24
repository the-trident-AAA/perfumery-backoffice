"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { DataTable } from "@/components/ui/data-table";
import TableMenu from "@/components/ui/table-menu";
import { User } from "@/types/users";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash2Icon } from "lucide-react";
import React, { useCallback, useContext } from "react";

interface Props {
  users: User[];
}

export default function UsersList({ users }: Props) {
  const { handleOpenModal } = useContext(ModalContext);


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
        data={users}
        initialVisibilityState={{ id: false }}
      />
    </div>
  );
}
