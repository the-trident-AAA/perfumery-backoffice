import React from "react";
import SectionsHeader from "../components/sections-header/sections-header";
import { SoapDispenserDroplet } from "lucide-react";
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
        sectionIcon={<SoapDispenserDroplet />}
        sectionTitle="Gestión de Aromas"
        sectionDescription="Gestione toda la información referente a los aromas de los perfumes"
        addButton={{
          buttonText: "Añadir Nuevo Aroma",
          creationPath: modalTypes.newScentModal.name,
          isModalRedirect: true,
        }}
      />
      <ScentsList scents={scents} />
    </div>
  );
}
