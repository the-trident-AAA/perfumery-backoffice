import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import React from "react";

interface Props {
  index: number;
}

export default function StackStatisticalTip({ index }: Props) {
  return (
    <div className="flex items-center gap-2">
      <RHFTextField
        name={`statisticalTips.${index}.statistics`}
        label="Estadística"
        placeholder="Introduzca la estadística"
        fullWidth
      />
      <RHFTextField
        name={`statisticalTips.${index}.info`}
        label="Información"
        placeholder="Introduzca la información de la estadística"
        fullWidth
      />
    </div>
  );
}
