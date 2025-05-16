"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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

interface Props {
  homeBanner: HomeBannerDetails;
}

export default function EditHomeBannerFormContainer({ homeBanner }: Props) {
  const { handleCloseModal } = useContext(ModalContext);
  const { loading: submitLoading, editHomeBanner } = useEditHomeBanner({
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
      perfumes: homeBanner.perfumes.map((perfume) => ({
        ...perfume,
        brand: perfume.brand.name,
        perfumeType: perfume.perfumeType.name,
        discountOffer: perfume.offer ? perfume.offer.discount : 0,
        scents: perfume.scents.map((scent) => scent.name),
      })),
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
        <HomeBannerForm imageRecived={{ loading, error }} />
        <div className="flex gap-2 justify-end">
          <Button type="button" variant={"destructive"} onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant={"default"} type="submit" disabled={submitLoading}>
            Actualizar Banner
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
