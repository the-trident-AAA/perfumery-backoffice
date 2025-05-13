import React from "react";
import SectionsHeader from "../components/sections-header/sections-header";
import { Package } from "lucide-react";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { HomeBanner } from "@/types/home-banners";
import HomeBannersList from "./list/home-banners-list";

interface Props {
  homeBanners: HomeBanner[];
}

export default function HomeBannersContainer({ homeBanners }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <SectionsHeader
        sectionIcon={<Package />}
        sectionTitle="Gestión de Banners de la Página Principal"
        sectionDescription="Gestione toda la información referente a los banners de la página principal de la Tienda"
        buttonText="Añadir Nuevo Banner"
        creationPath={modalTypes.newPerfumeModal.name}
        isModalRedirect
      />
      <HomeBannersList homeBanners={homeBanners} />
    </div>
  );
}
