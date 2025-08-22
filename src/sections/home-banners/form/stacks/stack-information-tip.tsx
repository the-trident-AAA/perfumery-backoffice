import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import React from "react";

interface Props {
  index: number;
}

export default function StackInformationTip({ index }: Props) {
  return (
    <div className="flex items-center">
      <RHFTextField
        name={`infoTips.${index}.name`}
        placeholder="Introduzca el nombre del tip"
        fullWidth
      />
    </div>
  );
}
