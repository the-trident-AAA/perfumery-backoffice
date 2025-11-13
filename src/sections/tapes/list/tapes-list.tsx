"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { DataTable } from "@/components/ui/data-table";
import TableMenu from "@/components/ui/table-menu";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, EyeIcon, Trash2Icon } from "lucide-react";
import React, { useCallback, useContext } from "react";
import { Badge } from "@/components/ui/badge";
import TapesFiltersContainer from "../filters/tapes-filters-container";
import { Tape } from "@/types/tapes";
import MarkedAsMainButton from "../components/marked-as-main-button/marked-as-main-button";

interface Props {
  tapes: Tape[];
}

export default function TapeList({ tapes }: Props) {
  const { handleOpenModal } = useContext(ModalContext);

  const handleEdit = useCallback(
    (id: string) => {
      handleOpenModal({
        name: modalTypes.editTapeModal.name,
        entity: id,
      });
    },
    [handleOpenModal]
  );

  const handleViewDetails = useCallback(
    (id: string) => {
      handleOpenModal({
        name: modalTypes.detailsTapeModal.name,
        entity: id,
      });
    },
    [handleOpenModal]
  );

  const handleDelete = useCallback(
    (id: string) => {
      handleOpenModal({
        name: modalTypes.deleteTapeModal.name,
        entity: id,
      });
    },
    [handleOpenModal]
  );

  const columns: ColumnDef<Tape>[] = [
    {
      accessorKey: "id",
      enableHiding: false,
    },
    {
      accessorKey: "isMain",
      header: "Estado",
      cell: ({ row }) => {
        const isMain = row.getValue("isMain") as boolean;
        const tapeId = row.getValue("id") as string;
        return (
          <div>
            {isMain ? (
              <Badge className="h-7 text-sm" variant={"secondary"}>
                Cinta Principal
              </Badge>
            ) : (
              <MarkedAsMainButton tapeId={tapeId} />
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Nombre",
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
        data={tapes}
        initialVisibilityState={{ id: false }}
        filters={<TapesFiltersContainer />}
      />
    </div>
  );
}
