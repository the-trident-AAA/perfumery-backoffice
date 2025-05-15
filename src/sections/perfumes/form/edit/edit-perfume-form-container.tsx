"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { PerfumeForm } from "../perfume-form";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { PerfumeDetails } from "@/types/perfumes";
import { revalidateServerTags } from "@/lib/cache";
import { tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { PerfumeEdit, perfumeEditSchema } from "./schemas/perfume-edit-schema";
import useEditPerfume from "../../hooks/use-edit-perfume";
import { toast } from "react-toastify";
import useImageForm from "@/components/form/hooks/use-image-form";

interface Props {
  perfume: PerfumeDetails;
}

export default function EditPerfumeFormContainer({ perfume }: Props) {
  const { handleCloseModal } = useContext(ModalContext);
  const { editPerfume, loading: submitLoading } = useEditPerfume({
    id: perfume.id,
    onEditAction: () => {
      toast.success("Perfume actualizado con éxito");
      handleClose();
      revalidateServerTags(tagsCacheByRoutes.perfumes.multipleTag);
    },
  });
  const form = useForm<PerfumeEdit>({
    resolver: zodResolver(perfumeEditSchema),
    defaultValues: {
      name: perfume.name,
      description: perfume.description,
      available: perfume.available,
      brandId: perfume.brand.id,
      cant: perfume.cant,
      gender: perfume.gender,
      milliliters: perfume.milliliters,
      offerId: perfume.offer ? perfume.offer.id : "",
      perfumeTypeId: perfume.perfumeType.id,
      price: perfume.price,
      scentsId: perfume.scents.map((scent) => scent.id),
    },
  });

  const { loading, error } = useImageForm({
    form,
    imageUrl: perfume.image,
    imageName: perfume.name,
    fieldName: "image",
  });

  const handleClose = () => {
    handleCloseModal(modalTypes.editPerfumeModal.name);
  };

  function onSubmit(perfume: PerfumeEdit) {
    editPerfume(perfume);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        <PerfumeForm imageRecived={{ loading, error }} />
        <div className="flex gap-2 justify-end">
          <Button type="button" variant={"destructive"} onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant={"default"} type="submit" disabled={submitLoading}>
            Actualizar Perfume
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
