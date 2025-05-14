"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import PreviewImage from "@/components/preview-image/preview-image";
import { DataTable } from "@/components/ui/data-table";
import TableMenu from "@/components/ui/table-menu";
import { HomeBanner } from "@/types/home-banners";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, EyeIcon, Trash2Icon } from "lucide-react";
import React, { useCallback, useContext } from "react";

interface Props {
  homeBanners: HomeBanner[];
}

export default function HomeBannersList({ homeBanners }: Props) {
  const { handleOpenModal } = useContext(ModalContext);

  const handleEdit = useCallback(
    (id: string) => {
      handleOpenModal({
        name: modalTypes.editHomeBannerModal.name,
        entity: id,
      });
    },
    [handleOpenModal]
  );

  const handleViewDetails = useCallback(
    (id: string) => {
      handleOpenModal({
        name: modalTypes.detailsHomeBannerModal.name,
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

  const columns: ColumnDef<HomeBanner>[] = [
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
      accessorKey: "title",
      header: "Título",
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
        data={homeBanners}
        initialVisibilityState={{ id: false }}
      />
    </div>
  );
}
