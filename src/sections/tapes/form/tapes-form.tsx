import { RHFImageUpload } from "@/components/form/rhf-components/rhf-image-upload/rhf-image-upload";
import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

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

export default function TapeForm({ imageRecived, mobileImageRecived }: Props) {
  return (
    <Card className="shadow-sm bg-muted">
      <CardContent className="pt-4 px-4 flex flex-col gap-4">
        <RHFTextField
          name="name"
          label="Nombre de la cinta"
          placeholder="Ingrese el nombre de la cinta"
        />

        <RHFImageUpload
          name="image"
          label="Imagen de vista de escritorio"
          {...(imageRecived && { loading: imageRecived.loading })}
        />
        <RHFImageUpload
          name="mobileImage"
          label="Imagen de vista móvil"
          {...(mobileImageRecived && { loading: mobileImageRecived.loading })}
        />
      </CardContent>
    </Card>
  );
}
