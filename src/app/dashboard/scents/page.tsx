import Modal from "@/components/modal/modal";
import { modalTypes } from "@/components/modal/types/modalTypes";
import DeleteScentModalContainer from "@/sections/scents/delete/delete-scent-modal-container";
import EditScentModalContainer from "@/sections/scents/form/edit/edit-scent-modal-container";
import NewScentFormContainer from "@/sections/scents/form/new/new-scent-form-container";
import ScentsContainer from "@/sections/scents/scents-container";
import { getScentsList } from "@/services/scents";
import { SearchParamsPagination } from "@/types/pagination";
import React from "react";

type Props = {
  searchParams: Promise<SearchParamsPagination>;
};

export default async function ScentsPage({ searchParams }: Props) {
  const res = await getScentsList(await searchParams);

  if (!res.response || res.error) throw new Error("Error fetching scents");

  return (
    <>
      <ScentsContainer scents={res.response} />
      <Modal
        formPath={modalTypes.newScentModal.name}
        title={modalTypes.newScentModal.title}
        maxWidth="max-w-3xl"
      >
        <NewScentFormContainer />
      </Modal>
      <Modal
        formPath={modalTypes.editScentModal.name}
        title={modalTypes.editScentModal.title}
        maxWidth="max-w-3xl"
      >
        <EditScentModalContainer />
      </Modal>
      <Modal formPath={modalTypes.deleteScentModal.name} maxWidth="max-w-xl">
        <DeleteScentModalContainer />
      </Modal>
    </>
  );
}
