"use client";
import { useMemo } from "react";
import PerfumeBasicInformationFormSection from "./new/form-sections/perfume-basic-information-form-section/perfume-basic-information-form-section";
import PerfumeCharacteristicsFormSection from "./new/form-sections/perfume-characteristics-form-section/perfume-characteristics-form-section";
import PerfumeComercialInfoFormSection from "./new/form-sections/perfume-comercial-info-form-section/perfume-comercial-info-form-section";
import { TabsContainer } from "@/components/ui/tabs-panel";

export function PerfumeForm() {
  const tabs = useMemo(
    () => [
      {
        label: "Información Básica",
        value: "1",
        component: <PerfumeBasicInformationFormSection />,
      },
      {
        label: "Características",
        value: "2",
        component: <PerfumeCharacteristicsFormSection />,
      },
      {
        label: "Info. Comercial",
        value: "3",
        component: <PerfumeComercialInfoFormSection />,
      },
    ],
    []
  );
  return <TabsContainer tabs={tabs} fullWidth={false} />;
}
