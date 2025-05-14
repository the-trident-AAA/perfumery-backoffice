"use client";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { Perfume } from "@/types/perfumes";
import { useCallback, useContext, useState } from "react";

interface Props {
  action: (perfumes: Perfume[]) => void;
}

export default function useSelectablePerfumes({ action }: Props) {
  const { handleCloseModal } = useContext(ModalContext);
  const [selectedPerfumes, setSelectedPerfumes] = useState<Perfume[]>([]);

  const toggleSelection = (perfume: Perfume) => {
    setSelectedPerfumes((prev) =>
      prev.find((prevPerfume) => prevPerfume.id === perfume.id)
        ? prev.filter((prevPerfume) => prevPerfume.id !== perfume.id)
        : [...prev, perfume]
    );
  };

  const handleAction = useCallback(() => {
    action(selectedPerfumes);
    handleCloseModal(modalTypes.selectablePerfumesModal.name);
  }, [action, selectedPerfumes]);
  return { selectedPerfumes, toggleSelection, handleAction };
}
