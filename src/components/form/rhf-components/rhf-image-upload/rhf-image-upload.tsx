"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { X, Upload, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  name: string;
  label?: string;
  maxSize?: number; // in bytes
  className?: string;
  error?: string;
}

export function RHFImageUpload({
  name,
  label = "Subir imagen",
  maxSize = 5 * 1024 * 1024, // 5MB default
  className,
  error,
}: ImageUploadProps) {
  const { setValue, watch, formState } = useFormContext();
  const value = watch(name);
  const fieldError = error || formState.errors[name]?.message;

  const [preview, setPreview] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      accept: {
        "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
      },
      maxSize,
      multiple: false,
      onDrop: (acceptedFiles) => {
        if (acceptedFiles?.length) {
          const file = acceptedFiles[0];
          setValue(name, file, { shouldValidate: true });
        }
      },
    });

  // Create preview when file changes
  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(value);
    setPreview(objectUrl);

    // Free memory when component unmounts
    return () => URL.revokeObjectURL(objectUrl);
  }, [value]);

  // Handle file removal
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setValue(name, null, { shouldValidate: true });
    setPreview(null);
  };

  // Get file rejection errors
  const fileRejectionError = fileRejections[0]?.errors[0]?.message;

  return (
    <div className={cn("space-y-2", className)}>
      {label && <p className="text-sm font-medium">{label}</p>}

      <div
        {...getRootProps()}
        className={cn(
          "relative flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900/30",
          preview ? "h-64" : "h-40",
          error && "border-red-500"
        )}
      >
        <input {...getInputProps()} />

        {preview ? (
          <>
            <Image
              src={preview || "/place-holder.jpg"}
              alt="Vista previa"
              width={1920}
              height={1080}
              className="object-contain w-full h-full rounded-md"
            />
            <Button
              type="button"
              onClick={handleRemove}
              variant={"destructive"}
              className="absolute top-2 right-2 p-1 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            {isDragActive ? (
              <>
                <ImageIcon className="w-10 h-10 text-primary" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Suelta la imagen aquí
                </p>
              </>
            ) : (
              <>
                <Upload className="w-10 h-10 text-gray-400" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Arrastra y suelta una imagen, o haz clic para seleccionar
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  PNG, JPG, GIF hasta {Math.round(maxSize / (1024 * 1024))}MB
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {(fieldError || fileRejectionError) && (
        <p className="text-sm text-red-500">
          {typeof fieldError === "string" ? fieldError : fileRejectionError}
        </p>
      )}
    </div>
  );
}
