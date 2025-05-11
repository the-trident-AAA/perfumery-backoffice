import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import React from "react";

export default function ScentForm() {
  return (
    <div>
      <RHFTextField
        name="name"
        label="Nombre del aroma"
        placeholder="Ingrese el aroma"
      />
    </div>
  );
}
