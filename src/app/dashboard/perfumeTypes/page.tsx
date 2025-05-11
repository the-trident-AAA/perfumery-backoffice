import Modal from "@/components/modal/modal";
import { modalTypes } from "@/components/modal/types/modalTypes";
import NewPerfumeTypeFormContainer from "@/sections/perfume-types/form/new/new-perfum-type-form-container";
import PerfumeTypesContainer from "@/sections/perfume-types/perfume-types-container";
import { getPerfumeTypesList } from "@/services/perfume-types";
import { SearchParamsPagination } from "@/types/pagination";
import React from "react";

type Props = {
  searchParams: Promise<SearchParamsPagination>;
};

export default async function PerfumeTypesPage({ searchParams }: Props) {
  const res = await getPerfumeTypesList(await searchParams);

  if (!res.response || res.error) throw new Error("Error fetching perfumeTypes");

return (
    <>
      <PerfumeTypesContainer perfumeTypes={res.response} />
      <Modal
        formPath={modalTypes.newPerfumeTypeModal.name}
        title={modalTypes.newPerfumeTypeModal.title}
        maxWidth="max-w-3xl"
        >
        <NewPerfumeTypeFormContainer /> 
      </Modal>
    </>
  );
}

