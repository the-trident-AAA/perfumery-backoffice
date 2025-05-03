import { Perfume } from "@/types/perfumes";
import React from "react";
import SectionsHeader from "../components/sections-header/sections-header";
import { Package } from "lucide-react";

interface Props {
  perfumes: Perfume[];
}

export default function PerfumesContainer({ perfumes }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <SectionsHeader
        sectionIcon={<Package />}
        sectionTitle="Gestión de Perfumes"
        sectionDescription="Gestione toda la información referente a los perfumes de la Tienda"
        buttonText="Añadir Nuevo Perfume"
      />
    </div>
  );
}
