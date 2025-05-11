"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import { RHFSelectField } from "@/components/form/rhf-components/rhf-select-field/rhf-select-field";
import useBrands from "@/sections/brands/hooks/use-brands";
import { RHFTextAreaField } from "@/components/form/rhf-components/rhf-text-area-field/rhf-text-area-field";
export default function PerfumeBasicInformationFormSection() {
  const { brands, loadingData } = useBrands();
  return (
    <Card className="shadow-sm">
      <CardContent className="pt-4 px-4 flex flex-col gap-4">
        <div className="flex gap-4">
          <RHFTextField
            name="name"
            label="Nombre del Perfume"
            placeholder="Ingrese el nombre del perfume"
          />
          <RHFSelectField
            name="brandId"
            label="Marca"
            placeholder="Seleccione una marca"
            options={brands.map((brand) => ({
              value: brand.id,
              label: brand.name,
            }))}
            loading={loadingData}
          />
        </div>
        <RHFTextAreaField
          name="description"
          label="Descripción"
          description="Introduzca la descripción del Perfume"
          fullWidth
        />
      </CardContent>
    </Card>
  );
}
