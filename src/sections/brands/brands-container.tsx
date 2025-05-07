import React from "react";
import SectionsHeader from "../components/sections-header/sections-header";
import { Package } from "lucide-react";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { Brand } from "@/types/brands";
import BrandList from "./list/brands-list";

interface Props {
  brands: Brand[];
}

export default function BrandsContainer({ brands }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <SectionsHeader
        sectionIcon={<Package />}
        sectionTitle="Gestión de Marcas"
        sectionDescription="Gestione toda la información referente a las marcas de los perfumes"
        buttonText="Añadir Nueva Marca"
        creationPath={modalTypes.newPerfumeModal.name}
        isModalRedirect
      />
      <BrandList brands={brands} />
    </div>
  );
}
