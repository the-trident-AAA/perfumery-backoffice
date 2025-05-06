"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  PerfumeCreate,
  perfumeCreateSchema,
} from "./schemas/perfume-create-schema";
import { Button } from "@/components/ui/button";
import { PerfumeForm } from "../perfume-form";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";

export default function NewPerfumeFormContainer() {
  const { handleCloseModal } = useContext(ModalContext);
  const form = useForm<PerfumeCreate>({
    resolver: zodResolver(perfumeCreateSchema),
    defaultValues: {
      name: "",
      available: false,
      brandId: "",
      cant: 1,
      gender: "",
      liters: 1,
      offerId: "",
      perfumeTypeId: "",
      price: 1,
      scentsId: [],
    },
  });

  const handleClose = () => {
    handleCloseModal(modalTypes.newPerfumeModal.name);
  };

  function onSubmit(values: PerfumeCreate) {
    console.log(values);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        <PerfumeForm />
        <div className="flex gap-2 justify-end">
          <Button type="button" variant={"destructive"} onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant={"default"} type="submit">
            Crear Perfume
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
