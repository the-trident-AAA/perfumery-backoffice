"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RHFSelectField } from "@/components/form/rhf-components/rhf-select-field/rhf-select-field";
import { RHFNumberField } from "@/components/form/rhf-components/rhf-number-field/rhf-number-field";
import { Separator } from "@/components/ui/separator";
import { RHFMultiSelectField } from "@/components/form/rhf-components/rhf-multi-select-field/rhf-multi-select-field";
import usePerfumeTypes from "@/sections/perfume-types/hooks/use-perfume-types";
import useScents from "@/sections/scents/hooks/use-scents";
import { Gender, genderMap } from "@/types/perfumes";
export default function PerfumeCharacteristicsFormSection() {
  const { perfumeTypes, loadingData: loadingDataPerfumeTypes } =
    usePerfumeTypes();
  const { scents, loadingData: loadingDataScents } = useScents();
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
              loading={loadingDataPerfumeTypes}
            />
            <RHFSelectField
              name="gender"
              label="Género"
              placeholder="Seleccione un género"
              options={[
                {
                  value: Gender.MALE,
                  label: genderMap.get(Gender.MALE)?.name as string,
                },
                {
                  value: Gender.FEMALE,
                  label: genderMap.get(Gender.FEMALE)?.name as string,
                },
                {
                  value: Gender.UNISEX,
                  label: genderMap.get(Gender.UNISEX)?.name as string,
                },
              ]}
            />
          </div>
          <div className="max-w-[50%]">
            <RHFNumberField
              name="milliliters"
              label="Mililitros"
              placeholder="0.1"
              description="Volumen en Mililitros"
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
            emptyText="No hay aromas disponibles"
            options={scents.map((scent) => ({
              value: scent.id,
              label: scent.name,
            }))}
            columns={3}
            loading={loadingDataScents}
          />
        </div>
      </CardContent>
    </Card>
  );
}
