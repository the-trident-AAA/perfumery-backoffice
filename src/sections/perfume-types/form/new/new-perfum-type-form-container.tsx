"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { revalidateServerTags } from "@/lib/cache";
import { tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { useContext } from "react";
import { ModalContext } from "@/components/modal/context/modalContext";
import { Button } from "@/components/ui/button";
import { PerfumeTypeCreate, perfumeTypeCreateSchema } from "./schemas/perfume-type-create-schema";
import useCreatePerfumeType from "../../hooks/use-create-perfume-types";
import PerfumeTypeForm from "../perfume-type-form";



export default function NewPerfumeTypeFormContainer() {
  const { handleCloseModal } = useContext(ModalContext);
  const { loading: submitLoading, createPerfumeType } = useCreatePerfumeType({
    onCreateAction: () => {
      console.log("Tipo de Perfume creado con éxito");
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
        <PerfumeTypeForm />
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
