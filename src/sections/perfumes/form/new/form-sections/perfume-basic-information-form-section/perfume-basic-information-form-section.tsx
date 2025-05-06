import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import { RHFSelectField } from "@/components/form/rhf-components/rhf-select-field/rhf-select-field";
export default function PerfumeBasicInformationFormSection() {
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
            options={[
              { value: "1", label: "Chanel" },
              { value: "2", label: "Dior" },
              { value: "3", label: "Gucci" },
              // Más opciones aquí
            ]}
          />
        </div>
      </CardContent>
    </Card>
  );
}
