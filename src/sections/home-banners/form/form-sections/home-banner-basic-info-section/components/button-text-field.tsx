"use client";
import { RHFTextField } from "@/components/form/rhf-components/rhf-text-field/rhf-text-field";
import CheckboxInput from "@/components/inputs/checkbox-input/checkbox-input";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function ButtonTextField() {
  const { setValue, watch } = useFormContext();
  const buttonText = watch("buttonText");
  const [withButtonText, setWithButtonText] = useState(
    buttonText ? true : false
  );

  const handleChangeWithButtonText = (newValue: boolean) => {
    setWithButtonText(newValue);
    setValue("buttonText", "");
  };
  return (
    <>
      <CheckboxInput
        id="withButtonText"
        label="Mostrar texto del botón"
        description="Marque si desea mostrar el texto del botón"
        value={withButtonText}
        onCheckedChange={(checked) => {
          handleChangeWithButtonText(checked ? true : false);
        }}
      />
      <RHFTextField
        name="buttonText"
        label="Texto del Botón"
        placeholder="Ingrese el texto del botón"
        disabled={!withButtonText}
      />
    </>
  );
}
