"use client";
import { TabsPanelContext } from "@/components/ui/tabs-panel/context/tabs-panel-context";
import { ReactNode, useContext, useEffect } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  children: ReactNode;
}

export default function FormSectionsController({ children }: Props) {
  const { formState } = useFormContext();
  const { errors } = formState;
  const { setTabValue } = useContext(TabsPanelContext);

  useEffect(() => {
    if (errors.name || errors.brandId) {
      setTabValue("1"); // move basic information section
    } else if (
      errors.perfumeTypeId ||
      errors.gender ||
      errors.liters ||
      errors.scentsId
    ) {
      setTabValue("2"); // move characteristics section
    } else if (errors.price || errors.cant || errors.offerId) {
      setTabValue("3"); // move comercial info section
    }
  }, [errors, setTabValue]);

  return children;
}
