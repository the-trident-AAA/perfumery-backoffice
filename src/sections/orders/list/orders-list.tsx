"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { DataTable } from "@/components/ui/data-table";
import TableMenu from "@/components/ui/table-menu";
import { Order, OrderStatus, orderStatusMap } from "@/types/orders";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, EyeIcon } from "lucide-react";
import React, { useCallback, useContext } from "react";
import OrdersFiltersContainer from "../filters/orders-filters-container";
import { fCurrency } from "@/lib/format-number";
import { Badge } from "@/components/ui/badge";
import useServerPagination from "@/hooks/use-server-pagination";
import { PaginationMeta } from "@/types/pagination";
import { formatDate } from "@/lib/format-date";
import OrdersOrderContainer from "./order/orders-order-container";

interface Props {
  orders: Order[];
  apiPagination: PaginationMeta;
}

export default function OrdersList({ orders, apiPagination }: Props) {
  const { handleOpenModal } = useContext(ModalContext);
  const { pagination, serverHandleChangePage, serverHandlePageSizeChange } =
    useServerPagination({
      defaultPagination: {
        limit: apiPagination.limit,
        page: apiPagination.page,
      },
    });

  const handleViewDetails = useCallback(
    (id: string) => {
      handleOpenModal({
        name: modalTypes.detailsOrderModal.name,
        entity: id,
      });
    },
    [handleOpenModal]
  );

  const handleEdit = useCallback(
    (id: string) => {
      handleOpenModal({
        name: modalTypes.editOrderModal.name,
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
      cell: ({ row }) => {
        const state = row.getValue("state") as OrderStatus;
        return (
          <Badge
            variant={
              orderStatusMap.get(state)?.color as "default" | "secondary"
            }
          >
            {orderStatusMap.get(state)?.name as string}
          </Badge>
        );
      },
    },
    {
      id: "code", // <- id único
      header: "Código",
      accessorFn: (row) => row.code,
      cell: ({ row }) => {
        const code = row.original.code;
        return <p>{code}</p>;
      },
    },
    {
      id: "username", // <- id único
      header: "Usuario",
      accessorFn: (row) => row.user?.username, // <- extraes username
      cell: ({ row }) => {
        const user = row.original.user;
        return <p>{user.username}</p>;
      },
    },
    {
      id: "email", // <- id único
      header: "E-mail",
      accessorFn: (row) => row.user?.email, // <- extraes email
      cell: ({ row }) => {
        const user = row.original.user;
        return <p className="truncate max-w-[150px]">{user.email}</p>;
      },
    },
    {
      id: "creationDate", // <- id único
      header: "Fecha de creación",
      accessorFn: (row) => row.creationDate,
      cell: ({ row }) => {
        const creationDate = row.original.creationDate;
        return <p>{formatDate(creationDate, "yymmdd")}</p>;
      },
    },
    {
      id: "lastUpdateDate", // <- id único
      header: "Fecha de Actualización",
      accessorFn: (row) => row.lastUpdateDate,
      cell: ({ row }) => {
        const lastUpdateDate = row.original.lastUpdateDate;
        return <p>{formatDate(lastUpdateDate, "yymmdd")}</p>;
      },
    },
    {
      accessorKey: "totalMount",
      header: "Monto a pagar",
      cell: ({ row }) => (
        <p>{fCurrency(row.getValue("totalMount") as number)}</p>
      ),
    },
    {
      accessorKey: "totalItems",
      header: "Productos",
      cell: ({ row }) => {
        const totalItems = row.getValue("totalItems") as number;
        return (
          <p className="flex items-center gap-2">
            {totalItems + " " + (totalItems > 1 ? "productos" : "producto")}
          </p>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex justify-end">
          <TableMenu
            titleTableMenu="Acciones"
            actions={[
              {
                label: "Ver Detalles",
                icon: <EyeIcon />,
                action: () => handleViewDetails(row.getValue("id")),
              },
              {
                label: "Editar",
                icon: <Edit />,
                action: () => handleEdit(row.getValue("id")),
              },
            ]}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <OrdersOrderContainer />
      <DataTable
        columns={columns}
        data={orders}
        initialVisibilityState={{ id: false }}
        filters={<OrdersFiltersContainer />}
        serverPagination={{
          currentPage: pagination.page as number,
          itemsPerPage: pagination.limit as number,
          onPageChange: serverHandleChangePage,
          onItemsPerPageChange: (pageSize: string) => {
            serverHandlePageSizeChange(Number(pageSize));
          },
          totalItems: apiPagination.total,
          totalPages: Math.ceil(apiPagination.total / apiPagination.limit),
        }}
      />
    </div>
  );
}
