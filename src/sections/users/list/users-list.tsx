"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { DataTable } from "@/components/ui/data-table";
import TableMenu from "@/components/ui/table-menu";
import { User } from "@/types/users";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon } from "lucide-react";
import React, { useCallback, useContext } from "react";

interface Props {
  users: User[];
}

export default function UserList({ users }: Props) {
  const { handleOpenModal } = useContext(ModalContext);

  const handleViewDetails = useCallback(
    (id: string) => {
      handleOpenModal({
        name: modalTypes.detailsUserModal.name,
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
      accessorKey: "username",
      header: "Usuario",
    },
    {
      accessorKey: "avatar",
      header: "Avatar",
    },
    {
      accessorKey: "email",
      header: "E-Mail",
    },
    {
      accessorKey: "role",
      header: "Rol",
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
