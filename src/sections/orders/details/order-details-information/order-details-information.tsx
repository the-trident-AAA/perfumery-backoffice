import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from 'lucide-react'
import { OrderDetails } from "@/types/orders";

interface Props {
  order: OrderDetails;
}

export function CustomerInfo({ order }: Props) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <User className="h-5 w-5" />
          Información del Cliente
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">ID del Cliente</p>
            <p className="font-mono text-sm">{order.user.id}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Nombre</p>
            <p className="font-medium">{order.user.username}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm font-medium text-muted-foreground">Email</p>
            <p className="text-sm">{order.user.email}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
