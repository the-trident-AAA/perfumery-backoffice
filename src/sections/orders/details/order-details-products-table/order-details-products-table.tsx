import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderDetails } from "@/types/orders";
import OrderPerfumeCard from "../../components/order-perfume-card/order-perfume-card";

interface ProductsTableProps {
  order: OrderDetails;
}

export function ProductsTable({ order }: ProductsTableProps) {
  return (
    <Card className="bg-primary border-0">
      <CardHeader>
        <CardTitle className="text-lg">Perfumes en la Orden</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {order.orderPerfumes && order.orderPerfumes.length > 0 ? (
            order.orderPerfumes.map((orderPerfume) => (
              <OrderPerfumeCard
                key={orderPerfume.id}
                orderPerfume={orderPerfume}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No hay perfumes en esta orden
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
