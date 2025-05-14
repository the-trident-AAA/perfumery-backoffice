"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { BrandCreate, brandCreateSchema } from "./schemas/brand-create-schema";
import { FormProvider, useForm } from "react-hook-form";
import useCreateBrand from "../../hooks/use-create-brand";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { revalidateServerTags } from "@/lib/cache";
import { tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { useContext } from "react";
import { ModalContext } from "@/components/modal/context/modalContext";
import { Button } from "@/components/ui/button";
import BrandForm from "../brand-form";
import { toast } from "react-toastify";

export default function NewBrandFormContainer() {
  const { handleCloseModal } = useContext(ModalContext);
  const { loading: submitLoading, createBrand } = useCreateBrand({
    onCreateAction: () => {
      toast.success("Marca creada con éxito");
      handleClose();
      revalidateServerTags(tagsCacheByRoutes.brands.multipleTag);
    },
  });

  const form = useForm<BrandCreate>({
    resolver: zodResolver(brandCreateSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleClose = () => {
    handleCloseModal(modalTypes.newBrandModal.name);
  };

  function onSubmit(brand: BrandCreate) {
    createBrand(brand);
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
