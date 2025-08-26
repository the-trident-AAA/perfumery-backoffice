import Modal from "@/components/modal/modal";
import { modalTypes } from "@/components/modal/types/modalTypes";
import DeletePerfumeModalContainer from "@/sections/perfumes/delete/delete-perfume-modal-container";
import PerfumeDetailsModalContainer from "@/sections/perfumes/details/perfume-details-modal-container";
import EditPerfumeModalContainer from "@/sections/perfumes/form/edit/edit-perfume-modal-container";
import NewPerfumeFormContainer from "@/sections/perfumes/form/new/new-perfume-form-container";
import PerfumesContainer from "@/sections/perfumes/perfumes-container";
import { getPerfumesList } from "@/services/perfumes";
import { SearchParamsPagination } from "@/types/pagination";
import React from "react";

type Props = {
  searchParams: Promise<SearchParamsPagination>;
};

export default async function PerfumesPage({ searchParams }: Props) {
  const res = await getPerfumesList(await searchParams);

  if (!res.response || res.error) throw new Error("Error fetching perfumes");

  const pagination = res.response.paginationMeta;

  return (
    <>
      <PerfumesContainer
        perfumes={res.response.data}
        apiPagination={pagination}
      />
      <Modal
        formPath={modalTypes.newPerfumeModal.name}
        title={modalTypes.newPerfumeModal.title}
        maxWidth="max-w-3xl"
        className="min-h-[65vh]"
      >
        <NewPerfumeFormContainer />
      </Modal>
      <Modal
        formPath={modalTypes.editPerfumeModal.name}
        title={modalTypes.editPerfumeModal.title}
        maxWidth="max-w-3xl"
        className="min-h-[65vh]"
      >
        <EditPerfumeModalContainer />
      </Modal>
      <Modal
        formPath={modalTypes.detailsPerfumeModal.name}
        title={modalTypes.detailsPerfumeModal.title}
        maxWidth="max-w-3xl"
        className="min-h-[65vh]"
      >
        <PerfumeDetailsModalContainer />
      </Modal>
      <Modal formPath={modalTypes.detelePerfumeModal.name} maxWidth="max-w-xl">
        <DeletePerfumeModalContainer />
      </Modal>
    </>
  );
}
