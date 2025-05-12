"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import { RHFTextAreaField } from "@/components/form/rhf-components/rhf-text-area-field/rhf-text-area-field";
import { RHFNumberField } from "@/components/form/rhf-components/rhf-number-field/rhf-number-field";
export default function OfferForm() {
  return (
    <Card className="shadow-sm">
      <CardContent className="pt-4 px-4 flex flex-col gap-4">
        <div className="flex gap-4">
          <RHFTextField
            name="name"
            label="Nombre de la Oferta"
            placeholder="Ingrese el nombre de la oferta"
          />
          <RHFTextField
            name="scope"
            label="Alcance de la Oferta"
            placeholder="Ingrese el alcance de la oferta"
          />
        </div>
        <div className="flex gap-4">
          <RHFNumberField
            name="discount"
            label="Descuento de la Oferta (en %)"
            placeholder="Ingrese el el decuento de la oferta"
          />
          <RHFTextField
            name="offerType"
            label="Tipo de Oferta"
            placeholder="Ingrese el tipo de oferta"
          />
        </div>
        <RHFTextAreaField
          name="description"
          label="Descripción"
          description="Introduzca la descripción de la oferta"
          fullWidth
        />
      </CardContent>
    </Card>
  );
}
