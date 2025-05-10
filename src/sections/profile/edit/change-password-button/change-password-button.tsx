"use client"
import { ModalContext } from "@/src/components/modal/context/modalContext"
import { modalTypes } from "@/src/components/modal/types/modalTypes"
import { Button } from "@/src/components/ui/button"
import React, { useContext } from "react"

export default function ChangePasswordButton() {
	const { handleOpenModal } = useContext(ModalContext)
	return (
		<Button
			variant="link"
			type="button"
			className="text-sm text-gray-500 hover:text-blue-600"
			onClick={() => {
				handleOpenModal({ name: modalTypes.changePasswordModal.name })
			}}
		>
			¿Desea cambiar contraseña?
		</Button>
	)
}
