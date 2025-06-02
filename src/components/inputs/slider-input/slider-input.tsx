"use client";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import React from "react";

interface Props {
  label?: string;
  meansure?: string;
  value: [number, number];
  handleChangeFilters: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
}

export default function SliderInput({
  label,
  meansure,
  value,
  handleChangeFilters,
  min = 0,
  max = 1000,
  step = 10,
}: Props) {
  return (
    <div className="space-y-3">
      {label && <Label>{label}</Label>}
      <div className="px-2">
        <Slider
          value={value}
          onValueChange={handleChangeFilters}
          max={max}
          min={min}
          step={step}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-muted-foreground mt-1">
          <span>{value[0] + " " + (meansure || "")}</span>
          <span>{value[1] + " " + (meansure || "")}</span>
        </div>
      </div>
    </div>
  );
}
