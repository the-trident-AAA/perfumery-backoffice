import { Perfume } from "@/types/perfumes";
import React from "react";
import SectionsHeader from "../components/sections-header/sections-header";
import { Package } from "lucide-react";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { Scent } from "@/types/scents";
import ScentsList from "./list/scents-list";

interface Props {
  scents: Scent[];
}

export default function ScentsContainer({ scents }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <SectionsHeader
        sectionIcon={<Package />}
        sectionTitle="Gestión de Esencias"
        sectionDescription="Gestione toda la información referente a las esencias de los perfumes"
        buttonText="Añadir Nueva Esencia"
        creationPath={modalTypes.newPerfumeModal.name}
        isModalRedirect
      />
      <ScentsList scents={scents} />
    </div>
  );
}
