"use client";

import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { Button } from "@/components/ui/button";
import React, { useContext } from "react";

export default function ChangePasswordButton() {
  const { handleOpenModal } = useContext(ModalContext);
  return (
    <Button
      variant="link"
      type="button"
      className="text-sm text-gray-500 hover:text-blue-600"
      onClick={() => {
        handleOpenModal({ name: modalTypes.changePasswordModal.name });
      }}
    >
      ¿Desea cambiar contraseña?
    </Button>
  );
}
