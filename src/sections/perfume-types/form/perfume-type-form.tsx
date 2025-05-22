import { RHFImageUpload } from "@/components/form/rhf-components/rhf-image-upload/rhf-image-upload";
import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import React from "react";

export default function PerfumeTypeForm() {
  return (
    <div className="flex flex-col gap-4">
      <RHFTextField
        name="name"
        label="Tipo de Perfume"
        placeholder="Ingrese el tipo de perfume"
      />
      <RHFImageUpload name="image" label="Imagen del Tipo de Perfume" />
    </div>
  );
}
