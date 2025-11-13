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
import { TapeDetails } from "@/types/tapes";
import { TapeEdit, TapeEditSchema } from "./schemas/tape-edit-schema";
import useEditTape from "../../hooks/use-edit-tape";
import useImageForm from "@/components/form/hooks/use-image-form";
import TapeForm from "../tapes-form";

interface Props {
  tape: TapeDetails;
}

export default function EditTapeFormContainer({ tape }: Props) {
  const { handleCloseModal } = useContext(ModalContext);
  const {
    loading: submitLoading,
    editTape,
    error: editTapeError,
  } = useEditTape({
    id: tape.id,
    onEditAction: () => {
      toast.success("Cinta actualizada con éxito");
      handleClose();
      revalidateServerTags(tagsCacheByRoutes.tapes.multipleTag);
    },
  });
  const form = useForm<TapeEdit>({
    resolver: zodResolver(TapeEditSchema),
    defaultValues: {
      name: tape.name,
    },
  });

  const { loading: imageLoading, error: errorImage } = useImageForm({
    form,
    imageUrl: tape.image,
    imageName: tape.name,
    fieldName: "image",
  });

  const handleClose = () => {
    handleCloseModal(modalTypes.editTapeModal.name);
  };

  function onSubmit(tape: TapeEdit) {
    editTape(tape);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        {editTapeError && <AlertDestructive title={editTapeError} />}
        <TapeForm imageRecived={{ loading: imageLoading, error: errorImage }} />
        <FormActionButtons
          submitLoading={submitLoading}
          submitButtonText="Actualizar Cinta"
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
