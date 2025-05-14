"use client";
import { useMemo } from "react";
import { TabsContainer } from "@/components/ui/tabs-panel/tabs-panel";
import { TabsPanelProvider } from "@/components/ui/tabs-panel/context/tabs-panel-context";
import HomeBannerBasicInfoSection from "./form-sections/home-banner-basic-info-section/home-banner-basic-info-section";
import HomeBannerPerfumesSection from "./form-sections/home-banner-perfumes-section/home-banner-perfumes-section";
import HomeBannerFormSectionsController from "./form-sections/home-banner-form-sections-controller";

export default function HomeBannerForm() {
  const tabs = useMemo(
    () => [
      {
        label: "Información Básica",
        value: "1",
        component: <HomeBannerBasicInfoSection />,
      },
      {
        label: "Perfumes Asociados",
        value: "2",
        component: <HomeBannerPerfumesSection />,
      },
    ],
    []
  );

  return (
    <TabsPanelProvider initialTab={tabs[0].value}>
      <HomeBannerFormSectionsController>
        <TabsContainer tabs={tabs} fullWidth={false} />
      </HomeBannerFormSectionsController>
    </TabsPanelProvider>
  );
}
