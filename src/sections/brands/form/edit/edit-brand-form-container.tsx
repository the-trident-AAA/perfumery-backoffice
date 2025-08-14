"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { revalidateServerTags } from "@/lib/cache";
import { tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { useContext } from "react";
import { ModalContext } from "@/components/modal/context/modalContext";
import BrandForm from "../brand-form";
import { BrandEdit, brandEditSchema } from "./schemas/brand-edit-schema";
import useEditBrand from "../../hooks/use-edit-brand";
import { BrandDetails } from "@/types/brands";
import { toast } from "react-toastify";
import FormActionButtons from "@/components/form/components/form-action-buttons/form-action-buttons";
import { AlertDestructive } from "@/components/ui/alert-destructive";

interface Props {
  brand: BrandDetails;
}

export default function EditBrandFormContainer({ brand }: Props) {
  const { handleCloseModal } = useContext(ModalContext);
  const {
    editBrand,
    loading: submitLoading,
    error: editBrandError,
  } = useEditBrand({
    id: brand.id,
    onEditAction: () => {
      toast.success("Marca actualizada con éxito");
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
        {editBrandError && <AlertDestructive title={editBrandError} />}
        <BrandForm />
        <FormActionButtons
          submitLoading={submitLoading}
          submitButtonText="Actualizar Marca"
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
