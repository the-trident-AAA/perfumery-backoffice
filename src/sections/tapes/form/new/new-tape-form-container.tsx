"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { revalidateServerTags } from "@/lib/cache";
import { tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { toast } from "react-toastify";
import FormActionButtons from "@/components/form/components/form-action-buttons/form-action-buttons";
import { AlertDestructive } from "@/components/ui/alert-destructive";
import { TapeCreate, tapeCreateSchema } from "./schemas/tape-create-schema";
import useCreateTape from "../../hooks/use-create-tape";
import TapeForm from "../tapes-form";

export default function NewTapeFormContainer() {
  const { handleCloseModal } = useContext(ModalContext);
  const {
    loading: submitLoading,
    createTape,
    error: createTapeError,
  } = useCreateTape({
    onCreateAction: () => {
      toast.success("Cinta creada con éxito");
      handleClose();
      revalidateServerTags(tagsCacheByRoutes.tapes.multipleTag);
    },
  });
  const form = useForm<TapeCreate>({
    resolver: zodResolver(tapeCreateSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleClose = () => {
    handleCloseModal(modalTypes.newTapeModal.name);
  };

  function onSubmit(tape: TapeCreate) {
    createTape(tape);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        {createTapeError && <AlertDestructive title={createTapeError} />}
        <TapeForm />
        <FormActionButtons
          submitLoading={submitLoading}
          submitButtonText="Crear Cinta"
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
