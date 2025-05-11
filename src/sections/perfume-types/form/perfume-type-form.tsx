import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import React from "react";

export default function PerfumeTypeForm() {
  return (
    <div>
      <RHFTextField
        name="name"
        label="Tipo de Perfume"
        placeholder="Ingrese el tipo de perfume"
      />
    </div>
  );
}
