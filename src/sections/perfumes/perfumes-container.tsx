import { Perfume } from "@/types/perfumes";
import React from "react";
import SectionsHeader from "../components/sections-header/sections-header";
import { Package } from "lucide-react";
import PerfumesList from "./list/perfumes-list";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { SprayCan } from "lucide-react";

interface Props {
  perfumes: Perfume[];
}

export default function PerfumesContainer({ perfumes }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <SectionsHeader
        sectionIcon={<SprayCan />}
        sectionTitle="Gestión de Perfumes"
        sectionDescription="Gestione toda la información referente a los perfumes de la Tienda"
        addButton={{
          buttonText: "Añadir Nuevo Perfume",
          creationPath: modalTypes.newPerfumeModal.name,
          isModalRedirect: true,
        }}
      />
      <PerfumesList perfumes={perfumes} />
    </div>
  );
}
