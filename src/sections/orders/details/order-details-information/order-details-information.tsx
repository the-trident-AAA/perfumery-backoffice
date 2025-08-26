import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderDetails } from "@/types/orders";

interface Props {
  order: OrderDetails;
}

export function CustomerInfo({ order }: Props) {
  return (
    <Card className="bg-primary border-0">
      <CardHeader>
        <CardTitle className="text-lg">Información del Cliente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={order.user.avatar || "/placeholder.svg"}
              alt={`Avatar de ${order.user.username || "Usuario"}`}
            />
            <AvatarFallback className="bg-muted text-muted-foreground">
              {order.user.username.charAt(0) + order.user.username.charAt(1)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-secondary">
                  Nombre de usuario
                </label>
                <p className="text-sm font-medium text-foreground">
                  {order.user.username || "N/A"}
                </p>
              </div>

              <div>
                <label className="text-sm font-semibold text-secondary">
                  Email
                </label>
                <p className="text-sm font-medium text-foreground">
                  {order.user.email || "N/A"}
                </p>
              </div>

              <div>
                <label className="text-sm font-semibold text-secondary">
                  ID de usuario
                </label>
                <p className="text-sm font-mono text-foreground">
                  {order.user.id || "N/A"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm font-semibold text-secondary">
                  Rol
                </label>
                <Badge variant="secondary" className="text-xs">
                  {order.user.role || "N/A"}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
