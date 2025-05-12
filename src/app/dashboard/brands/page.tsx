import Modal from "@/components/modal/modal";
import { modalTypes } from "@/components/modal/types/modalTypes";
import BrandsContainer from "@/sections/brands/brands-container";
import EditBrandModalContainer from "@/sections/brands/form/edit/edit-brand-modal-container";
import NewBrandFormContainer from "@/sections/brands/form/new/new-brand-form-container";
import { getBrandsList } from "@/services/brands";
import { SearchParamsPagination } from "@/types/pagination";
import React from "react";

type Props = {
  searchParams: Promise<SearchParamsPagination>;
};

export default async function BrandsPage({ searchParams }: Props) {
  const res = await getBrandsList(await searchParams);

  if (!res.response || res.error) throw new Error("Error fetching brands");

  return (
    <>
      <BrandsContainer brands={res.response} />
      <Modal
        formPath={modalTypes.newBrandModal.name}
        title={modalTypes.newBrandModal.title}
        maxWidth="max-w-3xl"
      >
        <NewBrandFormContainer />
      </Modal>
      <Modal
        formPath={modalTypes.editBrandModal.name}
        title={modalTypes.editBrandModal.title}
        maxWidth="max-w-3xl"
      >
        <EditBrandModalContainer />
      </Modal>
    </>
  );
}
