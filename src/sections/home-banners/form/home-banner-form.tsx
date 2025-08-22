"use client";
import { useMemo } from "react";
import { TabsContainer } from "@/components/ui/tabs-panel/tabs-panel";
import { TabsPanelProvider } from "@/components/ui/tabs-panel/context/tabs-panel-context";
import HomeBannerBasicInfoSection from "./form-sections/home-banner-basic-info-section/home-banner-basic-info-section";
import HomeBannerFormSectionsController from "./form-sections/home-banner-form-sections-controller";
import HomeBannerAdditionalInformationSection from "./form-sections/home-banner-additional-information-section/home-banner-additional-information-section";

interface Props {
  imagesRecived?: {
    loading: boolean;
    error: string | null;
  };
}

export default function HomeBannerForm({ imagesRecived }: Props) {
  const tabs = useMemo(
    () => [
      {
        label: "Información Básica",
        value: "1",
        component: <HomeBannerBasicInfoSection imagesRecived={imagesRecived} />,
      },
      {
        label: "Información adicional",
        value: "2",
        component: <HomeBannerAdditionalInformationSection />,
      },
    ],
    [imagesRecived]
  );

  return (
    <TabsPanelProvider initialTab={tabs[0].value}>
      <HomeBannerFormSectionsController>
        <TabsContainer tabs={tabs} fullWidth
          classNameTabsContent="flex-1 overflow-auto flex flex-col h-[65vh] p-2"/>
      </HomeBannerFormSectionsController>
    </TabsPanelProvider>
  );
}
