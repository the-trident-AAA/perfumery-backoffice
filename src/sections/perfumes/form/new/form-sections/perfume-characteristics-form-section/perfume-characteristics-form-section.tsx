"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RHFSelectField } from "@/components/form/rhf-components/rhf-select-field/rhf-select-field";
import { RHFNumberField } from "@/components/form/rhf-components/rhf-number-field/rhf-number-field";
import { Separator } from "@/components/ui/separator";
import { RHFMultiSelectField } from "@/components/form/rhf-components/rhf-multi-select-field/rhf-multi-select-field";
import { PerfumeType } from "@/types/perfume-types";
import { getPerfumesList } from "@/services/perfumes";
import { getPerfumeTypesList } from "@/services/perfume-types";
import useBrands from "@/sections/brands/hooks/use-brands";
import usePerfumeTypes from "@/sections/perfume-types/hooks/use-perfume-types";
export default function PerfumeCharacteristicsFormSection() {
  const { perfumeTypes, loadingData } = usePerfumeTypes();
  return (
    <Card className="shadow-sm">
      <CardContent className="pt-4 px-4">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <RHFSelectField
              name="perfumeTypeId"
              label="Tipo de Perfume"
              placeholder="Seleccione un tipo"
              options={perfumeTypes.map((perfumeTypes) => ({
                value: perfumeTypes.id,
                label: perfumeTypes.name,
              }))}
              loading={loadingData}
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
