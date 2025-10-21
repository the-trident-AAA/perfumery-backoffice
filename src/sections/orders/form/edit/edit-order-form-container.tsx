"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { modalTypes } from "@/components/modal/types/modalTypes";
import { revalidateServerTags } from "@/lib/cache";
import { tagsCacheByRoutes } from "@/routes/api-routes/api-routes";
import { useContext } from "react";
import { ModalContext } from "@/components/modal/context/modalContext";
import { toast } from "react-toastify";
import FormActionButtons from "@/components/form/components/form-action-buttons/form-action-buttons";
import { AlertDestructive } from "@/components/ui/alert-destructive";
import useEditOrder from "../../hooks/use-edit-order";
import { OrderEdit, orderEditSchema } from "./schemas/order-edit-schema";
import {
  getOrderStateText,
  getOrderStateVariant,
  OrderDetails,
} from "@/types/orders";
import OrderForm from "../order-form";
import { Box, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/format-date";

interface Props {
  order: OrderDetails;
}

export default function EditOrderFormContainer({ order }: Props) {
  const { handleCloseModal } = useContext(ModalContext);
  const {
    editOrder,
    loading: submitLoading,
    error: editBrandError,
  } = useEditOrder({
    id: order.id,
    onEditAction: () => {
      toast.success("Orden actualizada con éxito");
      handleClose();
      revalidateServerTags(tagsCacheByRoutes.orders.multipleTag);
    },
  });

  const form = useForm<OrderEdit>({
    resolver: zodResolver(orderEditSchema),
    defaultValues: {
      state: order.state,
      orderPerfumes: order.orderPerfumes.map((orderPerfume) => ({
        entityId: orderPerfume.id,
        perfumeId: orderPerfume.perfume.id,
        cant: orderPerfume.cant,
      })),
    },
  });

  const handleClose = () => {
    handleCloseModal(modalTypes.editOrderModal.name);
  };

  function onSubmit(order: OrderEdit) {
    editOrder(order);
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-1 flex-col justify-between gap-8 h-full"
      >
        <div className="flex items-center gap-4">
          <div className="bg-secondary p-3 rounded-full">
            <Package className="h-6 w-6 text-primary" />
          </div>

          <div className="flex flex-col items-start">
            <span className="font-bold text-xl text-secondary group-hover:text-primary/80 transition-colors">
              Pedido {order.code}
            </span>

            <div className="flex flex-wrap items-center gap-4">
              <Badge
                className={`${getOrderStateVariant(
                  order.state
                )} mt-2 flex items-center gap-1 px-3 py-1`}
              >
                <Box className="h-3 w-3" />
                {getOrderStateText(order.state)}
              </Badge>
              <div
                className="flex flex-col gap-1
										"
              >
                <p className="text-sm text-secondary">Última actualización:</p>
                <Badge variant={"secondary"} >
                  {formatDate(order.lastUpdateDate)}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        {editBrandError && <AlertDestructive title={editBrandError} />}
        <OrderForm order={order} />
        <FormActionButtons
          submitLoading={submitLoading}
          submitButtonText="Actualizar Pedido"
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
