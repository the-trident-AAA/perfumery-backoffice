import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { OrderPerfume } from "@/types/order-perfumes";

interface ProductsTableProps {
  orderPerfumes: OrderPerfume[];
}

export function ProductsTable({ orderPerfumes }: ProductsTableProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Productos del Pedido</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID Producto</TableHead>
              <TableHead>Perfume</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead className="text-center">Cantidad</TableHead>
              <TableHead className="text-right">Precio Unitario</TableHead>
              <TableHead className="text-right">Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderPerfumes.map((orderPerfume) => (
              <TableRow key={orderPerfume.id}>
                <TableCell className="font-mono text-sm">
                  {orderPerfume.perfume.id}
                </TableCell>
                <TableCell className="font-medium">
                  {orderPerfume.perfume.name}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {orderPerfume.perfume.brand.name}
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline" className="font-mono">
                    {orderPerfume.cant}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono">
                  ${Number(orderPerfume?.price || 0).toFixed(2)}
                </TableCell>
                <TableCell className="text-right font-mono font-medium">
                  ${Number((orderPerfume?.price || 0) * (orderPerfume?.cant || 0)).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
