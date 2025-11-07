"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import PreviewImage from "@/components/preview-image/preview-image";
import { DataTable } from "@/components/ui/data-table";
import TableMenu from "@/components/ui/table-menu";
import { Offer } from "@/types/offers";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, EyeIcon, Trash2Icon } from "lucide-react";
import React, { useCallback, useContext } from "react";
import OffersFiltersContainer from "../filters/offers-filters-container";
import OffersOrderContainer from "./order/offers-order-container";

interface Props {
  offers: Offer[];
}

export default function OffersList({ offers }: Props) {
  const { handleOpenModal } = useContext(ModalContext);

  const handleEdit = useCallback(
    (id: string) => {
      handleOpenModal({ name: modalTypes.editOfferModal.name, entity: id });
    },
    [handleOpenModal]
  );

  const handleViewDetails = useCallback(
    (id: string) => {
      handleOpenModal({ name: modalTypes.detailsOfferModal.name, entity: id });
    },
    [handleOpenModal]
  );

  const handleDelete = useCallback(
    (id: string) => {
      handleOpenModal({ name: modalTypes.deleteOfferModal.name, entity: id });
    },
    [handleOpenModal]
  );

  const columns: ColumnDef<Offer>[] = [
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
      accessorKey: "description",
      header: "Descripción",
      cell: ({ row }) => {
        return (
          <p className="text-sm line-clamp-3 break-words max-w-[300px] whitespace-pre-wrap leading-relaxed text-gray-700">
            {row.getValue("description")}
          </p>
        );
      },
    },
    {
      accessorKey: "scope",
      header: "Alcance",
    },
    {
      accessorKey: "offerType",
      header: "Tipo de Oferta",
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
      <OffersOrderContainer />
      <DataTable
        columns={columns}
        data={offers}
        initialVisibilityState={{ id: false }}
        filters={<OffersFiltersContainer />}
      />
    </div>
  );
}
