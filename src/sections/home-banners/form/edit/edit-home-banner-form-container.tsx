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
import FormActionButtons from "@/components/form/components/form-action-buttons/form-action-buttons";
import { AlertDestructive } from "@/components/ui/alert-destructive";
import useImageForm from "@/components/form/hooks/use-image-form";

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
      buttonText: homeBanner.buttonText,
      statisticalTips: homeBanner.statisticalTips,
      infoTips: homeBanner.infoTips.map((infoTip) => ({ name: infoTip })),
      nameFilter: {
        name: "name",
        value:
          homeBanner.filters.find((filter) => filter.name === "name")?.value ||
          "",
      },
      brandFilter: {
        name: "brandId",
        value:
          homeBanner.filters.find((filter) => filter.name === "brandId")
            ?.value || "",
      },
      genderFilter: {
        name: "gender",
        value:
          homeBanner.filters.find((filter) => filter.name === "gender")
            ?.value || "",
      },
      scentsFilters: {
        name: "scentsIds",
        value:
          homeBanner.filters
            .filter((filter) => filter.name === "scentsIds")
            ?.map((filter) => filter.value) || [],
      },
      millilitersMinFilter: {
        name: "millilitersMin",
        value: Number(
          homeBanner.filters.find((filter) => filter.name === "millilitersMin")
            ?.value || 0
        ),
      },
      millilitersMaxFilter: {
        name: "millilitersMax",
        value: Number(
          homeBanner.filters.find((filter) => filter.name === "millilitersMax")
            ?.value || 0
        ),
      },
      salesMinFilter: {
        name: "salesMin",
        value: Number(
          homeBanner.filters.find((filter) => filter.name === "salesMin")
            ?.value || 0
        ),
      },
      salesMaxFilter: {
        name: "salesMax",
        value: Number(
          homeBanner.filters.find((filter) => filter.name === "salesMax")
            ?.value || 0
        ),
      },
      priceMinFilter: {
        name: "priceMin",
        value: Number(
          homeBanner.filters.find((filter) => filter.name === "priceMin")
            ?.value || 0
        ),
      },
      priceMaxFilter: {
        name: "priceMax",
        value: Number(
          homeBanner.filters.find((filter) => filter.name === "priceMax")
            ?.value || 0
        ),
      },
      perfumeTypeFilter: {
        name: "perfumeTypeId",
        value:
          homeBanner.filters.find((filter) => filter.name === "perfumeTypeId")
            ?.value || "",
      },
      offerFilter: {
        name: "offerId",
        value:
          homeBanner.filters.find((filter) => filter.name === "offerId")
            ?.value || "",
      },
      totalPriceMinFilter: {
        name: "totalPriceMin",
        value: Number(
          homeBanner.filters.find((filter) => filter.name === "totalPriceMin")
            ?.value || 0
        ),
      },
      totalPriceMaxFilter: {
        name: "totalPriceMax",
        value: Number(
          homeBanner.filters.find((filter) => filter.name === "totalPriceMax")
            ?.value || 0
        ),
      },
    },
  });

  const { loading: imageLoading, error: errorImage } = useImageForm({
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
        <HomeBannerForm
          imageRecived={{ loading: imageLoading, error: errorImage }}
        />
        <FormActionButtons
          submitLoading={submitLoading}
          submitButtonText="Actualizar Banner"
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
