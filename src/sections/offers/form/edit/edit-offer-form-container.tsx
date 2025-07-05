"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { revalidateServerTags } from "@/lib/cache";
import { tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import OfferForm from "../offer-form";
import { OfferEdit, offerEditSchema } from "./schemas/offer-edit-schema";
import { OfferDetails } from "@/types/offers";
import useEditOffer from "../../hooks/use-edit-offer";
import { toast } from "react-toastify";
import useImageForm from "@/components/form/hooks/use-image-form";
import FormActionButtons from "@/components/form/components/form-action-buttons/form-action-buttons";

interface Props {
  offer: OfferDetails;
}

export default function EditOfferFormContainer({ offer }: Props) {
  const { handleCloseModal } = useContext(ModalContext);
  const { loading: submitLoading, editOffer } = useEditOffer({
    id: offer.id,
    onEditAction: () => {
      toast.success("Oferta actualizada con éxito");
      handleClose();
      revalidateServerTags(tagsCacheByRoutes.offers.multipleTag);
    },
  });
  const form = useForm<OfferEdit>({
    resolver: zodResolver(offerEditSchema),
    defaultValues: {
      name: offer.name,
      description: offer.description,
      discount: offer.discount * 100,
      offerType: offer.offerType,
      scope: offer.scope,
    },
  });

  const { loading, error } = useImageForm({
    form,
    imageUrl: offer.image,
    imageName: offer.name,
    fieldName: "image",
  });

  const handleClose = () => {
    handleCloseModal(modalTypes.editOfferModal.name);
  };

  function onSubmit(offer: OfferEdit) {
    editOffer(offer);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        <OfferForm imageRecived={{ loading, error }} />
        <FormActionButtons
          submitLoading={submitLoading}
          submitButtonText="Actualizar Oferta"
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
