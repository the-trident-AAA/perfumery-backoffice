import React from "react";
import SectionsHeader from "../components/sections-header/sections-header";
import { Package } from "lucide-react";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { Offer } from "@/types/offers";
import OffersList from "./list/offers-list";

interface Props {
  offers: Offer[];
}

export default function OffersContainer({ offers }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <SectionsHeader
        sectionIcon={<Package />}
        sectionTitle="Gestión de Ofertas"
        sectionDescription="Gestione toda la información referente a las ofertas de los perfumes"
        buttonText="Añadir Nueva Oferta"
        creationPath={modalTypes.newPerfumeModal.name}
        isModalRedirect
      />
      <OffersList offers={offers} />
    </div>
  );
}
