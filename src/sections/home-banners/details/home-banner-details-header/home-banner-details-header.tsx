import { Badge } from "@/components/ui/badge";
import { HomeBannerDetails } from "@/types/home-banners";
import { Layout } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Props {
  homeBanner: HomeBannerDetails;
}

export default function HomeBannerDetailsHeader({ homeBanner }: Props) {
  return (
    <div className="flex flex-col gap-6 mb-6">
      {/* Banner Image - Larger and more prominent */}
      <div className="w-full">
        <div className="relative aspect-[21/9] rounded-md overflow-hidden border border-gray-200">
          <Image
            src={homeBanner.image || "/images/place-holder.jpg"}
            alt={homeBanner.title}
            width={1920}
            height={1080}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Header with title and ID */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-secondary">
            {homeBanner.title}
          </h2>
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
