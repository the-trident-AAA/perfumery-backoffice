"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { revalidateServerTags } from "@/lib/cache";
import { tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { useContext } from "react";
import { ModalContext } from "@/components/modal/context/modalContext";
import {
  PerfumeTypeCreate,
  perfumeTypeCreateSchema,
} from "./schemas/perfume-type-create-schema";
import useCreatePerfumeType from "../../hooks/use-create-perfume-types";
import PerfumeTypeForm from "../perfume-type-form";
import { toast } from "react-toastify";
import FormActionButtons from "@/components/form/components/form-action-buttons/form-action-buttons";
import { AlertDestructive } from "@/components/ui/alert-destructive";

export default function NewPerfumeTypeFormContainer() {
  const { handleCloseModal } = useContext(ModalContext);
  const { loading: submitLoading, createPerfumeType , error: createPerfumeTypeError } = useCreatePerfumeType({
    onCreateAction: () => {
      toast.success("Tipo de Perfume creado con éxito");
      handleClose();
      revalidateServerTags(tagsCacheByRoutes.perfumeTypes.multipleTag);
    },
  });

  const form = useForm<PerfumeTypeCreate>({
    resolver: zodResolver(perfumeTypeCreateSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleClose = () => {
    handleCloseModal(modalTypes.newPerfumeTypeModal.name);
  };

  function onSubmit(perfumeType: PerfumeTypeCreate) {
    createPerfumeType(perfumeType);
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        {createPerfumeTypeError && <AlertDestructive title={createPerfumeTypeError} />}
        <PerfumeTypeForm />
        <FormActionButtons
          submitLoading={submitLoading}
          submitButtonText="Crear Tipo de Perfume"
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
