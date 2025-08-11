"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { DataTable } from "@/components/ui/data-table";
import TableMenu from "@/components/ui/table-menu";
import { Order } from "@/types/orders";
import { User } from "@/types/users";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon } from "lucide-react";
import React, { useCallback, useContext } from "react";
import OrdersFiltersContainer from "../filters/orders-filters-container";

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
      accessorKey: "user",
      header: "e-mail",
      cell: ({row}) => {
        const user = row.getValue("user") as User;
        return <p>{user.email}</p>;
      }
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
        filters={<OrdersFiltersContainer />}
      />
    </div>
  );
}
