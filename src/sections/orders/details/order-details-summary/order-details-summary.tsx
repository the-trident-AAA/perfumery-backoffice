import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderDetails } from "@/types/orders";
import { ShoppingCart } from "lucide-react";

interface Props {
  order: OrderDetails;
}

export function OrderSummary({ order }: Props) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <ShoppingCart className="h-5 w-5" />
          Resumen del Pedido
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <p className="text-2xl font-bold text-primary">
              {order.totalItems}
            </p>
            <p className="text-sm text-muted-foreground">Total Artículos</p>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <p className="text-2xl font-bold text-primary">
              {order.totalItems}
            </p>
            <p className="text-sm text-muted-foreground">Productos Únicos</p>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg md:col-span-2">
            <p className="text-2xl font-bold text-primary">
              ${Number(order?.totalMount || 0).toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground">Monto Total</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
