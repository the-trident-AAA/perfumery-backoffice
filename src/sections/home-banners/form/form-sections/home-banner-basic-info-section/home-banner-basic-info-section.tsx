"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import { RHFTextAreaField } from "@/components/form/rhf-components/rhf-text-area-field/rhf-text-area-field";
import { RHFImageUpload } from "@/components/form/rhf-components/rhf-image-upload/rhf-image-upload";
export default function HomeBannerBasicInfoSection() {
  return (
    <Card className="shadow-sm">
      <CardContent className="pt-4 px-4 flex flex-col gap-4">
        <RHFTextField
          name="title"
          label="Título del Banner"
          placeholder="Ingrese el título del banner"
        />
        <RHFTextAreaField
          name="description"
          label="Descripción del Banner"
          description="Introduzca la descripción del banner"
          fullWidth
        />
        <RHFImageUpload name="image" label="Imagen del Banner" />
      </CardContent>
    </Card>
  );
}
