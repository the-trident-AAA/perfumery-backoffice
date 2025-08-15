"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { revalidateServerTags } from "@/lib/cache";
import { tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { useContext } from "react";
import { ModalContext } from "@/components/modal/context/modalContext";
import { PerfumeTypeDetails } from "@/types/perfume-types";
import {
  PerfumeTypeEdit,
  perfumeTypeEditSchema,
} from "./schemas/perfume-type-edit-schema";
import PerfumeTypeForm from "../perfume-type-form";
import useEditPerfumeType from "../../hooks/use-edit-perfume-type";
import { toast } from "react-toastify";
import useImageForm from "@/components/form/hooks/use-image-form";
import FormActionButtons from "@/components/form/components/form-action-buttons/form-action-buttons";
import { AlertDestructive } from "@/components/ui/alert-destructive";

interface Props {
  perfumeType: PerfumeTypeDetails;
}

export default function EditPerfumeTypeFormContainer({ perfumeType }: Props) {
  const { handleCloseModal } = useContext(ModalContext);
  const { editPerfumeType, loading: submitLoading, error: editPerfumeTypeError } = useEditPerfumeType({
    id: perfumeType.id,
    onEditAction: () => {
      toast.success("Tipo de perfume actualizado con éxito");
      handleClose();
      revalidateServerTags(tagsCacheByRoutes.perfumeTypes.multipleTag);
    },
  });

  const form = useForm<PerfumeTypeEdit>({
    resolver: zodResolver(perfumeTypeEditSchema),
    defaultValues: {
      name: perfumeType.name,
    },
  });

  const { loading, error } = useImageForm({
    form,
    imageUrl: perfumeType.image,
    imageName: perfumeType.name,
    fieldName: "image",
  });

  const handleClose = () => {
    handleCloseModal(modalTypes.editPerfumeTypeModal.name);
  };

  function onSubmit(perfumeType: PerfumeTypeEdit) {
    editPerfumeType(perfumeType);
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        {editPerfumeTypeError && <AlertDestructive title={editPerfumeTypeError} />}
        <PerfumeTypeForm imageRecived={{ loading, error }} />
        <FormActionButtons
          submitLoading={submitLoading}
          submitButtonText="Actualizar Tipo de Perfume"
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
