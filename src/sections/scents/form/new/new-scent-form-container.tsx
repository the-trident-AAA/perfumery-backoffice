"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { revalidateServerTags } from "@/lib/cache";
import { tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { useContext } from "react";
import { ModalContext } from "@/components/modal/context/modalContext";
import { ScentCreate, scentCreateSchema } from "./schemas/scent-create-schema";
import useCreateScent from "../../hooks/use-create-scents";
import ScentForm from "../scent-form";
import { toast } from "react-toastify";
import FormActionButtons from "@/components/form/components/form-action-buttons/form-action-buttons";

export default function NewScentFormContainer() {
  const { handleCloseModal } = useContext(ModalContext);
  const { loading: submitLoading, createScent } = useCreateScent({
    onCreateAction: () => {
      toast.success("Aroma creado con éxito");
      handleClose();
      revalidateServerTags(tagsCacheByRoutes.scents.multipleTag);
    },
  });

  const form = useForm<ScentCreate>({
    resolver: zodResolver(scentCreateSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleClose = () => {
    handleCloseModal(modalTypes.newScentModal.name);
  };

  function onSubmit(scent: ScentCreate) {
    createScent(scent);
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        <ScentForm />
        <FormActionButtons
          submitLoading={submitLoading}
          submitButtonText="Crear Aroma"
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
