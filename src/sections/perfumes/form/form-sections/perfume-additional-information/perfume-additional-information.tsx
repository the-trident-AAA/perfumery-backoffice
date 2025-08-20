"use client";
import { RHFMultiFileUpload } from "@/components/form/rhf-components/rhf-multi-file-upload/rhf-multi-file-upload";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

interface Props {
  imagesRecived?: {
    loading: boolean;
    error: string | null;
  };
}

export default function PerfumeAdditonalInformation({ imagesRecived }: Props) {
  return (
    <Card className="shadow-sm bg-muted">
      <CardContent className="pt-4 px-4">
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
