"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { DataTable } from "@/components/ui/data-table";
import TableMenu from "@/components/ui/table-menu";
import { Order } from "@/types/orders";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon } from "lucide-react";
import React, { useCallback, useContext } from "react";

interface Props {
  orders: Order[];
}

export default function OrdersList({ orders }: Props) {
  const { handleOpenModal } = useContext(ModalContext);

  const handleViewDetails = useCallback(
    (id: string) => {
      handleOpenModal({
        name: modalTypes.detailsOrderModal.name,
        entity: id,
      });
    },
    [handleOpenModal]
  );

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "id",
      enableHiding: false,
    },
    {
      accessorKey: "state",
      header: "Estado",
    },
    {
      accessorKey: "userId",
      header: "Usuario",
    },
        {
      accessorKey: "perfumes",
      header: "Perfumes",
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
        data={orders}
        initialVisibilityState={{ id: false }}
      />
    </div>
  );
}
