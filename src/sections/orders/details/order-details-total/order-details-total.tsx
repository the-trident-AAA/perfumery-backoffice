import { Card, CardContent } from "@/components/ui/card";
import { OrderDetails } from "@/types/orders";

interface Props {
  order: OrderDetails;
}

export function OrderTotal({ order }: Props) {
  return (
    <Card className="border-2 border-primary/20">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-medium">Total del Pedido</p>
            <p className="text-sm text-muted-foreground">
              {order.totalItems} artículo{order.totalItems !== 1 ? "s" : ""} •{" "}
              {order.totalItems} producto{order.totalItems !== 1 ? "s" : ""}{" "}
              único{order.totalItems !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-primary">
              ${Number(order?.totalMount || 0).toFixed(2)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
