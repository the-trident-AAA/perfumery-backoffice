"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ModalContext } from "@/components/modal/context/modalContext";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { revalidateServerTags } from "@/lib/cache";
import { tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { OfferCreate, offerCreateSchema } from "./schemas/offer-create-schema";
import useCreateOffer from "../../hooks/use-create-offer";
import OfferForm from "../offer-form";
import { toast } from "react-toastify";

export default function NewOfferFormContainer() {
  const { handleCloseModal } = useContext(ModalContext);
  const { loading: submitLoading, createOffer } = useCreateOffer({
    onCreateAction: () => {
      toast.success("Oferta creada con éxito");
      handleClose();
      revalidateServerTags(tagsCacheByRoutes.offers.multipleTag);
    },
  });
  const form = useForm<OfferCreate>({
    resolver: zodResolver(offerCreateSchema),
    defaultValues: {
      name: "",
      description: "",
      discount: 1,
      offerType: "",
      scope: "",
    },
  });

  const handleClose = () => {
    handleCloseModal(modalTypes.newOfferModal.name);
  };

  function onSubmit(offer: OfferCreate) {
    createOffer(offer);
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
            Crear Oferta
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
