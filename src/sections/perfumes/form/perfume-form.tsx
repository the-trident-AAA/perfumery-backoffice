"use client";
import { useMemo } from "react";
import PerfumeBasicInformationFormSection from "./form-sections/perfume-basic-information-form-section/perfume-basic-information-form-section";
import PerfumeCharacteristicsFormSection from "./form-sections/perfume-characteristics-form-section/perfume-characteristics-form-section";
import PerfumeComercialInfoFormSection from "./form-sections/perfume-comercial-info-form-section/perfume-comercial-info-form-section";
import { TabsContainer } from "@/components/ui/tabs-panel/tabs-panel";
import { TabsPanelProvider } from "@/components/ui/tabs-panel/context/tabs-panel-context";
import FormSectionsController from "./form-sections/form-sections-controller";

interface Props {
  imageRecived?: {
    loading: boolean;
    error: string | null;
  };
}

export function PerfumeForm({ imageRecived }: Props) {
  const tabs = useMemo(
    () => [
      {
        label: "Información Básica",
        value: "1",
        component: (
          <PerfumeBasicInformationFormSection imageRecived={imageRecived} />
        ),
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
    [imageRecived]
  );

  return (
    <TabsPanelProvider initialTab={tabs[0].value}>
      <FormSectionsController>
        <TabsContainer tabs={tabs} fullWidth />
      </FormSectionsController>
    </TabsPanelProvider>
  );
}
