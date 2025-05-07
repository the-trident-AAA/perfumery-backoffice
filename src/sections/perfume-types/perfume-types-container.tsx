import React from "react";
import SectionsHeader from "../components/sections-header/sections-header";
import { Package } from "lucide-react";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { PerfumeType } from "@/types/perfume-types";
import PerfumeTypesList from "./list/perfume-types-list";


interface Props {
  perfumeTypes: PerfumeType[];
}

export default function PerfumeTypesContainer({ perfumeTypes }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <SectionsHeader
        sectionIcon={<Package />}
        sectionTitle="Gestión de Tipos de Perfumes"
        sectionDescription="Gestione toda la información referente a los tipos de perfumes"
        buttonText="Añadir Nuevo Tipo de Perfume"
        creationPath={modalTypes.newPerfumeModal.name}
        isModalRedirect
      />
      <PerfumeTypesList perfumeTypes={perfumeTypes} />
    </div>
  );
}
