import { Separator } from "@/components/ui/separator";
import { OfferDetails } from "@/types/offers";
import OfferDetailsHeader from "./offer-details-header/offer-details-header";
import OfferDetailsInformation from "./offer-details-information/offer-details-information";
import OfferDetailsDiscountVisualization from "./offer-details-discount-visualization/offer-details-discount-visualization";

interface Props {
  offer: OfferDetails;
}

export default function OfferDetailsContainer({ offer }: Props) {
  return (
    <div className="w-full max-w-3xl mx-auto p-6 rounded-lg">
      {/* Image and Header Section */}
      <OfferDetailsHeader offer={offer} />
      <Separator />
      {/* Detailed information */}
      <OfferDetailsInformation offer={offer} />
      {/* Discount visualization */}
      <OfferDetailsDiscountVisualization offer={offer} />
    </div>
  );
}
