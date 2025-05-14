"use client";
import EmptyContent from "@/components/empty-content/empty-content";
import { ModalContext } from "@/components/modal/context/modalContext";
import { Button } from "@/components/ui/button";
import React, { useCallback, useContext } from "react";
import { useFormContext } from "react-hook-form";
import DeselectionMask from "./components/deselection-mask-card/deselection-mask-card";

interface Props<T> {
  name: string;
  modalPath: string;
  label?: string;
  emptyText?: string;
  selectElementsText?: string;
  CardComponent: React.ComponentType<{ data: T }>;
}

export default function RHFSelectableCardListField<T extends { id: string }>({
  name,
  label = "Elementos seleccionados",
  emptyText = "No hay elementos seleccionados",
  selectElementsText = "Seleccione más elementos",
  modalPath,
  CardComponent,
}: Props<T>) {
  const { watch, setValue, trigger } = useFormContext();
  const { handleOpenModal, handleCloseModal } = useContext(ModalContext);
  const selectedValues = watch(name) as T[];

  const handleSelect = useCallback(
    (values: T[]) => {
      const newValues = [...selectedValues, ...values];
      setValue(name, newValues);
      trigger(name);
    },
    [handleCloseModal, setValue, trigger, name, selectedValues]
  );

  const onSelectModalOpen = useCallback(() => {
    handleOpenModal({
      name: modalPath,
      elements: selectedValues,
      actionInsert: handleSelect,
    });
  }, [handleOpenModal, modalPath, selectedValues]);

  const handleRemove = useCallback(
    (id: string) => {
      setValue(
        name,
        selectedValues.filter((item) => item.id !== id)
      );
      trigger(name);
    },
    [selectedValues, setValue, name, trigger]
  );

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex justify-between gap-2">
        <h3 className="font-medium text-lg mb-3">{label}</h3>
        <Button type="button" onClick={onSelectModalOpen}>
          {selectElementsText}
        </Button>
      </div>
      {selectedValues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[42vh] p-2 overflow-auto">
          {selectedValues.map((selectedValue, index) => (
            <DeselectionMask
              key={index}
              handleRemove={() => {
                handleRemove(selectedValue.id);
              }}
            >
              <CardComponent data={selectedValue} />
            </DeselectionMask>
          ))}
        </div>
      ) : (
        <EmptyContent title={emptyText} />
      )}
    </div>
  );
}
