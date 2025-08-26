import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fCurrency } from "@/lib/format-number";
import { OrderDetails, orderStatusMap } from "@/types/orders";

interface Props {
  order: OrderDetails;
}

export function OrderSummary({ order }: Props) {
  return (
    <Card className="bg-primary border-0">
      <CardHeader>
        <CardTitle className="text-lg">Resumen de la Orden</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-sm font-semibold text-secondary mb-1">
              Total de Artículos
            </p>
            <p className="text-2xl font-bold text-foreground">
              {order.totalItems || 0}
            </p>
          </div>

          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-sm font-semibold text-secondary mb-1">
              Monto Total
            </p>
            <p className="text-2xl font-bold text-foreground">
              {fCurrency(order.totalMount || 0)}
            </p>
          </div>

          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-sm font-semibold text-secondary mb-1">
              Estado
            </p>
            <Badge
              variant={
                orderStatusMap.get(order.state)?.color as
                  | "secondary"
                  | "default"
              }
              className={`text-sm font-semibold`}
            >
              {order.state
                ? order.state.charAt(0).toUpperCase() + order.state.slice(1)
                : "N/A"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
