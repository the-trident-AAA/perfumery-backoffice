"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  PerfumeCreate,
  perfumeCreateSchema,
} from "./schemas/perfume-create-schema";
import { Button } from "@/components/ui/button";
import { PerfumeForm } from "../perfume-form";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { Gender } from "@/types/perfumes";
import useCreatePerfume from "../../hooks/use-create-perfume";
import { revalidateServerTags } from "@/lib/cache";
import { tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { toast } from "react-toastify";

export default function NewPerfumeFormContainer() {
  const { handleCloseModal } = useContext(ModalContext);
  const { loading: submitLoading, createPerfume } = useCreatePerfume({
    onCreateAction: () => {
      toast.success("Perfume creado con éxito");
      handleClose();
      revalidateServerTags(tagsCacheByRoutes.perfumes.multipleTag);
    },
  });
  const form = useForm<PerfumeCreate>({
    resolver: zodResolver(perfumeCreateSchema),
    defaultValues: {
      name: "",
      available: false,
      brandId: "",
      cant: 1,
      gender: Gender.MALE,
      milliliters: 1,
      offerId: "",
      perfumeTypeId: "",
      price: 1,
      scentsId: [],
    },
  });

  const handleClose = () => {
    handleCloseModal(modalTypes.newPerfumeModal.name);
  };

  function onSubmit(perfume: PerfumeCreate) {
    createPerfume(perfume);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        <PerfumeForm />
        <div className="flex gap-2 justify-end">
          <Button type="button" variant={"destructive"} onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant={"default"} type="submit" disabled={submitLoading}>
            Crear Perfume
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
