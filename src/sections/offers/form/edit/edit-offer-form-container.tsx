"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { revalidateServerTags } from "@/lib/cache";
import { tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import OfferForm from "../offer-form";
import { OfferEdit, offerEditSchema } from "./schemas/offer-edit-schema";
import { OfferDetails } from "@/types/offers";
import useEditOffer from "../../hooks/use-edit-offer";
import { toast } from "react-toastify";

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
        <OfferForm />
        <div className="flex gap-2 justify-end">
          <Button type="button" variant={"destructive"} onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant={"default"} type="submit" disabled={submitLoading}>
            Actualizar Oferta
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
