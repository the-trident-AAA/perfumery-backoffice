import { Separator } from "@/components/ui/separator";
import { OrderDetails } from "@/types/orders";
import { OrderHeader } from "./order-details-header/order-details-header";
import { CustomerInfo } from "./order-details-information/order-details-information";
import { OrderSummary } from "./order-details-summary/order-details-summary";
import { ProductsTable } from "./order-details-products-table/order-details-products-table";
import { OrderTotal } from "./order-details-total/order-details-total";

interface Props {
  order: OrderDetails;
}

export default function OrderDetailsModalContent({order}: Props) {
  return (
    <div className="space-y-6 max-w-4xl">
      <OrderHeader order={order}  />
      <Separator />
      <CustomerInfo order={order} />
      <OrderSummary order={order}/>
      <ProductsTable orderPerfumes={order.orderPerfumes} />
      <OrderTotal order={order}
      />
    </div>
  );
}
