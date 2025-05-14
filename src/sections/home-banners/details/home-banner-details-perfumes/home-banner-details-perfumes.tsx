import EmptyContent from "@/components/empty-content/empty-content";
import { Badge } from "@/components/ui/badge";
import PerfumeCard from "@/sections/perfumes/components/perfume-card/perfume-card";
import { HomeBannerDetails } from "@/types/home-banners";
import { convertPerfumeDetailsToPerfume } from "@/types/perfumes";
import React from "react";

interface Props {
  homeBanner: HomeBannerDetails;
}

export default function HomeBannerDetailsPerfumes({ homeBanner }: Props) {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Perfumes asociados</h3>
        <Badge>{homeBanner.perfumes.length} perfumes</Badge>
      </div>

      {homeBanner.perfumes.length > 0 ? (
        <div className="space-y-4">
          {/* Perfume list */}
          <div className="grid grid-cols-1 md:grid-cols-2 p-2 gap-4 max-h-[25vh] overflow-auto">
            {homeBanner.perfumes.map((perfume, index) => (
              <PerfumeCard
                key={index}
                data={convertPerfumeDetailsToPerfume(perfume)}
              />
            ))}
          </div>
        </div>
      ) : (
        <EmptyContent
          title="No hay perfumes asociados a este banner"
          description="No han sido seleccionado perfumes para formar parte de este banner"
        />
      )}
    </div>
  );
}
