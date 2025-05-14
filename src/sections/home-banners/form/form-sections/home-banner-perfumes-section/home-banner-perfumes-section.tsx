import RHFSelectableCardListField from "@/components/form/rhf-components/rhf-selectable-card-list-field/rhf-selectable-card-list-field";
import { modalTypes } from "@/components/modal/types/modalTypes";
import PerfumeCard from "@/sections/perfumes/components/perfume-card/perfume-card";
import { Perfume } from "@/types/perfumes";
import React from "react";

export default function HomeBannerPerfumesSection() {
  return (
    <div className="flex flex-col gap-4">
      <p>Seccion de Perfumes</p>
      <RHFSelectableCardListField<Perfume>
        name="perfumes"
        modalPath={modalTypes.selectablePerfumesModal.name}
        label="Perfumes seleccionados"
        emptyText="No se han seleccionado perfumes"
        CardComponent={PerfumeCard}
      />
    </div>
  );
}
