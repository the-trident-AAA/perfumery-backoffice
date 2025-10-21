import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/format-date";
import { OrderDetails } from "@/types/orders";
import { Package } from "lucide-react";

interface Props {
  order: OrderDetails;
}

export function OrderHeader({ order }: Props) {
  const getStateColor = (state: string) => {
    switch (state.toLowerCase()) {
      case "pendiente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "procesando":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completado":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelado":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Package className="h-6 w-6 text-secondary" />
          <div>
            <h2 className="text-xl font-semibold">Pedido {order.code}</h2>
            <p className="text-sm text-secondary font-semibold">
              Detalles completos del pedido
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div
            className="flex flex-col gap-1
										"
          >
            <p className="text-sm text-secondary font-semibold">Creación:</p>
            <Badge variant={"secondary"}>
              {formatDate(order.creationDate)}
            </Badge>
          </div>
          <div
            className="flex flex-col gap-1
										"
          >
            <p className="text-sm text-secondary font-semibold">
              Última actualización:
            </p>
            <Badge variant={"secondary"}>
              {formatDate(order.lastUpdateDate)}
            </Badge>
          </div>
        </div>
      </div>
      <Badge className={`${getStateColor(order.state)} font-medium`}>
        {order.state}
      </Badge>
    </div>
  );
}
