"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import React, { useCallback, useContext } from "react";
import ConfirmationPanel from "@/components/confirmation-panel/confirmation-panel";
import { revalidateServerTags } from "@/lib/cache";
import { tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { toast } from "react-toastify";
import useMakeAsHiddenPerfume from "../hooks/use-make-as-hidden-perfume";

export default function MakeAssHiddenPerfumeModalContainer() {
  const { getInfoModal, handleCloseModal } = useContext(ModalContext);
  const infoModal = getInfoModal(modalTypes.makeAsHiddenPerfumeModal.name);
  const id = infoModal && infoModal.entity ? infoModal.entity : null;
  const { makeAsHiddenPerfume, loading, error } = useMakeAsHiddenPerfume({
    id,
    onHiddenAction: () => {
      toast.success("Perfume ocultado con éxito");
      onCloseModal();
      revalidateServerTags(tagsCacheByRoutes.perfumes.multipleTag);
    },
  });
  const onCloseModal = useCallback(() => {
    handleCloseModal(modalTypes.makeAsHiddenPerfumeModal.name);
  }, [handleCloseModal]);
  return (
    <ConfirmationPanel
      title={modalTypes.makeAsHiddenPerfumeModal.title || "Ocultar Perfume"}
      message={modalTypes.makeAsHiddenPerfumeModal.message}
      warningMessage={modalTypes.makeAsHiddenPerfumeModal.warningMessage}
      error={error}
      onConfirm={makeAsHiddenPerfume}
      onCancel={onCloseModal}
      isLoading={loading}
      isDestructive
    />
  );
}
