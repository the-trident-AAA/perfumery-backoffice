"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import PreviewImage from "@/components/preview-image/preview-image";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import TableMenu from "@/components/ui/table-menu";
import { Perfume } from "@/types/perfumes";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, EyeIcon, Trash2Icon } from "lucide-react";
import React, { useCallback, useContext } from "react";
import PerfumesFiltersContainer from "../filters/perfumes-filters-container";
import { PaginationMeta } from "@/types/pagination";
import useServerPagination from "@/hooks/use-server-pagination";
import { fCurrency } from "@/lib/format-number";

interface Props {
  perfumes: Perfume[];
  apiPagination: PaginationMeta;
}

export default function PerfumesList({ perfumes, apiPagination }: Props) {
  const { handleOpenModal } = useContext(ModalContext);
  const { pagination, serverHandleChangePage, serverHandlePageSizeChange } =
    useServerPagination({
      defaultPagination: {
        limit: apiPagination.limit,
        page: apiPagination.page,
      },
    });

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
      accessorKey: "image",
      header: "Imagen",
      cell: ({ row }) => (
        <PreviewImage
          preview={row.getValue("image") || "/images/place-holder.jpg"}
          height={80}
          width={80}
        />
      ),
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
      accessorKey: "milliliters",
      header: "Mililitros",
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
          variant={`${row.getValue("available") ? "secondary" : "destructive"}`}
        >
          {row.getValue("available") ? "Disponible" : "No Disponible"}
        </Badge>
      ),
    },
    {
      accessorKey: "totalPrice",
      header: "Precio",
      cell: ({ row }) => (
        <p>{fCurrency(row.getValue("totalPrice") as number)}</p>
      ),
    },
    {
      accessorKey: "sales",
      header: "Ventas",
      cell: ({ row }) => <p>{row.getValue("sales") as number}</p>,
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
        filters={<PerfumesFiltersContainer />}
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
