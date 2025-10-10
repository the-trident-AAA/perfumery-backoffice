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
import { OrderDetails } from "@/types/orders";
import OrderForm from "../order-form";

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
        {editBrandError && <AlertDestructive title={editBrandError} />}
        <OrderForm />
        <FormActionButtons
          submitLoading={submitLoading}
          submitButtonText="Actualizar Pedido"
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
