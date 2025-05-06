import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RHFSelectField } from "@/components/form/rhf-components/rhf-select-field/rhf-select-field";
import { RHFNumberField } from "@/components/form/rhf-components/rhf-number-field/rhf-number-field";
import { Separator } from "@/components/ui/separator";
import { RHFMultiSelectField } from "@/components/form/rhf-components/rhf-multi-select-field/rhf-multi-select-field";
export default function PerfumeCharacteristicsFormSection() {
  return (
    <Card className="shadow-sm">
      <CardContent className="pt-4 px-4">
      <div className="flex flex-col gap-2">
      <div className="flex gap-2">
          <RHFSelectField
            name="perfumeTypeId"
            label="Tipo de Perfume"
            placeholder="Seleccione un tipo"
            options={[
              { value: "1", label: "Eau de Parfum" },
              { value: "2", label: "Eau de Toilette" },
              { value: "3", label: "Eau de Cologne" },
              // Más opciones aquí
            ]}
          />
          <RHFSelectField
            name="gender"
            label="Género"
            placeholder="Seleccione un género"
            options={[
              { value: "Masculino", label: "Masculino" },
              { value: "Femenino", label: "Femenino" },
              { value: "Unisex", label: "Unisex" },
            ]}
          />
          
        </div>
        <div className="max-w-[50%]">
        <RHFNumberField
            name="liters"
            label="Litros"
            placeholder="0.1"
            description="Volumen en litros"
            fullWidth={false}
          />
        </div>
      </div>
        <Separator className="my-3" />

        <div className="space-y-3">
          <RHFMultiSelectField
            name="scentsId"
            label="Aromas"
            description="Seleccione todos los aromas que apliquen"
            options={[
              { value: "1", label: "Floral" },
              { value: "2", label: "Cítrico" },
              { value: "3", label: "Amaderado" },
              { value: "4", label: "Oriental" },
              { value: "5", label: "Frutal" },
              { value: "6", label: "Floral" },
              { value: "7", label: "Cítrico" },
              { value: "8", label: "Amaderado" },
              { value: "9", label: "Oriental" },
              { value: "10", label: "Frutal" },
            ]}
            columns={3}
          />
        </div>
      </CardContent>
    </Card>
  );
}
