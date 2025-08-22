"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import { RHFTextAreaField } from "@/components/form/rhf-components/rhf-text-area-field/rhf-text-area-field";
import { RHFMultiFileUpload } from "@/components/form/rhf-components/rhf-multi-file-upload/rhf-multi-file-upload";

interface Props {
  imagesRecived?: {
    loading: boolean;
    error: string | null;
  };
}

export default function HomeBannerBasicInfoSection({ imagesRecived }: Props) {
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
        <RHFMultiFileUpload
          name="images"
          label="Subir imágenes (máximo 5)"
          maxSize={10 * 1024 * 1024} // 10MB
          acceptedFileTypes={{
            "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
          }}
          compressImages={true}
          quality={85}
          maxWidth={1920}
          {...(imagesRecived && { loading: imagesRecived.loading })}
        />
      </CardContent>
    </Card>
  );
}
