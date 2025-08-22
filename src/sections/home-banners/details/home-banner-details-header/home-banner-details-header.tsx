import ThumbnailsImage from "@/components/thumbnails-image/thumbnails-image";
import { Badge } from "@/components/ui/badge";
import { HomeBannerDetails } from "@/types/home-banners";
import { Layout } from "lucide-react";
import React from "react";

interface Props {
  homeBanner: HomeBannerDetails;
}

export default function HomeBannerDetailsHeader({ homeBanner }: Props) {
  return (
    <div className="flex flex-col gap-6 mb-6">
      {/* Banner Image - Larger and more prominent */}
      <ThumbnailsImage
        altName={homeBanner.title}
        images={homeBanner.images}
        imageSize="lg"
      />
      {/* Header with title and ID */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <h2 className="text-2xl font-semibold text-secondary">
              {homeBanner.title}
            </h2>
            {homeBanner.isMain && (
              <Badge variant={"secondary"}>Principal</Badge>
            )}
          </div>
          <Badge variant="secondary">
            <Layout className="h-3.5 w-3.5 mr-1" />
            homeBanner
          </Badge>
        </div>
        <p className="text-sm text-secondary mt-1">ID: {homeBanner.id}</p>
      </div>
    </div>
  );
}
