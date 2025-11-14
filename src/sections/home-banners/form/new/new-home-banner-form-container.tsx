"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
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
import { toast } from "react-toastify";
import FormActionButtons from "@/components/form/components/form-action-buttons/form-action-buttons";
import { AlertDestructive } from "@/components/ui/alert-destructive";

export default function NewHomeBannerFormContainer() {
  const { handleCloseModal } = useContext(ModalContext);
  const {
    loading: submitLoading,
    createHomeBanner,
    error: createHomeBannerError,
  } = useCreateHomeBanner({
    onCreateAction: () => {
      toast.success("Banner de la Página Home creado con éxito");
      handleClose();
      revalidateServerTags(tagsCacheByRoutes.homeBanners.multipleTag);
    },
  });
  const form = useForm<HomeBannerCreate>({
    resolver: zodResolver(homeBannerCreateSchema),
    defaultValues: {
      title: "",
      description: "",
      buttonText: "",
      statisticalTips: [],
      infoTips: [],
      nameFilter: {
        name: "name",
        value: "",
      },
      brandFilter: {
        name: "brandId",
        value: "",
      },
      genderFilter: {
        name: "gender",
        value: "",
      },
      scentsFilters: {
        name: "scentsIds",
        value: [],
      },
      millilitersMinFilter: {
        name: "millilitersMin",
        value: 0,
      },
      millilitersMaxFilter: {
        name: "millilitersMax",
        value: 0,
      },
      salesMinFilter: {
        name: "salesMin",
        value: 0,
      },
      salesMaxFilter: {
        name: "salesMax",
        value: 0,
      },
      priceMinFilter: {
        name: "priceMin",
        value: 0,
      },
      priceMaxFilter: {
        name: "priceMax",
        value: 0,
      },
      perfumeTypeFilter: {
        name: "perfumeTypeId",
        value: "",
      },
      offerFilter: {
        name: "offerId",
        value: "",
      },
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
        {createHomeBannerError && (
          <AlertDestructive title={createHomeBannerError} />
        )}
        <HomeBannerForm />
        <FormActionButtons
          submitLoading={submitLoading}
          submitButtonText="Crear Banner"
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
