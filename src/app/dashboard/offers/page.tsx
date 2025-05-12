import Modal from "@/components/modal/modal";
import { modalTypes } from "@/components/modal/types/modalTypes";
import EditOfferModalContainer from "@/sections/offers/form/edit/edit-offer-modal-container";
import NewOfferFormContainer from "@/sections/offers/form/new/new-offer-form-container";
import OffersContainer from "@/sections/offers/offers-container";
import { getOffersList } from "@/services/offers";
import { SearchParamsPagination } from "@/types/pagination";
import React from "react";

type Props = {
  searchParams: Promise<SearchParamsPagination>;
};

export default async function OffersPage({ searchParams }: Props) {
  const res = await getOffersList(await searchParams);

  if (!res.response || res.error) throw new Error("Error fetching offers");

  return (
    <>
      <OffersContainer offers={res.response} />
      <Modal
        formPath={modalTypes.newOfferModal.name}
        title={modalTypes.newOfferModal.title}
        maxWidth="max-w-3xl"
      >
        <NewOfferFormContainer />
      </Modal>
      <Modal
        formPath={modalTypes.editOfferModal.name}
        title={modalTypes.editOfferModal.title}
        maxWidth="max-w-3xl"
      >
        <EditOfferModalContainer />
      </Modal>
    </>
  );
}
