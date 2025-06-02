"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CheckedState } from "@radix-ui/react-checkbox";
import React from "react";

interface Props {
  id: string;
  label?: string;
  values: string[];
  options: { value: string; label: string }[];
  handleValuesChange: (value: string, checked: boolean) => void;
}

export default function ListInput({
  id,
  label,
  values,
  options,
  handleValuesChange,
}: Props) {
  return (
    <div className="space-y-3">
      {label && <Label>{label}</Label>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Checkbox
              id={`${id}-${option.value}`}
              checked={values.includes(option.value) || false}
              onCheckedChange={(checked) => {
                handleValuesChange(option.value, checked as boolean);
              }}
            />
            <Label
              htmlFor={`${id}-${option.value}`}
              className="text-sm font-normal cursor-pointer"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
