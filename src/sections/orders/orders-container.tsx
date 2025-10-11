import React from "react";
import SectionsHeader from "../components/sections-header/sections-header";
import { ShoppingCart } from "lucide-react";
import { Order } from "@/types/orders";
import OrdersList from "./list/orders-list";
import { PaginationMeta } from "@/types/pagination";

interface Props {
  orders: Order[];
  apiPagination: PaginationMeta;
}

export default function OrdersContainer({ orders, apiPagination }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <SectionsHeader
        sectionIcon={<ShoppingCart />}
        sectionTitle="Gestión de Pedidos"
        sectionDescription="Gestione toda la información referente a los pedidos"
      />
      <OrdersList orders={orders} apiPagination={apiPagination} />
    </div>
  );
}
