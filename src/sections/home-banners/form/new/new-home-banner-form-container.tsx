"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { revalidateServerTags } from "@/lib/cache";
import { tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import {
  HomeBannerCreate,
  homeBannerCreateSchema,
} from "./schemas/home-banner-create-schema";
import useCreateHomeBanner from "../../hooks/use-create-home-banner";
import HomeBannerForm from "../home-banner-form";

export default function NewHomeBannerFormContainer() {
  const { handleCloseModal } = useContext(ModalContext);
  const { loading: submitLoading, createHomeBanner } = useCreateHomeBanner({
    onCreateAction: () => {
      console.log("Home-banner creado con éxito");
      handleClose();
      revalidateServerTags(tagsCacheByRoutes.homeBanners.multipleTag);
    },
  });
  const form = useForm<HomeBannerCreate>({
    resolver: zodResolver(homeBannerCreateSchema),
    defaultValues: {
      title: "",
      description: "",
      perfumes: [],
    },
  });

  const handleClose = () => {
    handleCloseModal(modalTypes.newHomeBannerModal.name);
  };

  function onSubmit(homeBanner: HomeBannerCreate) {
    createHomeBanner(homeBanner);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        <HomeBannerForm />
        <div className="flex gap-2 justify-end">
          <Button type="button" variant={"destructive"} onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant={"default"} type="submit" disabled={submitLoading}>
            Crear Banner
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
