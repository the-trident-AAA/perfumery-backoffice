"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { DataTable } from "@/components/ui/data-table";
import TableMenu from "@/components/ui/table-menu";
import { Brand } from "@/types/brands";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash2Icon } from "lucide-react";
import React, { useCallback, useContext } from "react";
import BrandsFiltersContainer from "../filters/brands-filters-container";
import BrandsOrderContainer from "./order/perfumes-order-container";

interface Props {
  brands: Brand[];
}

export default function BrandList({ brands }: Props) {
  const { handleOpenModal } = useContext(ModalContext);

  const handleEdit = useCallback(
    (id: string) => {
      handleOpenModal({ name: modalTypes.editBrandModal.name, entity: id });
    },
    [handleOpenModal]
  );

  const handleDelete = useCallback(
    (id: string) => {
      handleOpenModal({
        name: modalTypes.deleteBrandModal.name,
        entity: id,
      });
    },
    [handleOpenModal]
  );

  const columns: ColumnDef<Brand>[] = [
    {
      accessorKey: "id",
      enableHiding: false,
    },
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
      <BrandsOrderContainer />
      <DataTable
        columns={columns}
        data={brands}
        initialVisibilityState={{ id: false }}
        filters={<BrandsFiltersContainer />}
      />
    </div>
  );
}
