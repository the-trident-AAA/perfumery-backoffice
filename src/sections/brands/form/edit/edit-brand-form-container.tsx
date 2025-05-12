"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { revalidateServerTags } from "@/lib/cache";
import { tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { useContext } from "react";
import { ModalContext } from "@/components/modal/context/modalContext";
import { Button } from "@/components/ui/button";
import BrandForm from "../brand-form";
import { BrandEdit, brandEditSchema } from "./schemas/brand-edit-schema";
import useEditBrand from "../../hooks/use-edit-brand";
import { BrandDetails } from "@/types/brands";

interface Props {
  brand: BrandDetails;
}

export default function EditBrandFormContainer({ brand }: Props) {
  const { handleCloseModal } = useContext(ModalContext);
  const { editBrand, loading: submitLoading } = useEditBrand({
    id: brand.id,
    onEditAction: () => {
      console.log("Marca actualizada con éxito");
      handleClose();
      revalidateServerTags(tagsCacheByRoutes.brands.multipleTag);
    },
  });

  const form = useForm<BrandEdit>({
    resolver: zodResolver(brandEditSchema),
    defaultValues: {
     name: brand.name,
    },
  });

  const handleClose = () => {
    handleCloseModal(modalTypes.editBrandModal.name);
  };

  function onSubmit(brand: BrandEdit) {
    editBrand(brand);
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        <BrandForm />
        <div className="flex gap-2 justify-end">
          <Button type="button" variant={"destructive"} onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant={"default"} type="submit" disabled={submitLoading}>
            Crear Marca
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
