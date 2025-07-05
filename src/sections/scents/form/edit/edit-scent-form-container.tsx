"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { revalidateServerTags } from "@/lib/cache";
import { tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { useContext } from "react";
import { ModalContext } from "@/components/modal/context/modalContext";
import { ScentDetails } from "@/types/scents";
import { ScentEdit, scentEditSchema } from "./schemas/scent-edit-schema";
import ScentForm from "../scent-form";
import useEditScent from "../../hooks/use-edit-scent";
import { toast } from "react-toastify";
import FormActionButtons from "@/components/form/components/form-action-buttons/form-action-buttons";

interface Props {
  scent: ScentDetails;
}

export default function EditScentFormContainer({ scent }: Props) {
  const { handleCloseModal } = useContext(ModalContext);
  const { editScent, loading: submitLoading } = useEditScent({
    id: scent.id,
    onEditAction: () => {
      toast.success("Aroma actualizado con éxito");
      handleClose();
      revalidateServerTags(tagsCacheByRoutes.scents.multipleTag);
    },
  });

  const form = useForm<ScentEdit>({
    resolver: zodResolver(scentEditSchema),
    defaultValues: {
      name: scent.name,
    },
  });

  const handleClose = () => {
    handleCloseModal(modalTypes.editScentModal.name);
  };

  function onSubmit(scent: ScentEdit) {
    editScent(scent);
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
          submitButtonText="Actualizar Aroma"
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
