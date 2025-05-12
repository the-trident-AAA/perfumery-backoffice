"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { revalidateServerTags } from "@/lib/cache";
import { tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { useContext } from "react";
import { ModalContext } from "@/components/modal/context/modalContext";
import { Button } from "@/components/ui/button";
import { BrandDetails } from "@/types/brands";
import { PerfumeTypeDetails } from "@/types/perfume-types";
import { PerfumeTypeEdit, perfumeTypeEditSchema } from "./schemas/perfume-type-edit-schema";
import PerfumeTypeForm from "../perfume-type-form";
import useEditPerfumeType from "../../hooks/use-edit-perfume-type";

interface Props {
  perfumeType: PerfumeTypeDetails;
}

export default function EditPerfumeTypeFormContainer({ perfumeType }: Props) {
  const { handleCloseModal } = useContext(ModalContext);
  const { editPerfumeType, loading: submitLoading } = useEditPerfumeType({
    id: perfumeType.id,
    onEditAction: () => {
      console.log("Tipo de perfume actualizado con éxito");
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
        <PerfumeTypeForm />
        <div className="flex gap-2 justify-end">
          <Button type="button" variant={"destructive"} onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant={"default"} type="submit" disabled={submitLoading}>
            Crear Tipo de Perfume
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
