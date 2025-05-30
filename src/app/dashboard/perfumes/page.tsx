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

/*const perfumes: Perfume[] = [
  {
    id: "1",
    available: true,
    brand: "Chanel",
    cant: 1,
    gender: "Femenino",
    liters: 1,
    name: "Chanel No. 5",
    perfumeType: "Eau de Parfum",
    price: 100,
    scents: ["Floral", "Aldehydic"],
  },
  {
    id: "2",
    available: true,
    brand: "Chanel",
    cant: 1,
    gender: "Femenino",
    liters: 1,
    name: "Chanel No. 5",
    perfumeType: "Eau de Parfum",
    price: 100,
    scents: ["Floral", "Aldehydic"],
  },
  {
    id: "3",
    available: true,
    brand: "Chanel",
    cant: 1,
    gender: "Femenino",
    liters: 1,
    name: "Chanel No. 5",
    perfumeType: "Eau de Parfum",
    price: 100,
    scents: ["Floral", "Aldehydic"],
  },
  {
    id: "4",
    available: true,
    brand: "Chanel",
    cant: 1,
    gender: "Femenino",
    liters: 1,
    name: "Chanel No. 5",
    perfumeType: "Eau de Parfum",
    price: 100,
    scents: ["Floral", "Aldehydic"],
  },
  {
    id: "5",
    available: true,
    brand: "Chanel",
    cant: 1,
    gender: "Femenino",
    liters: 1,
    name: "Chanel No. 5",
    perfumeType: "Eau de Parfum",
    price: 100,
    scents: ["Floral", "Aldehydic"],
  },
  {
    id: "6",
    available: true,
    brand: "Chanel",
    cant: 1,
    gender: "Femenino",
    liters: 1,
    name: "Chanel No. 5",
    perfumeType: "Eau de Parfum",
    price: 100,
    scents: ["Floral", "Aldehydic"],
  },
  {
    id: "7",
    available: true,
    brand: "Chanel",
    cant: 1,
    gender: "Femenino",
    liters: 1,
    name: "Chanel No. 5",
    perfumeType: "Eau de Parfum",
    price: 100,
    scents: ["Floral", "Aldehydic"],
  },
  {
    id: "8",
    available: true,
    brand: "Chanel",
    cant: 1,
    gender: "Femenino",
    liters: 1,
    name: "Chanel No. 5",
    perfumeType: "Eau de Parfum",
    price: 100,
    scents: ["Floral", "Aldehydic"],
  },
  {
    id: "9",
    available: true,
    brand: "Chanel",
    cant: 1,
    gender: "Femenino",
    liters: 1,
    name: "Chanel No. 5",
    perfumeType: "Eau de Parfum",
    price: 100,
    scents: ["Floral", "Aldehydic"],
  },
  {
    id: "10",
    available: true,
    brand: "Chanel",
    cant: 1,
    gender: "Femenino",
    liters: 1,
    name: "Chanel No. 5",
    perfumeType: "Eau de Parfum",
    price: 100,
    scents: ["Floral", "Aldehydic"],
  },
  {
    id: "11",
    available: true,
    brand: "Chanel",
    cant: 1,
    gender: "Femenino",
    liters: 1,
    name: "Chanel No. 5",
    perfumeType: "Eau de Parfum",
    price: 100,
    scents: ["Floral", "Aldehydic"],
  },
  {
    id: "12",
    available: true,
    brand: "Chanel",
    cant: 1,
    gender: "Femenino",
    liters: 1,
    name: "Chanel No. 5",
    perfumeType: "Eau de Parfum",
    price: 100,
    scents: ["Floral", "Aldehydic"],
  },
  {
    id: "13",
    available: true,
    brand: "Chanel",
    cant: 1,
    gender: "Femenino",
    liters: 1,
    name: "Chanel No. 5",
    perfumeType: "Eau de Parfum",
    price: 100,
    scents: ["Floral", "Aldehydic"],
  },
  {
    id: "14",
    available: true,
    brand: "Chanel",
    cant: 1,
    gender: "Femenino",
    liters: 1,
    name: "Chanel No. 5",
    perfumeType: "Eau de Parfum",
    price: 100,
    scents: ["Floral", "Aldehydic"],
  },
  {
    id: "15",
    available: true,
    brand: "Chanel",
    cant: 1,
    gender: "Femenino",
    liters: 1,
    name: "Chanel No. 5",
    perfumeType: "Eau de Parfum",
    price: 100,
    scents: ["Floral", "Aldehydic"],
  },
];*/

type Props = {
  searchParams: Promise<SearchParamsPagination>;
};

export default async function PerfumesPage({ searchParams }: Props) {
  const res = await getPerfumesList(await searchParams);

  if (!res.response || res.error) throw new Error("Error fetching perfumes");

  return (
    <>
      <PerfumesContainer perfumes={res.response.data} />
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
