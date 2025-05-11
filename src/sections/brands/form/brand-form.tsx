import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import React from "react";

export default function BrandFrom() {
  return (
    <div>
      <RHFTextField
        name="name"
        label="Nombre del Perfume"
        placeholder="Ingrese el nombre de la Marca"
      />
    </div>
  );
}
