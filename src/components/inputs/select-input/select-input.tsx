"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

interface Props {
  label?: string;
  placeHolder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  options: { value: string; label: string }[];
}

export default function SelectInput({
  label,
  placeHolder = "Seleccione elemento",
  value,
  onValueChange,
  options,
}: Props) {
  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <Select value={value || ""} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeHolder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option, index) => (
            <SelectItem key={index} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
