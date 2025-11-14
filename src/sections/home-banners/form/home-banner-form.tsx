"use client";
import { useMemo } from "react";
import { TabsContainer } from "@/components/ui/tabs-panel/tabs-panel";
import { TabsPanelProvider } from "@/components/ui/tabs-panel/context/tabs-panel-context";
import HomeBannerBasicInfoSection from "./form-sections/home-banner-basic-info-section/home-banner-basic-info-section";
import HomeBannerFormSectionsController from "./form-sections/home-banner-form-sections-controller";
import HomeBannerAdditionalInformationSection from "./form-sections/home-banner-additional-information-section/home-banner-additional-information-section";
import HomeBannerFiltersSection from "./form-sections/home-banner-filters-section/home-banner-filters-section";

interface Props {
  imageRecived?: {
    loading: boolean;
    error: string | null;
  };
}

export default function HomeBannerForm({ imageRecived }: Props) {
  const tabs = useMemo(
    () => [
      {
        label: "Información Básica",
        value: "1",
        component: <HomeBannerBasicInfoSection imageRecived={imageRecived} />,
      },
      {
        label: "Información adicional",
        value: "2",
        component: <HomeBannerAdditionalInformationSection />,
      },
      {
        label: "Filtros",
        value: "3",
        component: <HomeBannerFiltersSection />,
      },
    ],
    [imageRecived]
  );

  return (
    <TabsPanelProvider initialTab={tabs[0].value}>
      <HomeBannerFormSectionsController>
        <TabsContainer
          tabs={tabs}
          fullWidth
          classNameTabsContent="flex-1 overflow-auto flex flex-col h-[65vh] p-2"
        />
      </HomeBannerFormSectionsController>
    </TabsPanelProvider>
  );
}
