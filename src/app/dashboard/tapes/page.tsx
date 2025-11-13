import Modal from "@/components/modal/modal";
import { modalTypes } from "@/components/modal/types/modalTypes";
import DeleteTapeModalContainer from "@/sections/tapes/delete/delete-tape-modal-container";
import EditTapeModalContainer from "@/sections/tapes/form/edit/edit-tape-modal-container";
import NewTapeFormContainer from "@/sections/tapes/form/new/new-tape-form-container";
import TapesContainer from "@/sections/tapes/tapes-container";
import { getTapesList } from "@/services/tapes";
import { SearchParamsPagination } from "@/types/pagination";
import React from "react";

type Props = {
  searchParams: Promise<SearchParamsPagination>;
};

export default async function TapesPage({ searchParams }: Props) {
  const res = await getTapesList(await searchParams);

  if (!res.response || res.error)
    throw new Error("Error fetching tapes");
  return (
    <>
      <TapesContainer tapes={res.response} />
      <Modal
        formPath={modalTypes.newTapeModal.name}
        title={modalTypes.newTapeModal.title}
        maxWidth="max-w-3xl"
        className="min-h-[74vh]"
      >
        <NewTapeFormContainer />
      </Modal>
      <Modal
        formPath={modalTypes.editTapeModal.name}
        title={modalTypes.editTapeModal.title}
        maxWidth="max-w-3xl"
        className="min-h-[74vh]"
      >
        <EditTapeModalContainer />
      </Modal>
      <Modal
        formPath={modalTypes.detailsTapeModal.name}
        title={modalTypes.detailsTapeModal.title}
        maxWidth="max-w-3xl"
        className="min-h-[74vh]"
      >
       Ver detalles
      </Modal>
      <Modal
        formPath={modalTypes.deleteTapeModal.name}
        maxWidth="max-w-xl"
      >
        <DeleteTapeModalContainer />
      </Modal>
    </>
  );
}
