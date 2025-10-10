"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useCallback, useContext } from "react";
import ConfirmationPanel from "@/components/confirmation-panel/confirmation-panel";
import { revalidateServerTags } from "@/lib/cache";
import { tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import useDeleteBrand from "../hooks/use-delete-brand";
import { toast } from "react-toastify";

export default function DeleteBrandModalContainer() {
  const { getInfoModal, handleCloseModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.deleteBrandModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const { deleteBrand, loading, error } = useDeleteBrand({
    id,
    onDeleteAction: () => {
      toast.success("Marca eliminada con éxito");
      onCloseModal();
      revalidateServerTags(tagsCacheByRoutes.brands.multipleTag);
    },
  });
  const onCloseModal = useCallback(() => {
    handleCloseModal(modalTypes.deleteBrandModal.name);
  }, [handleCloseModal]);
  return (
    <ConfirmationPanel
      title={modalTypes.deleteBrandModal.title || "Elminación de la Marca"}
      error={error}
      message={modalTypes.deleteBrandModal.message}
      warningMessage={modalTypes.deleteBrandModal.warningMessage}
      onConfirm={deleteBrand}
      onCancel={onCloseModal}
      isLoading={loading}
      isDestructive
    />
  );
}
