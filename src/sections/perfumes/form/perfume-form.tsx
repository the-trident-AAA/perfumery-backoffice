"use client";
import { useMemo } from "react";
import PerfumeBasicInformationFormSection from "./form-sections/perfume-basic-information-form-section/perfume-basic-information-form-section";
import PerfumeCharacteristicsFormSection from "./form-sections/perfume-characteristics-form-section/perfume-characteristics-form-section";
import PerfumeComercialInfoFormSection from "./form-sections/perfume-comercial-info-form-section/perfume-comercial-info-form-section";
import { TabsContainer } from "@/components/ui/tabs-panel/tabs-panel";
import { TabsPanelProvider } from "@/components/ui/tabs-panel/context/tabs-panel-context";
import FormSectionsController from "./form-sections/form-sections-controller";
import PerfumeAdditonalInformation from "./form-sections/perfume-additional-information/perfume-additional-information";
import { Box } from "lucide-react";

interface Props {
  imageRecived?: {
    loading: boolean;
    error: string | null;
  };
  imagesRecived?: {
    loading: boolean;
    error: string | null;
  };
}

export function PerfumeForm({ imageRecived, imagesRecived }: Props) {
  const tabs = useMemo(
    () => [
      {
        label: "Información Básica",
        icon: <Box />,
        value: "1",
        component: (
          <PerfumeBasicInformationFormSection imageRecived={imageRecived} />
        ),
      },
      {
        label: "Características",
        icon: <Box />,
        value: "2",
        component: <PerfumeCharacteristicsFormSection />,
      },
      {
        label: "Info. Comercial",
        icon: <Box />,
        value: "3",
        component: <PerfumeComercialInfoFormSection />,
      },
      {
        label: "Info. Adicional",
        icon: <Box />,
        value: "4",
        component: (
          <PerfumeAdditonalInformation imagesRecived={imagesRecived} />
        ),
      },
    ],
    [imageRecived, imagesRecived]
  );

  return (
    <TabsPanelProvider initialTab={tabs[0].value}>
      <FormSectionsController>
        <TabsContainer
          tabs={tabs}
          fullWidth
          classNameTabsContent="flex-1 overflow-auto flex flex-col h-[65vh] p-2"
        />
      </FormSectionsController>
    </TabsPanelProvider>
  );
}
