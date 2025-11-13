import React from "react";
import SectionsHeader from "../components/sections-header/sections-header";
import { GalleryHorizontal } from "lucide-react";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { Tape } from "@/types/tapes";
import TapeList from "./list/tapes-list";

interface Props {
  tapes: Tape[];
}

export default function TapesContainer({ tapes }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <SectionsHeader
        sectionIcon={<GalleryHorizontal />}
        sectionTitle="Gestión de Cintas"
        sectionDescription="Gestione toda la información referente a las cintas de la Tienda"
        addButton={{
          buttonText: "Añadir Nueva Cinta",
          creationPath: modalTypes.newTapeModal.name,
          isModalRedirect: true,
        }}
      />
      <TapeList tapes={tapes} />
    </div>
  );
}
