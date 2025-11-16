"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import { RHFTextAreaField } from "@/components/form/rhf-components/rhf-text-area-field/rhf-text-area-field";
import { RHFImageUpload } from "@/components/form/rhf-components/rhf-image-upload/rhf-image-upload";
import ButtonTextField from "./components/button-text-field";
import { RHFSelectField } from "@/components/form/rhf-components/rhf-select-field/rhf-select-field";
import { getTextColorText, TextColor } from "@/types/home-banners";

interface Props {
  imageRecived?: {
    loading: boolean;
    error: string | null;
  };
  mobileImageRecived?: {
    loading: boolean;
    error: string | null;
  };
}

export default function HomeBannerBasicInfoSection({
  imageRecived,
  mobileImageRecived,
}: Props) {
  return (
    <Card className="shadow-sm bg-muted">
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
        <RHFSelectField
          name="textColor"
          label="Color de los textos"
          placeholder="Seleccione un color de texto deseado"
          options={[
            {
              value: TextColor.LIGHT,
              label: getTextColorText(TextColor.LIGHT),
            },
            {
              value: TextColor.DARK,
              label: getTextColorText(TextColor.DARK),
            },
          ]}
        />
        <ButtonTextField />
        <RHFImageUpload
          name="image"
          label="Imagen de vista de escritorio"
          {...(imageRecived && { loading: imageRecived.loading })}
        />
        <RHFImageUpload
          name="mobileImage"
          label="Imagen de vista de móvil"
          {...(mobileImageRecived && { loading: mobileImageRecived.loading })}
        />
      </CardContent>
    </Card>
  );
}
