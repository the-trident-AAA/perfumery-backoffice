import { Separator } from "@/components/ui/separator";
import { HomeBannerDetails } from "@/types/home-banners";
import HomeBannerDetailsHeader from "./home-banner-details-header/home-banner-details-header";
import HomeBannerDetailsDescription from "./home-banner-details-description/home-banner-details-description";
import HomeBannerDetailsTips from "./home-banner-details-tips/home-banner-details-tips";
import HomeBannerDetailsFilters from "./home-banner-details-filters/home-banner-details-filters";

interface Props {
  homeBanner: HomeBannerDetails;
}

export default function HomeBannerDetailsContainer({ homeBanner }: Props) {
  return (
    <div className="w-full mx-auto p-2">
      {/* Banner Image and Header Section */}
      <HomeBannerDetailsHeader homeBanner={homeBanner} />
      <Separator />
      {/* Description */}
      <HomeBannerDetailsDescription homeBanner={homeBanner} />
      <Separator />
      <HomeBannerDetailsTips homeBanner={homeBanner} />
      <Separator />
      <HomeBannerDetailsFilters homeBanner={homeBanner} />
    </div>
  );
}
