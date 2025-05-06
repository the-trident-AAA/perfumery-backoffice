"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import { RHFSelectField } from "@/components/form/rhf-components/rhf-select-field/rhf-select-field";
import useBrands from "@/sections/brands/hooks/use-brands";
export default function PerfumeBasicInformationFormSection() {
  const { brands } = useBrands();
  return (
    <Card className="shadow-sm">
      <CardContent className="pt-4 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          />
        </div>
      </CardContent>
    </Card>
  );
}
