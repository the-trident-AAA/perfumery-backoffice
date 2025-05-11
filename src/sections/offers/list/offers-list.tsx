"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { DataTable } from "@/components/ui/data-table";
import TableMenu from "@/components/ui/table-menu";
import { Offer } from "@/types/offers";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash2Icon } from "lucide-react";
import React, { useCallback, useContext } from "react";

interface Props {
  offers: Offer[];
}

export default function OffersList({ offers }: Props) {
  const { handleOpenModal } = useContext(ModalContext);

  const handleEdit = useCallback(
    (id: string) => {
      handleOpenModal({ name: modalTypes.editPerfumeModal.name, entity: id });
    },
    [handleOpenModal]
  );

  const columns: ColumnDef<Offer>[] = [
    {
      accessorKey: "name",
      header: "Nombre",
    },
    {
      accessorKey: "scope",
      header: "Alcance",
    },
    {
      accessorKey: "offerType",
      header: "Oferta",
    },
    {
      accessorKey: "discount",
      header: "Descuento",
      cell: ({ row }) => {
        return Number(row.getValue("discount")) * 100 + " %";
      },
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
                    console.log("Eliminar oferta");
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
      <DataTable columns={columns} data={offers} />
    </div>
  );
}
