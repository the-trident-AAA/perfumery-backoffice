"use client"
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import { RHFTextAreaField } from "@/components/form/rhf-components/rhf-text-area-field/rhf-text-area-field";
export default function HomeBannerForm() {
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
      </CardContent>
    </Card>
  );
}
