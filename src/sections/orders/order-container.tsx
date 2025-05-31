import React from "react";
import SectionsHeader from "../components/sections-header/sections-header";
import { Package } from "lucide-react";
import { Order } from "@/types/orders";
import OrderList from "./list/order-list";


interface Props {
  orders: Order[];
}

export default function OrdersContainer({ orders }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <SectionsHeader
        sectionIcon={<Package />}
        sectionTitle="Gestión de Pedidos"
        sectionDescription="Gestione toda la información referente a los pedidos"
      />
      <OrderList orders={orders} />
    </div>
  );
}
