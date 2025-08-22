"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { revalidateServerTags } from "@/lib/cache";
import { tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import HomeBannerForm from "../home-banner-form";
import {
  HomeBannerEdit,
  homeBannerEditSchema,
} from "./schemas/home-banner-edit-schema";
import { HomeBannerDetails } from "@/types/home-banners";
import useEditHomeBanner from "../../hooks/use-edit-home-banner";
import { toast } from "react-toastify";
import useImageForm from "@/components/form/hooks/use-image-form";
import FormActionButtons from "@/components/form/components/form-action-buttons/form-action-buttons";
import { AlertDestructive } from "@/components/ui/alert-destructive";

interface Props {
  homeBanner: HomeBannerDetails;
}

export default function EditHomeBannerFormContainer({ homeBanner }: Props) {
  const { handleCloseModal } = useContext(ModalContext);
  const {
    loading: submitLoading,
    editHomeBanner,
    error: editHomeBannerError,
  } = useEditHomeBanner({
    id: homeBanner.id,
    onEditAction: () => {
      toast.success("Banner de la Página Home actualizado con éxito");
      handleClose();
      revalidateServerTags(tagsCacheByRoutes.homeBanners.multipleTag);
    },
  });
  const form = useForm<HomeBannerEdit>({
    resolver: zodResolver(homeBannerEditSchema),
    defaultValues: {
      title: homeBanner.title,
      description: homeBanner.description,
    },
  });

  const { loading, error } = useImageForm({
    form,
    imageUrl: homeBanner.image,
    imageName: homeBanner.title,
    fieldName: "image",
  });

  const handleClose = () => {
    handleCloseModal(modalTypes.editHomeBannerModal.name);
  };

  function onSubmit(homeBanner: HomeBannerEdit) {
    editHomeBanner(homeBanner);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        {editHomeBannerError && (
          <AlertDestructive title={editHomeBannerError} />
        )}
        <HomeBannerForm imageRecived={{ loading, error }} />
        <FormActionButtons
          submitLoading={submitLoading}
          submitButtonText="Actualizar Banner"
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
