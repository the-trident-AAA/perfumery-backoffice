import { Separator } from "@/components/ui/separator";
import { PerfumeDetails } from "@/types/perfumes";
import PerfumeDetailsHeader from "./perfume-details-header/perfume-details-header";
import PerfumeDetailsOfferSection from "./perfume-details-offer-section/perfume-details-offer-section";
import PerfumeDetailsInformation from "./perfume-details-information/perfume-details-information";
import PerfumeDetailsScentsSection from "./perfume-details-scents-section/perfume-details-scents-section";

interface Props {
  perfume: PerfumeDetails;
}

export default function PerfumeDetailsContainer({ perfume }: Props) {
  return (
    <div className="w-full flex flex-col gap-2 max-w-3xl mx-auto p-6 rounded-lg">
      {/* Header Section */}
      <PerfumeDetailsHeader perfume={perfume} />
      <Separator />
      {/* Detailed information */}
      <PerfumeDetailsInformation perfume={perfume} />
      {/* Offer section (if exists) */}
      {perfume.offer && <PerfumeDetailsOfferSection offer={perfume.offer} />}
      {/* Scents section */}
      <PerfumeDetailsScentsSection scents={perfume.scents} />
    </div>
  );
}
