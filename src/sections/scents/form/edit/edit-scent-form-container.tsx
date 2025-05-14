"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { revalidateServerTags } from "@/lib/cache";
import { tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { useContext } from "react";
import { ModalContext } from "@/components/modal/context/modalContext";
import { Button } from "@/components/ui/button";
import { ScentDetails } from "@/types/scents";
import { ScentEdit, scentEditSchema } from "./schemas/scent-edit-schema";
import ScentForm from "../scent-form";
import useEditScent from "../../hooks/use-edit-scent";
import { toast } from "react-toastify";

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
        <div className="flex gap-2 justify-end">
          <Button type="button" variant={"destructive"} onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant={"default"} type="submit" disabled={submitLoading}>
            Crear Aroma
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
