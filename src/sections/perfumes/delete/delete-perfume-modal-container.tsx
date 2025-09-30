"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useCallback, useContext } from "react";
import useDeletePerfume from "../hooks/use-delete-perfume";
import ConfirmationPanel from "@/components/confirmation-panel/confirmation-panel";
import { revalidateServerTags } from "@/lib/cache";
import { tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { toast } from "react-toastify";

export default function DeletePerfumeModalContainer() {
  const { getInfoModal, handleCloseModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.detelePerfumeModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const { deletePerfume, loading, error } = useDeletePerfume({
    id,
    onDeleteAction: () => {
      toast.success("Perfume eliminado con éxito");
      onCloseModal();
      revalidateServerTags(tagsCacheByRoutes.perfumes.multipleTag);
    },
  });
  const onCloseModal = useCallback(() => {
    handleCloseModal(modalTypes.detelePerfumeModal.name);
  }, [handleCloseModal]);
  return (
    <ConfirmationPanel
      title={modalTypes.detelePerfumeModal.title || "Elminación de Perfume"}
      message={modalTypes.detelePerfumeModal.message}
      warningMessage={modalTypes.detelePerfumeModal.warningMessage}
      error={error}
      onConfirm={deletePerfume}
      onCancel={onCloseModal}
      isLoading={loading}
      isDestructive
    />
  );
}
