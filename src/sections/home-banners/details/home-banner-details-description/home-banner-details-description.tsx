import { HomeBannerDetails } from "@/types/home-banners";
import React from "react";

interface Props {
  homeBanner: HomeBannerDetails;
}

export default function HomeBannerDetailsDescription({ homeBanner }: Props) {
  return (
    <div className="my-6">
      <h3 className="text-sm font-medium text-gray-500 mb-2">Descripción</h3>
      <p className="text-sm line-clamp-3 break-words leading-relaxed text-gray-700">
        {homeBanner.description}
      </p>
    </div>
  );
}
